const assert = require("chai").assert;

const bind = require('../utils/helper').bind

describe("bind", () => {
  it("Should work when function was overwritten", () => {
    let pow = (number, degree) => {
      let result = 1;
      for (let i = 0; i < degree; i++) {
        result *= number;
      }
      return result;
    }

    let doubling = bind(pow, 2);

    assert.strictEqual(doubling(2), 4)

    pow = (number, degree) => {
      return number * degree;
    }

    assert.strictEqual(doubling(3), 8)
  });

  it("Should work without first argument", () => {
    let sum = bind((a, b) => a + b)

    assert.strictEqual(sum(1, 2), 3)
  })


  it("Should work, when all arguments were passed and binded", () => {
    let sum = bind((a, b, c) => a + b + c, 5, 5, 5)

    assert.strictEqual(sum(1, 2, 3), 15)
  })

});