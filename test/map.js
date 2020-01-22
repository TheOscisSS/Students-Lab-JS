const assert = require("chai").assert;
const map = require("../utils/helper").map;

describe('map', () => {
   it("Should work, when the array is empty", () => {
      let array = [];

      let result = map(array, item => item * 2)

      assert.deepEqual(result, array)
   });
});