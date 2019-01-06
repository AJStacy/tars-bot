const moment = require('moment');
const { Map, List } = require('immutable');

const config = require('./tars.json');
const t_util = require('./tars-utilities.js');

const time_format = config.timeFormat;

module.exports = {
  /**
   * `validateRange()` accepts a time range string and validates
   * it against Moment.js with the user configured time format.
   *
   * @param time_str  String representing the time stamp the user specified.
   * @return boolean  Boolean resolution if the `time_str` is valid.
   */
  validateRange: function(time_str) {
    return new Promise((resolve, reject) => {

      // Split the range of time into parts
      var valid_parts = this.splitRange(time_str)
        .then((parts) => {
          return new Promise((resolve, reject) => {

            // Loop through each part and map to
            var parts_are_valid = this.validateTime(parts[0])
              .then(() => {console.log("asdf1"); return this.validateTime(parts[1]);})
              .then(() => {console.log("asdf2"); return this.validateTimeOrder(parts);})
                .catch((msg) => {console.log("asdf3",t_util); return t_util.negate(msg);});

            // After the validated parts Promise is complete
            Promise.all(parts_are_valid).then(function(values) {
              ( values ? resolve(values) : reject("I failed to get validated parts.") );
            });
          });
        })
        .catch((msg) => console.log(msg));

      // After we have gathered validation for all time parts, check if they
      // are all valid and resolve the boolean result
      Promise.all([valid_parts]).then(function(values) {
        var resolved_parts = List(values[0]);
        ( values.indexOf(false) === -1 ? resolve(valid_parts) : reject("Not all values in the time range are valid.") );
      });

    });
  },

  /**
   * `splitRange()` accepts a time string and attempts to split it
   * at a dash delimeter. If it fails it returns a boolean of false.
   *
   * @param time_str  String representing the time stamp the user specified.
   * @return mixed    Returns a List of time parts if the `time_str` was a
   *                  range. Otherwise return false.
   */
  splitRange: function(time_str) {
    return new Promise((resolve, reject) => {
      var parts = List(time_str.split('-'));
      ( parts.size === 2 ? resolve(parts) : reject("I wasn't able to split the time string into parts.") );
    });
  },

  /**
   * `validateTime()` accepts a time string and validates
   * it against Moment.js with the user configured time format.
   *
   * @param time_str  String representing the time stamp the user specified.
   * @return boolean  Boolean resolution if the `time_str` is valid.
   */
  validateTime: function(time_str) {
    return new Promise((resolve, reject) => {
      var time = moment(time_str, time_format, true);
      ( time.isValid() ? resolve(true) : reject("The time you gave me is not valid according to my configuration.") );
    });
  },

  /**
   * `validateTimeOrder()` accepts `List` of time parts and validates
   * their order against Moment.js `isBefore()` method.
   *
   * @param time_parts  `List` containing a time parts range.
   * @return boolean    Boolean resolution if the time parts are in order.
   */
  validateTimeOrder: function(time_parts) {
    return new Promise((resolve, reject) => {
      ( moment(time_parts[0]).isBefore(time_parts[1]) ? resolve(true) : reject("The order of the time range you provided is incorrect.") )
    });
  },

};
