function limitConcurrency(cbFn, limit) {
  let counter = 0;
  let queue = [];

  function execute({ args, resolve, reject }) {
    cbFn(...args)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        counter--;
        if (queue.length > 0) {
          let task = queue.shift();
          execute(task);
        }
      });
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      const task = { args, resolve, reject };
      if (counter < limit) {
        counter++;
        execute(task);
      } else {
        queue.push(task);
      }
    });
  };
}

// Example function to simulate asynchronous processing
function getPosts(...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processed: ${args}`);
      // This will always reject, which could lead to an error
      // For demonstration purposes, let's resolve instead
      reject(`Result: ${args}`);
    }, 2000); // Simulating async work
  });
}

// Limited concurrency function
const getPostsLimited = limitConcurrency(getPosts, 3);

// Test calls, with error handling for each
getPostsLimited(1).catch(console.error);
getPostsLimited(2).catch(console.error);
getPostsLimited(3).catch(console.error);
getPostsLimited(4).catch(console.error);
getPostsLimited(5).catch(console.error);
getPostsLimited(6).catch(console.error);
getPostsLimited(7).catch(console.error);
