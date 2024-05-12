// / This is a JavaScript coding problem from BFE.dev
class BetterChannel {
  messageLists = new Map();

  constructor() {
    const { port1, port2 } = new SomeChannel();
    this.port1 = this.createPostMessage(port1, port2);
    this.port2 = this.createPostMessage(port2, port1);
  }

  createPostMessage(basePort, port2) {
    basePort.postMessage = (message, callback) => {
      const uuid = Date.now() + "-" + Math.random();
      this.messageLists.set(uuid, callback);

      const reply = (data) => {
        if (this.messageLists.has(uuid)) {
          this.messageLists.get(uuid)(data);
          this.messageLists.delete(uuid);
        }
      };
      port2?.onmessage?.(message, reply);
    };

    return basePort;
  }
}
