const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

function Server(config, callback) {
  server.listen(config.port);
  if (typeof callback === 'function') {
    callback(app, io);
  }
}

module.exports = Server;
