import { assert } from "chai";

import { first } from "../utils/helper.js";

describe("first", () => {
  it("Should work with empty array", () => {
    assert.strictEqual(
      first([], item => true),
      undefined
    );
  });

  it("Should return undefined, when the condition is false", () => {
    assert.strictEqual(
      first([1, 2, 3, 4], item => false),
      undefined
    );
  });

  it("Should find first prime number", () => {
    const isPrime = (element, index, array) => {
      let start = 2;
      while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
          return false;
        }
      }
      return element > 1;
    };

    assert.strictEqual(first([1, 5, 8, 7], isPrime), 5);
  });
});
