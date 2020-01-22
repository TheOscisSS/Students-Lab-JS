const assert = require("chai").assert;
const first = require("../utils/helper").first;

describe('first', () => {
   it("Should work with empty array", () => {
      assert.strictEqual(first([], item => true), undefined)
   })

   it("Should return undefined, when the condition is false", () => {
      assert.strictEqual(first([1, 2, 3, 4], item => false), undefined)
   })
});