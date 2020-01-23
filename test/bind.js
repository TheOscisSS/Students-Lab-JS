const assert = require("chai").assert;

const bind = require('../utils/helper').bind

describe("bind", () => {
  // it("Shoud work when function was overwritten", () => {
  //   let pow = (number, degree) => {
  //     let result = 1;
  //     for (let i = 0; i < degree; i++) {
  //       result *= number;
  //     }
  //     return result;
  //   }

  //   let doubling = bind(pow, 2);

  //   assert.strictEqual(doubling(2), 4)

  //   pow = (number, degree) => {
  //     return number * degree;
  //   }

  //   assert.strictEqual(doubling(2), 4)
  // });

});