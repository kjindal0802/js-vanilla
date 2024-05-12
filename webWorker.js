if (window.Worker) {
  const worker = new Worker("./worker.js");
  worker.postMessage(1);
  worker.onmessage = function (e) {
    document.getElementById("number").innerHTML = e.data;
  };
} else {
  console.warn("Web worker not supported");
}
