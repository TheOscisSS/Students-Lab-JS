import { assert } from "chai";

import { map } from "../utils/helper.js";

describe("map", () => {
  it("Should work, when the array is empty", () => {
    assert.deepEqual(
      map([], item => item * 2),
      []
    );
  });

  it("Should double each item of array", () => {
    assert.deepEqual(
      map([1, 4, 9], item => item * 2),
      [2, 8, 18]
    );
  });

  it("Should work when argument of array is undefined", () => {
    assert.deepEqual(
      map([undefined], item => item),
      [undefined]
    );
  });
});
