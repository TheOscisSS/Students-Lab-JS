import { assert } from "chai";

import { unwrap } from "../utils/helper.js";

describe("unwrap", () => {
  it("Should return an empty array, when the argument is 0", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : [current, current + 2]), 0);

    assert.deepEqual(evensUpTo(0), []);
  });

  it("Should work without initialValue", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : [current, current + 2]));

    assert.deepEqual(evensUpTo(10), [0, 2, 4, 6, 8]);
  });

  it("Should work with initialValue", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : [current, current + 2]), 10);

    assert.deepEqual(evensUpTo(20), [10, 12, 14, 16, 18]);
  });
});
