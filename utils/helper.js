const bind = function(callback, param) {
  return function(...params) {
    return callback(param, ...params);
  };
};

const curry = function(callback) {
  return function curried(...param) {
    if (param.length >= callback.length) {
      return callback(...param);
    } else {
      return function(...param2) {
        return curried(...param, ...param2);
      };
    }
  };
};

function wrapper() {
  let sum = 0;
  return function sumArr(array) {
    if (array.length) {
      sum += array.pop();
      return sumArr(array);
    } else {
      return sum;
    }
  };
}

// function sumArr(array, sum) {
//    sum = sum || 0;
//    if (array.length) {
//       return sumArr(array.slice(0, -1), sum + array[array.length - 1]);
//    } else {
//       return sum;
//    }
// }

// [1, 2, 3]
let reduce = function(callback, initialValue) {
  return function fold(array, result) {
    result = result || initialValue || array.shift();
    if (array.length) {
      return fold(array, callback(result, array.shift()));
    } else {
      return result;
    }
  };
};

let a = reduce((previousValue, currentValue) => previousValue + currentValue);
a([1, 2, 3]);

// let fold = function (array, callback, initialValue) {
//    let previousValue = initialValue || 0;
//    array.map((currentValue, index) => {
//       previousValue = callback(previousValue, currentValue, index, array)
//    })

//    return previousValue;
// }

fold(
  [1, 2, 3, 4],
  (previousValue, currentValue) => previousValue + currentValue
);

module.exports = {
  bind,
  curry
};
