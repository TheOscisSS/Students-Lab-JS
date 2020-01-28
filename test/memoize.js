const chai = require("chai");
const spies = require("chai-spies");

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

const memoize = require("../utils/helper").memoize;

describe("memoize", () => {
  it("Should invoke the passed function and return result", () => {
    const double = memoize(a => a * 2);

    assert.strictEqual(double(5), 10);
  });

  it("Should cache the result invoked function", () => {
    const spy = chai.spy();
    const callback = value => {
      spy();
      return value;
    };

    const fn = memoize(callback)

    fn(1);
    fn(1);
    expect(spy).to.have.been.called.once;
    fn(2);
    expect(spy).to.have.been.called.twice;
  });

  it("Shouldn't cache the objects, that reference to themselves", () => {
    const spy = chai.spy();
    const b = {};
    const callback = value => {
      spy();
      return value;
    };

    b.a = b;
    const fn = memoize(callback)

    fn(b);
    fn(b);
    expect(spy).to.have.been.called.twice;
  });

  it("Should work with object", () => {
    const spy = chai.spy();
    const callback = value => {
      spy();
      return value;
    };

    const fn = memoize(callback)

    fn({
      1: "first"
    });
    fn({
      1: "first"
    });
    expect(spy).to.have.been.called.once;

    fn({
      1: 'second'
    });
    expect(spy).to.have.been.called.twice;
  })

  it("Should work with array", () => {
    const spy = chai.spy();
    const callback = value => {
      spy();
      return value;
    };

    const fn = memoize(callback)

    fn([1, 2, 3]);
    fn([1, 2, 3]);
    expect(spy).to.have.been.called.once;

    fn('1', '2', '3');
    expect(spy).to.have.been.called.twice;
  })
});