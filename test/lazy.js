const assert = require("chai").assert;
const expect = require('chai').expect

const lazy = require("../utils/helper").lazy;

describe("lazy", () => {
  // it("Should call function lazy", () => {
  //   const lazyFunction = lazy(a => a * 2, 2);

  //   assert.strictEqual(lazyFunction(), 4);
  //   assert.strictEqual(lazyFunction(), 4);
  // });

  it("Should avoid repeated evaluations", () => {
    let count = 0;
    const callback = value => {
      count++;
      return value;
    };

    const lazyFunction = lazy(callback, 10);

    assert.strictEqual(lazyFunction(), 10);
    assert.equal(count, 1);
    assert.strictEqual(lazyFunction(), 10);
    assert.equal(count, 1);
  });

  it("Should work with undefined argument", () => {
    let count = 0;
    const callback = value => {
      count++;
      return value;
    };

    const lazyFunction = lazy(callback, undefined);

    assert.strictEqual(lazyFunction(), undefined);
    assert.equal(count, 1);

    assert.strictEqual(lazyFunction(), undefined);
    assert.equal(count, 1);
  });
});