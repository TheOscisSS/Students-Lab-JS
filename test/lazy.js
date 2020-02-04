import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

import { lazy } from "../utils/helper.js";

describe("lazy", () => {
  const callback = value => {
    return value;
  };

  it("Should create a lazy function without arguments", () => {
    const lazyFunction = lazy(() => "Return smth");

    assert.strictEqual(lazyFunction(), "Return smth");
  });

  it("Should avoid repeated evaluations", () => {
    const spy = chai.spy(callback);

    const lazyFunction = lazy(spy, 10);

    assert.strictEqual(lazyFunction(), 10);
    expect(spy).to.have.been.called.once;

    assert.strictEqual(lazyFunction(), 10);
    expect(spy).to.have.been.called.once;
  });

  it("Should work with undefined argument", () => {
    const spy = chai.spy(callback);

    const lazyFunction = lazy(spy, undefined);

    assert.strictEqual(lazyFunction(), undefined);
    expect(spy).to.have.been.called.once;

    assert.strictEqual(lazyFunction(), undefined);
    expect(spy).to.have.been.called.once;
  });
});
