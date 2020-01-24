const assert = require("chai").assert;

const map = require("../utils/helper").map;

describe('map', () => {
   it("Should work, when the array is empty", () => {
      assert.deepEqual(map([], item => item * 2), [])
   });

   it('Should double each item of array', () => {
      assert.deepEqual(map([1, 4, 9], item => item * 2), [2, 8, 18])
   })

   it('Should work when argument of array is undefined', () => {
      assert.deepEqual(map([undefined], item => item), [undefined])
   })
})