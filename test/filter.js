const assert = require("chai").assert;
const filter = require("../utils/helper").filter;

describe('filter', () => {
   it("Should work, when the array is empty", () => {
      let array = [];

      let result = filter(array, item => true)

      assert.deepEqual(result, array)
   });
   it("Should return an empty array, when condition always false", () => {
      let array = [1, 2, 3, 4];

      let result = filter(array, item => false)

      assert.deepEqual(result, [])
   });
});