const partial = function(callback, ...bindParam) {
  return function(...param) {
    return callback(...bindParam, ...param);
  };
};

const curry = function(callback) {
  return function curried(...param) {
    return param.length >= callback.length
      ? callback(...param)
      : (...param2) => curried(...param, ...param2);
  };
};

const reduceRecurce = function(currentValue, list, array, index, callback) {
  return list.length
    ? reduceRecurce(
        callback(currentValue, list.shift(), index++, array),
        list,
        array,
        index,
        callback
      )
    : currentValue;
};

const reduce = function(array, callback, initialValue) {
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

const unwrapRecurse = function(current, array, callback) {
  return (next = callback(current))
    ? unwrapRecurse(next[1], [...array, next[0]], callback)
    : array;
};

const unwrap = function(callback, initialValue) {
  return unwrapRecurse(initialValue || 0, [], callback);
};

const map = function(array, callback) {
  return reduce(
    array,
    (previousValue, currentValue, index) => {
      return [...previousValue, callback(currentValue, index, array)];
    },
    []
  );
};

const filter = function(array, callback) {
  return reduce(
    array,
    function(previousValue, currentValue, index) {
      return callback(currentValue, index, array)
        ? [...previousValue, currentValue]
        : previousValue;
    },
    []
  );
};

const avgEven = function(array) {
  const evenArray = filter(array, item => (item % 2 == 0 ? true : false));
  if (!evenArray.length) {
    return undefined;
  }

  const sumEvenArray = reduce(
    evenArray,
    (previous, current) => previous + current
  );

  return sumEvenArray / evenArray.length;
};

const randSum = function() {
  let count = 0;
  const array = unwrap(
    current =>
      ++count >= 10
        ? false
        : [current, current + Math.floor(Math.random() * 10)],
    1
  );

  return reduce(
    array,
    (previousValue, currentValue) => previousValue + currentValue
  );
};

function findFirstRecurse(currentValue, index, array, callback) {
  if (currentValue === undefined) {
    return undefined;
  }
  if (!callback(currentValue, index, array)) {
    return findFirstRecurse(array[++index], index, array, callback);
  } else {
    return array[index];
  }
}

const first = function(array, callback) {
  return findFirstRecurse(array[0], 0, array, callback);
};

const lazy = function(callback, ...param) {
  let res;
  let flag = false;

  return function() {
    if (!flag) {
      flag = !flag;
      return (res = callback(...param));
    } else {
      return res;
    }
  };
};

const memoize = function(callback) {
  const cache = {};

  return function(param) {
    if (param in cache) {
      return cache[param];
    } else {
      const result = callback(param);

      function isCircleRef(obj) {
        return reduce(
          Object.keys(obj),
          (prev, current) => {
            if (typeof obj[current] === "object" && obj[current]) {
              return obj[current] !== result ? isCircleRef(obj[current]) : true;
            } else {
              return false || prev;
            }
          },
          false
        );
      }

      if (isNaN(result) || result == undefined) {
        return result;
      }

      return isCircleRef(result) ? result : (cache[param] = result);
    }
  };
};

module.exports = {
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
