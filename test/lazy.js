import chai from "chai";
import spies from "chai-spies";

chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;

import { lazy } from "../utils/helper.js";

describe("lazy", () => {
  it("Should call function lazy", () => {
    const lazyFunction = lazy(a => a * 2, 2);

    assert.strictEqual(lazyFunction(), 4);
    assert.strictEqual(lazyFunction(), 4);
  });

  it("Should avoid repeated evaluations", () => {
    const spy = chai.spy();
    const callback = value => {
      spy();
      return value;
    };

    const lazyFunction = lazy(callback, 10);

    assert.strictEqual(lazyFunction(), 10);
    expect(spy).to.have.been.called.once;

    assert.strictEqual(lazyFunction(), 10);
    expect(spy).to.have.been.called.once;
  });

  it("Should work with undefined argument", () => {
    const spy = chai.spy();
    const callback = value => {
      spy();
      return value;
    };

    const lazyFunction = lazy(callback, undefined);

    assert.strictEqual(lazyFunction(), undefined);
    expect(spy).to.have.been.called.once;

    assert.strictEqual(lazyFunction(), undefined);
    expect(spy).to.have.been.called.once;
  });
});
