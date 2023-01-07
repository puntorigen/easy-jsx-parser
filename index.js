const acorn = require('acorn');
const jsx = require('acorn-jsx');
const styleToObject = require('style-to-object');
const htmlTagNames = require('html-tag-names');
const svgTagNames = require('svg-tag-names');
const isString = require('is-string');

//possibleStandardNames
const normalizeNames = require('./normalize-names');
let sourceCode = '';

const isHtmlOrSvgTag = (tag) =>
  htmlTagNames.includes(tag) || svgTagNames.includes(tag);

const getAttributeValue = (expression) => {
  // If the expression is null, this is an implicitly "true" prop, such as readOnly
  if (expression === null) {
    return true;
  }

  if (expression.type === 'Literal') {
    return expression.value;
  }

  if (expression.type === 'JSXExpressionContainer') {
    return getAttributeValue(expression.expression);
  }

  if (expression.type === 'ArrayExpression') {
    return expression.elements.map((element) => getAttributeValue(element));
  }

  if (expression.type === 'TemplateLiteral') {
    const expressions = expression.expressions.map((element) => ({
      ...element,
      value: {
        raw: element.value,
        cooked: getAttributeValue(element),
      },
    }));

    return expressions
      .concat(expression.quasis)
      .sort((elementA, elementB) => elementA.start - elementB.start)
      .reduce(
        (string, element) => `${string}${element.value.cooked.toString()}`,
        '',
      );
  }

  if (expression.type === 'ObjectExpression') {
    const entries = expression.properties
      .map((property) => {
        const key = getAttributeValue(property.key);
        const value = getAttributeValue(property.value);

        if (key === undefined || value === undefined) {
          return null;
        }

        return { key, value };
      })
      .filter((property) => property)
      .reduce((properties, property) => {
        return { ...properties, [property.key]: property.value };
      }, {});

    return entries;
  }

  if (expression.type === 'Identifier') {
    return expression.name;
  }

  if (expression.type === 'BinaryExpression') {
    switch (expression.operator) {
      case '+':
        return (
          getAttributeValue(expression.left) +
          getAttributeValue(expression.right)
        );
      case '-':
        return (
          getAttributeValue(expression.left) -
          getAttributeValue(expression.right)
        );
      case '*':
        return (
          getAttributeValue(expression.left) *
          getAttributeValue(expression.right)
        );
      case '**':
        return (
          getAttributeValue(expression.left) **
          getAttributeValue(expression.right)
        );
      case '/':
        return (
          getAttributeValue(expression.left) /
          getAttributeValue(expression.right)
        );
      case '%':
        return (
          getAttributeValue(expression.left) %
          getAttributeValue(expression.right)
        );
      case '==':
        return (
          getAttributeValue(expression.left) ==
          getAttributeValue(expression.right)
        );
      case '===':
        return (
          getAttributeValue(expression.left) ===
          getAttributeValue(expression.right)
        );
      case '!=':
        return (
          getAttributeValue(expression.left) !=
          getAttributeValue(expression.right)
        );
      case '!==':
        return (
          getAttributeValue(expression.left) !==
          getAttributeValue(expression.right)
        );
      case '<':
        return (
          getAttributeValue(expression.left) <
          getAttributeValue(expression.right)
        );
      case '<=':
        return (
          getAttributeValue(expression.left) <=
          getAttributeValue(expression.right)
        );
      case '>':
        return (
          getAttributeValue(expression.left) >
          getAttributeValue(expression.right)
        );
      case '>=':
        return (
          getAttributeValue(expression.left) >=
          getAttributeValue(expression.right)
        );
      case '<<':
        return (
          getAttributeValue(expression.left) <<
          getAttributeValue(expression.right)
        );
      case '>>':
        return (
          getAttributeValue(expression.left) >>
          getAttributeValue(expression.right)
        );
      case '>>>':
        return (
          getAttributeValue(expression.left) >>>
          getAttributeValue(expression.right)
        );
      case '|':
        return (
          getAttributeValue(expression.left) |
          getAttributeValue(expression.right)
        );
      case '&':
        return (
          getAttributeValue(expression.left) &
          getAttributeValue(expression.right)
        );
      case '^':
        return (
          getAttributeValue(expression.left) ^
          getAttributeValue(expression.right)
        );
      default:
        throw new SyntaxError(
          `BinaryExpression with "${expression.operator}" is not supported`,
        );
    }
  }

  if (expression.type === 'UnaryExpression') {
    switch (expression.operator) {
      case '+':
        return +getAttributeValue(expression.argument);
      case '-':
        return -getAttributeValue(expression.argument);
      case '~':
        return ~getAttributeValue(expression.argument);
      default:
        throw new SyntaxError(
          `UnaryExpression with "${expression.operator}" is not supported`,
        );
    }
  }

  if (expression.type === 'ArrowFunctionExpression') {
    //console.log('ArrowFunctionExpression expression',expression,sourceCode);
    const source = sourceCode.slice(expression.start-6, expression.end-4);
    return source;
  }

  // Unsupported type
  throw new SyntaxError(`${expression.type} is not supported`);
};

const getNode = (node) => {
  if (node.type === 'JSXFragment') {
    return ['Fragment', null].concat(node.children.map(getNode));
  }

  if (node.type === 'JSXElement') {
    return [
      node.openingElement.name.name,
      node.openingElement.attributes
        .map((attribute) => {
          if (attribute.type === 'JSXAttribute') {
            let attributeName = attribute.name.name;

            if (isHtmlOrSvgTag(node.openingElement.name.name.toLowerCase())) {
              if (normalizeNames[attributeName.toLowerCase()]) {
                attributeName =
                normalizeNames[attributeName.toLowerCase()];
              }
            }

            let attributeValue = getAttributeValue(attribute.value);

            if (attributeValue !== undefined) {
              if (attributeName === 'style' && isString(attributeValue)) {
                attributeValue = styleToObject(attributeValue);
              }

              return {
                name: attributeName,
                value: attributeValue,
              };
            }
          }

          return null;
        })
        .filter((property) => property)
        .reduce((properties, property) => {
          return { ...properties, [property.name]: property.value };
        }, {}),
    ].concat(node.children.map(getNode));
  }

  if (node.type === 'JSXText') {
    return node.value;
  }

  // Unsupported type
  throw new SyntaxError(`${node.type} is not supported`);
};

const jsxToObj_ = (input) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  sourceCode = input;
  let parsed = null;
  try {
    parsed = acorn.Parser.extend(jsx({ allowNamespaces: false })).parse(
      `<root>${input}</root>`, { ecmaVersion:'latest' });
  } catch (e) {
    throw new SyntaxError(
      JSON.stringify({
        location: e.loc,
        validationError: `Could not parse "${input}"`,
      }),
    );
  }

  if (parsed.body[0]) {
    return parsed.body[0].expression.children
      .map(getNode)
      .filter((child) => child);
  }

  return [];
};

const jsxToObj = (input) => {
  let temp = jsxToObj_(input);
  let obj = {};
  if (temp.length==0) return obj;
  if (Array.isArray(temp[0])==false) {
    //temp = temp[0];
    obj[temp[0]] = {};
    if (temp[1]) obj[temp[0]] = temp[1];
    if (temp[2]) obj[temp[0]].children = temp[2];
  } else if (Array.isArray(temp[0])==true) {
    temp = temp[0];
    obj[temp[0]] = {};
    if (temp[1]) obj[temp[0]] = temp[1];
    if (temp[2]) obj[temp[0]].children = temp[2];
  }
  return obj;
};

module.exports = jsxToObj;
