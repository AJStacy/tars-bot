#!/usr/bin/env node
'use strict';

const program = require('commander');

const CORE = require('./tars-core.js');
const t_time = require('./tars-time-analysis.js');
const { Map, List } = require('immutable');

// Initialize an empty object to store the note
var note = Map();

// Setup TARS for the module
var tars = new CORE("note");

/**********************************************
* MAIN LOGIC BLOCK
**********************************************/

// !!!!!!!!!! Save the note object with the timestamp to the DB !!!!!!!!!!!!

// t_mem.prototype.start = function() {
//   var mem = new t_mem("test");
//
//   mem.create.table();
// };




tars.emote(
  "celebrating",
  "My note has args bruh {{arg1}} and {{arg2}}.",
  {'arg1': 'matt'},
  {'arg2':'hi!'}
);

tars.extend(t_time.prototype);

function Note() {}

Note.prototype = {
  /**
   * `time()` accepts an optional time range String and processes it along
   * with the note then saves it to the DB. If the time range String is not
   * provided, it will stamp the current time.
   *
   * @param time_val  String representing the time stamp the user specified.
   * @return void
   */
  time: function(time_str) {

    // Get the time object to be stored in the database
    this.validateTime(time_str)
      .then(function() {
        return Map({
          "start": time_str
        });
      })
      .catch(function(msg) {
        return this.validateRange(time_str)
          .then(function() {
            var time_parts = this.splitRange(time_str)
              .catch(t_core.exit(msg));
            return Map({
              "start": time_parts[0],
              "end": time_parts[1]
            })
          })
          .catch((msg) => console.log(msg));
      });

    Promise.all([time]).then(function(values) {
      console.log("the time object", values[0]);
      return values[0];
    });

  },

  date: function() {

  },

  reminderTime: function() {

  },

  reminderDate: function() {

  },

  important: function() {

  }
};

tars.extend(Note);

tars.get
  .option('-t, --time <range>','The time the note occurred.',tars.time)
  .option('-d, --date <range>','The data the note occurred.',tars.date)
  .option('-rt, --reminder-time <time>','The time at which TARS should remind you of this note.',tars.reminderTime)
  .option('-rd, --reminder-date <date>','The date at which TARS should remind you of this note.',tars.reminderDate)
  .option('-i, --important','Flag the note as an important note.',tars.important)
  .parse(process.argv);
