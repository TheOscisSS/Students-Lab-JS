const assert = require("chai").assert;

const lazy = require("../utils/helper").lazy;

describe("lazy", () => {
  it("Should call function lazy", () => {
    let lazyFunction = lazy(a => a * 2, 2);

    assert.strictEqual(lazyFunction(), 4);
    assert.strictEqual(lazyFunction(), 4);
  });

  it("Should avoid repeated evaluations", () => {
    let count = 0;
    let callback = value => {
      count++;
      return value;
    };

    let lazyFunction = lazy(callback, 10);

    assert.strictEqual(lazyFunction(), 10);
    assert.equal(count, 1);

    assert.strictEqual(lazyFunction(), 10);
    assert.equal(count, 1);
  });

  it("Should work with undefined argument", () => {
    let count = 0;
    let callback = value => {
      count++;
      return value;
    };

    let lazyFunction = lazy(callback, undefined);

    assert.strictEqual(lazyFunction(), undefined);
    assert.equal(count, 1);

    assert.strictEqual(lazyFunction(), undefined);
    assert.equal(count, 1);
  });
});
