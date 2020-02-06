import {
  assert
} from "chai";

import {
  unwrap
} from "../utils/helper.js";

describe("unwrap", () => {
  it("Should return an empty array, when the argument is 0", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : {
        next: current,
        state: current + 2
      }), 0);

    assert.deepEqual(evensUpTo(0), []);
  });

  it("Shouldn't work when initialValue is undefined", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : {
        next: current,
        state: current + 2
      }));

    assert.deepEqual(evensUpTo(10), []);
  });

  it("Should work with initialValue", () => {
    const evensUpTo = n =>
      unwrap(current => (current >= n ? false : {
        next: current,
        state: current + 2
      }), 10);

    assert.deepEqual(evensUpTo(20), [10, 12, 14, 16, 18]);
  });
});