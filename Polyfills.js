//Promise Polyfill
function myPromise(executorFn) {
  let fulfilled = false,
    rejected = false,
    handlers = [],
    rejectors = [],
    value = undefined,
    error = undefined;

  const resolve = (val) => {
    fulfilled = true;
    value = val;
    if (handlers.length > 0) {
      handlers.forEach((cbFn) => cbFn(val));
    }
  };

  const reject = (err) => {
    rejected = true;
    error = err;
    if (rejectors.length > 0) {
      rejectors.forEach((cbFn) => cbFn(err));
    }
  };

  this.then = function (cbFn) {
    if (fulfilled) {
      cbFn(value);
    } else {
      handlers.push(cbFn);
    }
    return this;
  };

  this.catch = function (cbFn) {
    if (rejected) {
      cbFn(error);
    } else {
      rejectors.push(cbFn);
    }
    return this;
  };

  try {
    executorFn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

let abc = new myPromise((res, rej) => {
  res(2);
});

abc.then((res) => res).then((res) => console.log(res * 2));
