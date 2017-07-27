const Config = require('./config.js');
const Server = require('./core/server.js');
const ModuleLoader = require('./core/module-loader.js');

function App() {

  Server(Config, (app, io) => {
    console.log(`Server started on: ${Config.port}`);

    ModuleLoader.loadModules(Config, (loadedModules) => {
      console.log(' ');
      console.log('--- STARTING MODULES --');

      loadedModules.forEach(({ mod }) => {
        mod.setSocket(io);
        mod.start();
      })
    });
  });

}

module.exports = new App();
