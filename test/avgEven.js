import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

import { avgEven, filter, reduce } from "../utils/helper";

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
    const spyFilter = chai.spy(filter);
    const spyReduce = chai.spy(reduce);

    avgEven([1, 2], spyFilter, spyReduce);

    expect(spyFilter).to.have.been.called();
    expect(spyReduce).to.have.been.called();
  });
});
