import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

import {
  memoize
} from "../utils/helper.js";

describe("memoize", () => {
  const callback = value => {
    return value;
  };
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

  it("Should work with object", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn({
      1: "first"
    });
    fn({
      1: "first"
    });
    expect(spy).to.have.been.called.once;

    fn({
      1: "second"
    });
    expect(spy).to.have.been.called.twice;
  });

  it("Should work with array", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn([1, 2, 3]);
    fn([1, 2, 3]);
    expect(spy).to.have.been.called.once;

    fn("1", "2", "3");
    expect(spy).to.have.been.called.twice;
  });

  it("Shouldn't work with function", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(() => 1);
    fn(() => 1);
    expect(spy).to.have.been.called.twice;
  });

  it("Should work with null", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(null);
    fn(null);
    expect(spy).to.have.been.called.once;

    fn(NaN);
    expect(spy).to.have.been.called.twice;
  });

  it("Should work with NaN", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(NaN);
    fn(NaN);
    expect(spy).to.have.been.called.once;
  });

  it("Should work with undefined", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(undefined);
    fn(undefined);
    expect(spy).to.have.been.called.once;
  });

  it("Should work with Infinity", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(Infinity);
    fn(Infinity);
    expect(spy).to.have.been.called.once;
  });

  it("Should work with -Infinity", () => {
    const spy = chai.spy(callback);

    const fn = memoize(spy);

    fn(-Infinity);
    fn(-Infinity);
    expect(spy).to.have.been.called.once;
  });
});