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

//[4, 5, 8, 12]
const reduce = function(array, callback, initialValue) {
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

const unwrap = function(callback, initialValue) {
  function unfold(current, array) {
    if ((next = callback(current))) {
      return unfold(next[1], [...array, next[0]]);
    } else return array;
  }
  return unfold(initialValue, []);
};

const map = function(array, callback) {
  return reduce(
    array,
    function(previousValue, currentValue, index) {
      return [...previousValue, callback(currentValue, index, array)];
    },
    []
  );
};

const filter = function(array, callback) {
  return reduce(
    array,
    function(previousValue, currentValue, index) {
      if (callback(currentValue, index, array)) {
        return [...previousValue, currentValue];
      } else {
        return previousValue;
      }
    },
    []
  );
};

const avgEven = function(array) {
  const evenArray = filter(array, item => (item % 2 == 0 ? true : false));
  const sumEvenArray = reduce(
    evenArray,
    (previous, current) => previous + current
  );
  return sumEvenArray / evenArray.length;
};

const randSum = function() {
  return reduce(array, (previous, current) => previous + current);
};

const first = function(array, callback) {
  var index = 0;
  function find(currentValue) {
    if (currentValue === undefined) return undefined;
    if (!callback(currentValue, index, array)) {
      return find(array[++index]);
    } else return array[index];
  }
  return find(array[index]);
};

function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

// console.log(first([5], isPrime)); // 5

module.exports = {
  bind,
  curry,
  reduce,
  map,
  filter
};
