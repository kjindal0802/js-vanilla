// Promise Retry:
// Write a function retryPromise that takes a function returning a promise,
// maximum number of retries, and retry interval (in milliseconds) as arguments.
// The function should execute the input function repeatedly until it resolves
// successfully or the maximum number of retries is reached. If the function doesn't
// resolve successfully within the maximum number of retries, the returned promise
// should reject with the last error encountered.

function retryPromise(cbFn, maxRetry, retryInterval) {
  let counter = 1;
  let error = null;
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      console.log("Executing function", counter);
      if (counter > maxRetry) {
        console.log("Max Retries reached", counter);
        clearInterval(interval);
        reject(error);
      }
      cbFn()
        .then((res) => {
          clearInterval(interval);
          resolve(res);
        })
        .catch((err) => {
          counter++;
          error = err;
        });
    }, retryInterval);
  });
}

const cbFn = () => {
  return new Promise((res, rej) => {
    rej("100");
  });
};

retryPromise(cbFn, 3, 2000).catch((err) => console.log(err));

// Implement a function promiseWaterfall that takes an
//  array of functions returning promises as arguments.
//   The functions represent tasks that depend on the
//   result of the previous task. The function should
//   execute the tasks sequentially, passing the result
//   of each task to the next task,
//   similar to Array.prototype.reduce(). The function should
//   return a promise that resolves with the final result of the last task.

function promiseWaterfall(functions) {
  let index = 0;
  return new Promise((resolve, reject) => {
    function execute(cbFn, args) {
      cbFn(args).then((res) => {
        index++;
        if (index === functions.length) {
          resolve(res);
        }
        execute(functions[index], res);
      });
    }
    execute(functions[index], null);
  });
}

//Write a function concurrentPromises that takes an array of functions returning promises and
// a concurrency limit as arguments. The function should execute the promises concurrently,
// limiting the number of concurrent executions to the specified limit. The function should
// return a promise that resolves with an array of results in the same order as the input array.

function concurrentPromises(promises, maxLimit) {
  let limit = 0;
  let resArr = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    function execute() {
      if (index < promises.length) {
        if (limit < maxLimit) {
          limit++;
          promises[index]()
            .then((res) => {
              resArr[index] = res;
            })
            .catch((err) => {
              resArr[index] = err;
            })
            .finally(() => {
              limit--;
              index++;
              if (index === promises.length) {
                resolve(resArr);
              }
              execute();
            });
        }
      }
    }
    execute();
  });
}
