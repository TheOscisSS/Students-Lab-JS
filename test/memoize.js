import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

import { memoize } from "../utils/helper.js";

describe("memoize", () => {
  const callback = value => value;

  it("Should invoke the passed function and return result", () => {
    const double = memoize(a => a * 2);

    assert.strictEqual(double(5), 10);
  });

  it("Should cache the result invoked function", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(1);
    fn(1);
    expect(spy).to.have.been.called.once;
    fn(2);
    expect(spy).to.have.been.called.twice;
  });

  it("Shouldn't cache the objects, that reference to themselves", () => {
    const b = {};

    const spy = chai.spy(callback);

    b.a = b;
    const fn = memoize(spy);

    fn(b);
    fn(b);
    expect(spy).to.have.been.called.twice;
  });

  it("Shouldn't work with function", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(() => 1);
    fn(() => 1);
    expect(spy).to.have.been.called.twice;
  });

  it("Should work with any arguments", () => {
    const arrayOfArgs = [null, NaN, undefined, Infinity, -Infinity, [], {}];
    for (let i = 0; i < arrayOfArgs.length; i++) {
      const spy = chai.spy(callback);

      const fn = memoize(spy);
      fn(arrayOfArgs[i]);
      fn(arrayOfArgs[i]);
      expect(spy).to.have.been.called.once;
    }
  });
});
