const test = require('ava');
const jsxToObj = require('.');

test('main', (t) => {
  // Supported JSX syntax
  t.deepEqual(jsxToObj(''), {});
  t.deepEqual(jsxToObj('Test'), {'Test':{} });
  t.deepEqual(jsxToObj('<>Test</>'), {'Fragment': { children:'Test' } });
  /*
  t.deepEqual(jsxToObj('<Test></Test>'), [['Test', {}]]);
  t.deepEqual(jsxToObj('<Test>Test</Test>'), [['Test', {}, 'Test']]);
  t.deepEqual(jsxToObj('<Test><Test /></Test>'), [['Test', {}, ['Test', {}]]]);
  t.deepEqual(jsxToObj('<Test />'), [['Test', {}]]);
  t.deepEqual(jsxToObj('<Test test />'), [['Test', { test: true }]]);
  t.deepEqual(jsxToObj('<Test test="test" />'), [['Test', { test: 'test' }]]);
  t.deepEqual(jsxToObj('<Test test={`test`} />'), [
    ['Test', { test: 'test' }],
  ]);
  t.deepEqual(jsxToObj('<Test test={`test ${1}`} />'), [
    ['Test', { test: 'test 1' }],
  ]);
  t.deepEqual(jsxToObj('<Test test={`test ${["Test"]}`} />'), [
    ['Test', { test: 'test Test' }],
  ]);
  t.deepEqual(jsxToObj('<Test test={test} />'), [['Test', { test: 'test' }]]);
  t.deepEqual(jsxToObj('<Test test={1} />'), [['Test', { test: 1 }]]);
  t.deepEqual(jsxToObj('<Test test={false} />'), [['Test', { test: false }]]);
  t.deepEqual(jsxToObj('<Test test={["Test"]} />'), [
    ['Test', { test: ['Test'] }],
  ]);

  // Binary expressions: Arithmetic operators
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
  t.deepEqual(jsxToObj('<Test test={3 + 3} />'), [['Test', { test: 6 }]]);
  t.deepEqual(jsxToObj('<Test test={3 + 3 + 3} />'), [['Test', { test: 9 }]]);
  t.deepEqual(jsxToObj('<Test test={3 - 3} />'), [['Test', { test: 0 }]]);
  t.deepEqual(jsxToObj('<Test test={3 * 3} />'), [['Test', { test: 9 }]]);
  t.deepEqual(jsxToObj('<Test test={3 ** 3} />'), [['Test', { test: 27 }]]);
  t.deepEqual(jsxToObj('<Test test={3 / 3} />'), [['Test', { test: 1 }]]);
  t.deepEqual(jsxToObj('<Test test={3 % 3} />'), [['Test', { test: 0 }]]);

  // Binary expressions: Comparison operators
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
  t.deepEqual(jsxToObj('<Test test={3 == "3"} />'), [
    ['Test', { test: true }],
  ]);
  t.deepEqual(jsxToObj('<Test test={3 === "3"} />'), [
    ['Test', { test: false }],
  ]);
  t.deepEqual(jsxToObj('<Test test={3 != "3"} />'), [
    ['Test', { test: false }],
  ]);
  t.deepEqual(jsxToObj('<Test test={3 !== "3"} />'), [
    ['Test', { test: true }],
  ]);
  t.deepEqual(jsxToObj('<Test test={3 > 4} />'), [['Test', { test: false }]]);
  t.deepEqual(jsxToObj('<Test test={3 >= 3} />'), [['Test', { test: true }]]);
  t.deepEqual(jsxToObj('<Test test={3 < 4} />'), [['Test', { test: true }]]);
  t.deepEqual(jsxToObj('<Test test={3 <= 3} />'), [['Test', { test: true }]]);

  // Binary expressions: Bitwise Operators
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
  t.deepEqual(jsxToObj('<Test test={3 << 3} />'), [['Test', { test: 24 }]]);
  t.deepEqual(jsxToObj('<Test test={3 >> 3} />'), [['Test', { test: 0 }]]);
  t.deepEqual(jsxToObj('<Test test={3 >>> 3} />'), [['Test', { test: 0 }]]);
  t.deepEqual(jsxToObj('<Test test={3 | 3} />'), [['Test', { test: 3 }]]);
  t.deepEqual(jsxToObj('<Test test={3 & 3} />'), [['Test', { test: 3 }]]);
  t.deepEqual(jsxToObj('<Test test={3 ^ 3} />'), [['Test', { test: 0 }]]);

  // Unary expressions
  t.deepEqual(jsxToObj('<Test test={-2} />'), [['Test', { test: -2 }]]);
  t.deepEqual(jsxToObj('<Test test={+2} />'), [['Test', { test: 2 }]]);
  t.deepEqual(jsxToObj('<Test test={~2} />'), [['Test', { test: -3 }]]);

  // Unsupported syntax
  t.throws(() => jsxToObj('<Test test={"test" in test}>{test}</Test>'), {
    instanceOf: SyntaxError,
  });

  t.throws(() => jsxToObj('<Test>{test}</Test>'), {
    instanceOf: SyntaxError,
  });

  t.throws(() => jsxToObj('<Test test={...xxx} />'), {
    instanceOf: SyntaxError,
  });

  t.throws(() => jsxToObj('<!-- HTML Comment -->'), {
    instanceOf: SyntaxError,
  });
  */
});
