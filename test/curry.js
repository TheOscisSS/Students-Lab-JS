const assert = require("chai").assert;

const curry = require("../utils/helper").curry;

describe("curry", () => {
  it("Should curry based on the number of arguments given", () => {
    const fn = (a, b, c, d) => a + b + c + d;

    let curried = curry(fn);

    assert.strictEqual(curried(1)(2)(3)(4), 10);
    assert.strictEqual(curried(1, 2)(3, 4), 10);
    assert.strictEqual(curried(1, 2, 3, 4), 10);
  });
});
