const partial = function (callback, ...bindParam) {
  return function (...param) {
    return callback(...bindParam, ...param);
  };
};

const curry = function (callback) {
  return function curried(...param) {
    return param.length >= callback.length ?
      callback(...param) :
      (...param2) => curried(...param, ...param2);
  };
};

const reduceRecurce = function (
  currentValue,
  remainingArrayPart,
  originalArray,
  index,
  callback
) {
  return remainingArrayPart.length ?
    reduceRecurce(
      callback(
        currentValue,
        remainingArrayPart.shift(),
        index++,
        originalArray
      ),
      remainingArrayPart,
      originalArray,
      index,
      callback
    ) :
    currentValue;
};

const reduce = function (array, callback, initialValue) {
  let index = 0;
  const previousValue =
    initialValue === undefined ? array[index++] : initialValue;

  if (previousValue === undefined && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  return reduceRecurce(
    previousValue,
    array.slice(index, array.length),
    array,
    index,
    callback
  );
};

const unwrapRecurse = function (current, array, callback) {
  const {
    next,
    state
  } = callback(current);
  return next || state ?
    unwrapRecurse(state, [...array, next], callback) :
    array;
};

const unwrap = function (callback, initialValue) {
  return unwrapRecurse(initialValue, [], callback);
};

const map = function (array, callback) {
  return reduce(
    array,
    (previousValue, currentValue, index) => {
      return [...previousValue, callback(currentValue, index, array)];
    },
    []
  );
};

const filter = function (array, callback) {
  return reduce(
    array,
    function (previousValue, currentValue, index) {
      return callback(currentValue, index, array) ? [...previousValue, currentValue] :
        previousValue;
    },
    []
  );
};

const avgEven = function (array, paramFilter = filter, paramReduce = reduce) {
  const evenArray = paramFilter(array, item => (item % 2 == 0 ? true : false));
  if (!evenArray.length) {
    return undefined;
  }

  const sumEvenArray = paramReduce(
    evenArray,
    (previous, current) => previous + current
  );

  return sumEvenArray / evenArray.length;
};

const randSum = function () {
  let count = 0;
  const array = unwrap(
    current =>
    ++count >= 10 ?
    false : [current, current + Math.floor(Math.random() * 10)],
    1
  );

  return reduce(
    array,
    (previousValue, currentValue) => previousValue + currentValue
  );
};

const findFirstRecurse = function (currentValue, index, array, callback) {
  if (currentValue === undefined) {
    return undefined;
  }
  if (!callback(currentValue, index, array)) {
    return findFirstRecurse(array[++index], index, array, callback);
  } else {
    return array[index];
  }
};

const first = function (array, callback) {
  return findFirstRecurse(array[0], 0, array, callback);
};

const lazy = function (callback, ...param) {
  let res;
  let isCalled = false;

  return function () {
    if (!isCalled) {
      isCalled = true;
      return (res = callback(...param));
    } else {
      return res;
    }
  };
};

const memoize = function (callback) {
  const cache = {};
  return function (param) {
    try {
      if (param in cache) {
        return cache[param];
      }
      const convertParam = JSON.stringify(param)
      if (convertParam !== 'null' && convertParam in cache) {
        return cache[convertParam];
      }
      if (typeof param === 'object' && param) {
        return cache[convertParam] = callback(param);
      }
      if (typeof param !== 'function') {
        return cache[param] = callback(param)
      }
      return callback(param)
    } catch {
      return callback(param)
    }
  };
};

export {
  partial,
  curry,
  reduce,
  unwrap,
  map,
  filter,
  avgEven,
  randSum,
  first,
  lazy,
  memoize
};