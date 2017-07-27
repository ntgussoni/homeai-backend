const path = require('path');
const fs = require('fs');

function ModuleLoader() {

  const loadedModules = [];

  function loadModuleConfig(modulePath, callback) {
    const configPath = path.resolve(`${modulePath}/config.js`);
    try {
      fs.accessSync(configPath, fs.F_OK);
      const config = require(`${configPath}`);

      console.log('-- Config Loaded');
      callback(config);

    } catch (e) {
      if (e.code === 'ENOENT') {
        console.info('Config file not found');
      } else if (e instanceof ReferenceError || e instanceof SyntaxError) {
        console.error('Config file is invalid');
      } else {
        console.error(`Error found while loading config file: ${e}`);
      }
    }
  }

  function bootModule(modulePath, moduleName, callback) {
    const moduleMain = path.resolve(`${modulePath}/module.js`);
    loadModuleConfig(modulePath, (config) => {
      try {
        fs.accessSync(moduleMain, fs.F_OK);
        const Mod = require(`${moduleMain}`);

        console.log('-- Module Loaded');
        callback(new Mod(moduleName, config));

      } catch (e) {
        console.log(e);
        if (e.code === 'ENOENT') {
          console.info('Module file not found');
        } else if (e instanceof ReferenceError || e instanceof SyntaxError) {
          console.error('Module file is invalid');
        } else {
          console.error(`Error found while loading Module file: ${e}`);
        }
      }
    });
  }

  return {
    loadModules(Config, callback) {
      if (Config.modules.enabled) {
        const modulesPath = `${__dirname}/../modules`;

        Config.modules.enabled.forEach((m) => {
          console.log(' ');
          if (typeof loadedModules[m] === 'undefined') {
            console.log(`Found module ${m} in config`);

            const modulePath = path.resolve(`${modulesPath}/${m}`);

            bootModule(modulePath, m, (mod) => {
              loadedModules.push({ name: m, mod });
            });
          } else {
            console.error(`Duplicated module ${m}`);
          }
        });

        callback(loadedModules);
      } else {
        console.info('No modules found');
      }

    }
  };
}

module.exports = new ModuleLoader();
