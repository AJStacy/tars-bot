function Util() {
}

////////////////////////////////////////////////////
// TARS Utility functions for Promise catching.
////////////////////////////////////////////////////

/**
 * `caughtExit()` logs a message and then exits TARS internal program.
 */
Util.prototype.exit = function(msg, ...args) {
  this.emote('grimacing',msg, args); process.exit(1);
};

/**
 * `negate()` logs a message and then returns false.
 */
Util.prototype.negate = function(msg, ...args) {
  this.emote('thinking',msg, args); return false;
};

module.exports = Util;
