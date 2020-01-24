const bind = function (callback, ...bindParam) {
  return function (...param) {
    return callback(...bindParam, ...param);
  };
};

const curry = function (callback) {
  return function curried(...param) {
    return (param.length >= callback.length) ?
      callback(...param) :
      (...param2) => curried(...param, ...param2);
  }
};

const reduce = function (array, callback, initialValue) {
  var index = 0;
  var previousValue =
    initialValue === undefined ? array[index++] : initialValue;

  function fold(currentValue, list) {
    return (list.length) ?
      fold(callback(currentValue, list.shift(), index++, array), list) :
      currentValue;
  }

  return fold(previousValue, array.slice(index, array.length));
};

const unwrap = function (callback, initialValue) {
  function unfold(current, array) {
    return ((next = callback(current))) ?
      unfold(next[1], [...array, next[0]]) :
      array;
  }

  return unfold(initialValue || 0, []);
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
      return (callback(currentValue, index, array)) ? [...previousValue, currentValue] :
        previousValue;
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
  let array = unwrap(
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

const lazy = function (callback, ...param) {
  let res, flag = false;
  return function () {
    if (!flag) {
      flag = !flag
      return res = callback(...param);
    } else return res
  };
};

const memoize = function (callback) {
  let cache = {};

  return function (param) {
    if (param in cache) {
      return cache[param]
    } else {
      let result = callback(param);

      let array = function Circle(obj) {
        return Object.keys(obj).map(key => {
          if (typeof obj[key] === "object" && obj[key]) {
            if (obj[key] !== a) {
              return Circle(obj[key]);
            } else {
              return true
            }
          } else return false
        })
      }

      function flattenDeep(arr1) {
        return reduce(arr1, (acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
      }
      console.log(flattenDeep(array(a)));

      // return isCircle ? result : (cache[param] = result)
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