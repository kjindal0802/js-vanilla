self.addEventListener("message", (event) => {
  let limit = event?.data;
  while (true) {
    self.postMessage(++limit);
  }
});
