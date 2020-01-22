const assert = require("chai").assert;
const avgEven = require("../utils/helper").avgEven;

describe('avgEven', () => {
   it("Should return undefined, when the array is empty", () => {
      assert.strictEqual(avgEven([]), undefined)
   })

   it("Should return undefined, when there aren't even elements", () => {
      assert.strictEqual(avgEven([1]), undefined)
   })

   it("Should word with negative numbers", () => {
      assert.strictEqual(avgEven([-2]), -2)
   })
});