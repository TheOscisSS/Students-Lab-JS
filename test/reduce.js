// const assert = require("chai").assert;

import { assert } from "chai";

const reduce = require("../utils/helper").reduce;

describe("reduce", () => {
  it("Should return initialValue, when the array is empty", () => {
    const initialValue = 5;

    const result = reduce([], (a, b) => a + b, initialValue);

    assert.strictEqual(result, initialValue);
  });

  it("Shouldn't work, when the array and initialValue is empty", () => {
    assert.throw(
      () => reduce([], (a, b) => a + b),
      TypeError,
      "Reduce of empty array with no initial value"
    );
  });

  it("Should work without initialValue", () => {
    const result = reduce([1, 3, 2], (a, b) => a + b);

    assert.strictEqual(result, 6);
  });
});
