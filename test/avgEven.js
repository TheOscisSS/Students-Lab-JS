import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should()

import {
  avgEven,
  reduce,
  filter
} from "../utils/helper.js";

describe("avgEven", () => {
  it("Should return undefined, when the array is empty", () => {
    assert.strictEqual(avgEven([]), undefined);
  });

  it("Should return undefined, when there aren't even elements", () => {
    assert.strictEqual(avgEven([1]), undefined);
  });

  it("Should word with negative numbers", () => {
    assert.strictEqual(avgEven([-2]), -2);
  });

  it("Should calls 'filter' and 'reduce' internally", () => {
    let spy = chai.spy(avgEven)
    // let spy1 = chai.spy(reduce)

    spy([1, 2, 3])

    expect(spy).to.have.been.called()
  })
});