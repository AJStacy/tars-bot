const Enhancement = require('./tars-enhancement.js');

module.exports = class IO extends Enhancement {

  constructor() {
    super('io');
    // Dependencies
    this.Chalk = require('chalk');
    this.Emoji = require('node-emoji');
    this.Inquire = require('inquirer');
    this.CLI = require('commander');
    this.parseTemplate = require('string-template');
    // Configuration
    this.emotions = {
      unemotional: {emojis: ['neutral_face'], color: 'white'},
      happy: {emojis: ['smile'], color: 'green'},
      sad: {emojis: ['cry'], color: 'blue'},
      somber: {emojis: ['pensive','cloud_rain'], color: 'blue'},
      celebrating: {emojis: ['smile','tada'], color: '_colorRainbow'},
      grimacing: {emojis: ['grimacing'], color: 'red'},
      thinking: {emojis: ['thinking_face'], color: 'cyan'}
    };
  }

  /**
   * Rainbowify your text!
   * @param  {String} msg The message you would like rainbowified!
   * @return {String}     The rainbowified text!
   */
  _colorRainbow(msg) {
    var rainbow = ['yellow','red','green','cyan','blue','magenta'];
    var styled_msg = "";
    for (var i = 0; i < msg.length; i++) {
      var color = rainbow[(i % 6)];
      styled_msg += chalk[color](msg.charAt(i));
    }
    return styled_msg;
  }

  ///////////////////////////////////////////
  // Utility functions
  ///////////////////////////////////////////

  // TODO: Finishing cleaning up of TARS Emote
  emote(message, feeling = 'unemotional') {
    var words = message;
    if (this.emotions[feeling].color.charAt(0) === '_') {
      words = ` ${this[this.emotions[feeling].color](message)}`;
    } else if (this.emotions[feeling].color !== 'default') {
      words = ` ${this.Chalk[this.emotions[feeling].color](message)}`;
    }

    for (var i = this.emotions[feeling].emojis.length-1; i >= 0; i--) {
      words = ':' + this.emotions[feeling].emojis[i] + ': ' + words;
    }

    console.log(this.Emoji.emojify(words));
  }

}
