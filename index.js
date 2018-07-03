#!/usr/bin/env node

const program = require('commander');
const low = require('lowdb');
const init = require('./initialize.js');
const t_core = require('./tars-core.js');

// Instantiate the database
const db = low('./data/tars.json');
db.defaults({master: ''}).write();
// Verify that the master's name has been set
var master = ( db.get('master').value() == '' ? false : true );
console.log("master is: ",db.get('master').value());

// If the name of TARS master is not set, run the init sequence
if (!master) {
  init();
}

// If TARS knows the name of his master, setup command line params
if (master) {
  program
    .version('0.0.1')
    .command('note <note>','Tell TARS to record a note for you.')
    .command('report','Tell TARS to give you a report of your notes.')
    .command('learn <command> <request>','Tell TARS to remember a Command to do when you make a Request.')
    .parse(process.argv);
}
