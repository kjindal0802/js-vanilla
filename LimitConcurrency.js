function limitConcurrency(cbFn, limit) {
  let counter = 0;
  let queue = [];

  function execute({ args, resolve, reject }) {
    cbFn(...args)
      .then((result) => resolve(result)) // Pass the result to the resolve function
      .catch((error) => reject(error)) // Pass the error to the reject function
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
      resolve(`Result: ${args}`);
    }, 2000);
  });
}

// Limited concurrency function
const getPostsLimited = limitConcurrency(getPosts, 3);

// Test calls, with error handling for each
getPostsLimited(1).then((res) => console.log(res)).catch(console.error);
getPostsLimited(2).then((res) => console.log(res)).catch(console.error);
getPostsLimited(3).then((res) => console.log(res)).catch(console.error);
getPostsLimited(4).then((res) => console.log(res)).catch(console.error);
getPostsLimited(5).then((res) => console.log(res)).catch(console.error);
getPostsLimited(6).then((res) => console.log(res)).catch(console.error);
getPostsLimited(7).then((res) => console.log(res)).catch(console.error);
