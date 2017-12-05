// Incorporate module
var Letter = require("./letter.js");

function Word(value) {
  this.letters = [];

  for (var l = 0; l < value.length; l++) {
    this.letters.push(new Letter(value[l]));
  }

  this.exposeLetter = function(letter) {
    for (var i = 0; i < this.letters.length; i++) {
      this.letters[i].exposeIfMatches(letter);
    }
  };

  this.isExposed = function() {
    for (var i = 0; i < this.letters.length; i++) {
      if (!this.letters[i].exposed) {
        return false;
      }
    }
    return true;
  };
}

module.exports = Word;
