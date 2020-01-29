import { assert } from "chai";

import { filter } from "../utils/helper.js";

describe("filter", () => {
  it("Should work, when the array is empty", () => {
    const array = [];

    const result = filter(array, item => true);

    assert.deepEqual(result, array);
  });

  it("Should return an empty array, when condition always false", () => {
    const array = [1, 2, 3, 4];

    const result = filter(array, item => false);

    assert.deepEqual(result, []);
  });

  it("Should work, when callback return non-standard values", () => {
    const array = [1, 2, 3, 4];

    assert.deepEqual(
      filter(array, item => 0),
      []
    );
    assert.deepEqual(
      filter(array, item => 1),
      array
    );
    assert.deepEqual(
      filter(array, item => ""),
      []
    );
    assert.deepEqual(
      filter(array, item => "0"),
      array
    );
  });

  it("Should fiter words by length", () => {
    const words = [
      "spray",
      "limit",
      "elite",
      "exuberant",
      "destruction",
      "present"
    ];

    assert.deepEqual(
      filter(words, word => word.length > 6),
      ["exuberant", "destruction", "present"]
    );
  });
});
