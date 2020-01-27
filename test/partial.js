const assert = require("chai").assert;

const partial = require('../utils/helper').partial

describe("partial methods", () => {
  it("Should create a function that can be invoked with additional arguments", () => {
    const Dima = partial((name, greeting) => (`${name} say ${greeting}!`), 'Dima');

    assert.strictEqual(Dima("Hey"), "Dima say Hey!")
  })

  it("Should work without first argument", () => {
    const sum = partial((a, b) => a + b)

    assert.strictEqual(sum(1, 2), 3)
  })


  it("Should work, when all arguments were passed and bonded", () => {
    const sum = partial((a, b, c) => a + b + c, 5, 5, 5)

    assert.strictEqual(sum(1, 2, 3), 15)
  })

});