const assert = require("chai").assert;

const memoize = require("../utils/helper").memoize;

describe("memoize", () => {
  it("Should invoke the passed function and return result", () => {
    let double = memoize(a => a * 2);

    assert.strictEqual(double(5), 10);
  });

  it("Should cache the result invoked function", () => {
    let count = 0;

    let add = memoize(param => {
      count++;
      return param;
    });

    add(1);
    assert.deepEqual(count, 1);
    add(1);
    assert.deepEqual(count, 1);
    add(2);
    assert.deepEqual(count, 2);
  });

  it("Shouldn't cache the objects, that reference to themselves", () => {
    let count = 0;
    let b = {};
    b.a = b;

    let add = memoize(param => {
      count++;
      return b;
    });

    add(1);
    assert.deepEqual(count, 1);
    add(1);
    assert.deepEqual(count, 2);
    add(2);
    assert.deepEqual(count, 3);
  });

  it("shouldn't cache the result of functions witch return undefined or NaN", () => {
    let count = 0;

    let first = memoize(param => {
      count++;
      return undefined;
    });

    let second = memoize(param => {
      count++;
      return NaN;
    });

    first(1);
    assert.deepEqual(count, 1);
    first(1);
    assert.deepEqual(count, 2);

    second(2);
    assert.deepEqual(count, 3);
    second(2);
    assert.deepEqual(count, 4);
  });
});
