const assert = require("chai").assert;

const unwrap = require("../utils/helper").unwrap;

describe('unwrap', () => {
   it('Should return an empty array, when the argument is 0', () => {
      let evensUpTo = n => unwrap(current => current >= n ? false : [current, current + 2], 0)

      assert.deepEqual(evensUpTo(0), [])
   })

   it("Should work without initialValue", () => {
      let evensUpTo = n => unwrap(current => current >= n ? false : [current, current + 2])

      assert.deepEqual(evensUpTo(10), [0, 2, 4, 6, 8])
   });

   it("Should work with initialValue", () => {
      let evensUpTo = n => unwrap(current => current >= n ? false : [current, current + 2], 10)

      assert.deepEqual(evensUpTo(20), [10, 12, 14, 16, 18])
   })
});