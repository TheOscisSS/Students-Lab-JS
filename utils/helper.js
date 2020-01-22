const bind = function (callback, param) {
  return function (...params) {
    return callback(param, ...params);
  };
};

const curry = function (callback) {
  return function curried(...param) {
    if (param.length >= callback.length) {
      return callback(...param);
    } else {
      return function (...param2) {
        return curried(...param, ...param2);
      };
    }
  };
};

const reduce = function (array, callback, initialValue) {
  var index = 0;
  var previousValue =
    initialValue === undefined ? array[index++] : initialValue;

  function fold(currentValue, list) {
    if (list.length) {
      return fold(callback(currentValue, list.shift(), index++, array), list);
    } else {
      return currentValue;
    }
  }

  return fold(previousValue, array.slice(index, array.length));
};

const unwrap = function (callback, initialValue) {
  function unfold(current, array) {
    if ((next = callback(current))) {
      return unfold(next[1], [...array, next[0]]);
    } else return array;
  }
  return unfold(initialValue || 0, []);
};

const map = function (array, callback) {
  return reduce(
    array,
    function (previousValue, currentValue, index) {
      return [...previousValue, callback(currentValue, index, array)];
    },
    []
  );
};

const filter = function (array, callback) {
  return reduce(
    array,
    function (previousValue, currentValue, index) {
      if (callback(currentValue, index, array)) {
        return [...previousValue, currentValue];
      } else {
        return previousValue;
      }
    },
    []
  );
};

const avgEven = function (array) {
  const evenArray = filter(array, item => (item % 2 == 0 ? true : false));
  if (!evenArray.length) return undefined;
  const sumEvenArray = reduce(
    evenArray,
    (previous, current) => previous + current
  );
  return sumEvenArray / evenArray.length;
};

const randSum = function () {
  let count = 0;
  let array = unwrap(current => ++count >= 10 ? false : [current, current + Math.floor(Math.random() * 10)], 1);
  return reduce(array, (previousValue, currentValue) => previousValue + currentValue)
};

const first = function (array, callback) {
  var index = 0;

  function find(currentValue) {
    if (currentValue === undefined) return undefined;
    if (!callback(currentValue, index, array)) {
      return find(array[++index]);
    } else return array[index];
  }
  return find(array[index]);
};

let lazy = function (callback, ...param) {
  return function () {
    return callback(...para);
  };
};

let memoization = function (callback) {
  let cache = {}
  return function (...param) {
    console.log(cache)
    param = param.slice(0, callback.length)
    if (param in cache) {
      console.log("chache")
      return cache[param]
    } else {
      console.log("no chache")
      return (cache[param] = callback(...param))
    }
  }
}

module.exports = {
  bind,
  curry,
  reduce,
  unwrap,
  map,
  filter,
  avgEven,
  first
};