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
  var previousValue = initialValue === undefined ? array[index++] : initialValue;

  function fold(currentValue, list) {
    // console.log(`previousValue: ${currentValue}, currentValue: ${list[0]}, index: ${index}, list: ${list}`)
    if (list.length) {
      return fold(callback(currentValue, list.shift(), index++, array), list);
    } else {
      return currentValue;
    }
  }

  return fold(previousValue, array.slice(index, array.length))
}

const map = function (array, callback) {
  return reduce(array, function (previousValue, currentValue) {
    return [...previousValue, callback(currentValue)]
  }, []);
}

// const a = map([1, 4, 9], (item) => item * 2);

const filter = function (array, callback) {
  return reduce(array, function (previousValue, currentValue) {
    if (callback(currentValue)) {
      return [...previousValue, currentValue]
    } else {
      return previousValue
    }
  }, [])
}

// const a = filter([1, 2, 3, 4], item => item%2 == 0? true : false)

module.exports = {
  bind,
  curry,
  reduce,
  map,
  filter
};