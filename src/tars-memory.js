const FileAsync = require('lowdb/adapters/FileAsync');
const Enhancement = require('./tars-enhancement.js');
const IO = require('./tars-io.js');

module.exports = class Memory extends Enhancement {

  constructor() {
    super('memory');

    // Instantiate dependencies
    this.homedir = require('homedir');
    this.Jetpack = require('fs-jetpack');
    this.Inquirer = require('inquirer');
    this.IO = new IO();

    // Instantiate TARS memory database
    this.Jetpack.dir(`${this.homedir()}/.tars`);
    this.Low = require('lowdb');
  }

  hydrate() {
    return new Promise((resolve, reject) => {
      const adapter = new FileAsync(`${this.homedir()}/.tars/tars.json`);
      this.db = this.Low(adapter);
    });
  }

  imprintMaster() {
    return new Promise((resolve, reject) => {
      this.Inquirer.prompt([
        {
          name: 'name',
          message: "What is my master's name?",
          validate: (name) => {
            if (name != '') {
              return true;
            }
          }
        }
      ]).then((answers) => {
        this.IO.emote(`Nice to meet you ${answers.name}.`);
        this.IO.emote(`I am here to assist you with anything you need according to my programming.`);
        console.log("this.db!!!",this.db);
        this.db.set('master',answers.name).then(() => {
          return this.db.write();
        }).then(() => {
          resolve();
        });

      });
    });
  }

  isInitialized() {
    return new Promise((resolve, reject) => {
      // Set the default. This won't be written if the value already exists.
      this.db.defaults({master: null}).write();
      this.db.get('master') === null ?
        reject() :
        resolve();
    });
  }

  create() {}

  read() {}

  memorize() {
    return new Promise((resolve, reject) => {

    })
  }

  delete() {}

}
