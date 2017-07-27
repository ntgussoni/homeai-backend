class BaseModule {
  constructor(name, config) {
    this.config = config;
    this.name = name;
  }

  getConfig() {
    return this.config;
  }

  setSocket(io) {
    this.globalIo = io;
    this.channel = io.of(`/${this.name}`);
  }

  start() {
    this.channel.on('connection', (socket) => {
      console.log(`${this.name} --- Client connected`);
      socket.emit({ connected: true });
    });
    console.log(`-- ${this.name} Socket started`);
  }

}

module.exports = BaseModule;
