const assert = require("chai").assert;
const lazy = require("../utils/helper").lazy;

describe('lazy', () => {
   it('Should call function lazy', () => {
      let fn = lazy((a) => a * 2, 2);

      assert.strictEqual(fn(), 4);
      assert.strictEqual(fn(), 4);
   })

});