import { assert } from "chai";

import { curry, partial } from "../utils/helper";

describe("curry", () => {
  it("Should curry based on the number of arguments given", () => {
    const fn = (a, b, c, d) => a + b + c + d;

    const curried = curry(fn);

    assert.strictEqual(curried(1)(2)(3)(4), 10);
    assert.strictEqual(curried(1, 2)(3, 4), 10);
    assert.strictEqual(curried(1, 2, 3, 4), 10);
  });

  it("Should bind arguments", () => {
    const fn = (name, greeting) => `${name} say ${greeting}`;

    const Dima = curry(fn)("Dima");

    assert.strictEqual(Dima("Hello"), "Dima say Hello");
    assert.strictEqual(Dima("Bye", "!"), "Dima say Bye");
  });

  it("Should work with partial method", () => {
    const sum = (a, b, c) => a + b + c;

    const curried = curry(sum);
    const partialSum = partial(curried, 10);

    assert.strictEqual(partialSum(1)(1), 12);
    assert.strictEqual(partialSum(2, 3), 15);
  });
});
