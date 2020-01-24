const assert = require("chai").assert;

const curry = require("../utils/helper").curry;
const bind = require('../utils/helper').bind;

describe("curry", () => {
  it("Should curry based on the number of arguments given", () => {
    let fn = (a, b, c, d) => a + b + c + d;

    let curried = curry(fn);

    assert.strictEqual(curried(1)(2)(3)(4), 10);
    assert.strictEqual(curried(1, 2)(3, 4), 10);
    assert.strictEqual(curried(1, 2, 3, 4), 10);
  });

  it("Should bind arguments", () => {
    let fn = (name, greeting) => `${name} say ${greeting}`

    let Dima = (curry(fn))('Dima');

    assert.strictEqual(Dima('Hello'), 'Dima say Hello')
    assert.strictEqual(Dima('Bye', '!'), 'Dima say Bye')
  })

  it("Should work with partial method", () => {
    let sum = (a, b, c) => a + b + c;

    let curried = curry(sum)
    let bindSum = bind(curried, 10)

    assert.strictEqual(bindSum(1)(1), 12)
    assert.strictEqual(bindSum(2, 3), 15)
  })
});