const bind = function(callback, ...bindParam) {
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

const reduce = function(array, callback, initialValue) {
  let index = 0,
    previousValue = initialValue === undefined ? array[index++] : initialValue;

  function fold(currentValue, list) {
    return list.length
      ? fold(callback(currentValue, list.shift(), index++, array), list)
      : currentValue;
  }

  return fold(previousValue, array.slice(index, array.length));
};

const unwrap = function(callback, initialValue) {
  function unfold(current, array) {
    return (next = callback(current))
      ? unfold(next[1], [...array, next[0]])
      : array;
  }

  return unfold(initialValue || 0, []);
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
  let evenArray = filter(array, item => (item % 2 == 0 ? true : false));
  if (!evenArray.length) return undefined;

  let sumEvenArray = reduce(
    evenArray,
    (previous, current) => previous + current
  );

  return sumEvenArray / evenArray.length;
};

const randSum = function() {
  let count = 0,
    array = unwrap(
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

const first = function(array, callback) {
  let index = 0;

  function find(currentValue) {
    if (currentValue === undefined) return undefined;
    if (!callback(currentValue, index, array)) {
      return find(array[++index]);
    } else return array[index];
  }

  return find(array[index]);
};

const lazy = function(callback, ...param) {
  let res,
    flag = false;
  return function() {
    if (!flag) {
      flag = !flag;
      return (res = callback(...param));
    } else return res;
  };
};

const memoize = function(callback) {
  let cache = {};

  return function(param) {
    if (param in cache) {
      return cache[param];
    } else {
      let result = callback(param);

      function isCircleRef(obj) {
        return reduce(
          Object.keys(obj),
          (prev, current) => {
            if (typeof obj[current] === "object" && obj[current]) {
              return obj[current] !== result ? array(obj[current]) : true;
            } else return false || prev;
          },
          false
        );
      }

      if (isNaN(result) || result == undefined) return result;

      return isCircleRef(result) ? result : (cache[param] = result);
    }
  };
};

module.exports = {
  bind,
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
