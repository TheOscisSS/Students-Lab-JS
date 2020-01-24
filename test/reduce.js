const assert = require("chai").assert;

const reduce = require("../utils/helper").reduce;

describe("reduce", () => {
   it("Should return initialValue, when the array is empty", () => {
      let initialValue = 5;

      let result = reduce([], (a, b) => a + b, initialValue);

      assert.strictEqual(result, initialValue);
   });

   it("Should return undefined, when the array and initialValue is empty", () => {
      assert.strictEqual(
         reduce([], (a, b) => a + b),
         undefined
      );
   });

   it("Should work without initialValue", () => {
      assert.strictEqual(
         reduce([1, 3, 2], (a, b) => a + b),
         6
      );
   });
});