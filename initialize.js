const _ = require('lodash');
const low = require('lowdb');
const chalk = require('chalk');
const inquirer = require('inquirer');
const t_mem = require('./tars-memory.js');

const db = low('tars.json');

// Function to initialize TARS
module.exports = class Initialize {

  constructor() {}

  now() {
    return new Promise((resolve, reject) =< {
      console.log(chalk.green('Booting up...'));
      inquirer.prompt([
        {
          name: 'name',
          message: "What is my master's name?",
          validate: function(name) {
            if (name != '') {
              return true;
            }
          }
        }
      ]).then(function(answers) {
        console.log(chalk.cyan('Nice to meet you '+answers.name+'.'));
        console.log(chalk.cyan('I am here to assist you with anything you need according to my programming.'));
        db.set('master',answers.name).write();
      });
    });
  }

};
