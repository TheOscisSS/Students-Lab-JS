const bind = function (callback, param) {
  return function (...params) {
    return callback(param, ...params);
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
    return flag ? res : res = callback(...param);
  };
};

const memoize = function (callback) {
  let cache = {};
  if (callback === memoize) {
    throw new TypeError('Circle reference')
  }

  return function (param) {
    return (param in cache) ?
      cache[param] :
      (cache[param] = callback(param));
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