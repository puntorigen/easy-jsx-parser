# easy-jsx-parser

[![npm version](https://img.shields.io/npm/v/easy-jsx-parser)](https://www.npmjs.com/package/easy-jsx-parser) ![npm downloads](https://img.shields.io/npm/dm/easy-jsx-parser)

> Simple JSX tags parser that returns an easy to read object for every JSX tag

## Install

```
$ npm i easy-jsx-parser
```

## Usage

```js
const jsxToObj = require('easy-jsx-parser');

jsxToObj('<Test myProp={true}>My Child</Test>');
/*=> '{ 
    Test: {
        myProp: true,
        children: 'My Child'
    }
}'*/
```

## Features

* `<Test />`: Self-closing JSX tags
* `<Test myProp="string">`: String props
* `` <Test myProp={`string`}> ``: Template props
* `<Test myProp>`: True props
* `<Test myProp={false}>`: Boolean props
* `<Test myProp={34}>`: Number props
* `<Test myProp={3 + 3 + 3}>`: Props with arithmetic, comparison or bitwise operators
* `<Test myProp={['Test', true, 34]}>`: Arrays (with strings, numbers or booleans)
* `<Test myProp={{ test: 34 }}>`: Objects with string keys and string, number or boolean value
* `<>Test</>`: Fragments
* HTML/SVG DOM attributes are converted to correct React equivalent (`class` -> `className`)
* `<Test myProp={(data)=>console.log(data)}>`: Objects with string keys and arrow functions support

## License

MIT © [Pablo Schaffner](https://www.github.com/puntorigen)
