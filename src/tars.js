#!/usr/bin/env node

const Enhancement = require('./tars-enhancement.js');
const Memory = require('./tars-memory.js');
const IO = require('./tars-io.js');
const compromise = require('compromise');

// This file is where TARS is assembled with all of its enhancements
class TARS extends Enhancement {

  constructor() {
    super('root');
    // Basic Dependencies
    this.Memory = new Memory();
    this.IO = new IO();
  }

  boot() {
    return new Promise((resolve, reject) => {
      this.IO.emote('Booting up...');
      // Verify that the master's name has been set
      this.Memory.isInitialized().catch(() => {
        return this.Memory.imprintMaster();
      }).then((master) => {
        console.log(`Greetings ${master}!`);
        return this.parseCommands(master);
      }).catch((msg) => {
        console.log(msg);
        this.IO.emote(`Error! ${msg}`, 'somber');
      })
    });
  }

  parseCommands() {
    return new Promise((resolve, reject) => {
      program
        .version('0.0.1')
        .command('note <note>','Tell TARS to record a note for you.')
        .command('report','Tell TARS to give you a report of your notes.')
        .command('learn <command> <request>','Tell TARS to remember a Command to do when you make a Request.')
        .parse(process.argv);
    });
  }

  addCoreEnhancements() {
    return new Promise((resolve, reject) => {

    });
  }

  loadEnhancements() {
    return new Promise((resolve, reject) => {

    });
  }

  enhance(...enhancements) {
    return new Promise((resolve, reject) => {

    });
  }

  get moduleList() {
    return Object.keys(this.dependencies);
  }

  get moduleName() {
    return this.module_name;
  }

}

// Instantiation
const Tars = new TARS();
Tars.boot();
