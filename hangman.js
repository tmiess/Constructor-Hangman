// New game
// * Set number of guesses remaining to 10
// * Randomly pick a word from array of choices
// * Ask user to pick first letter

// Confirm New Game
// * Ask if they want to play again
// * If yes,
//   * New game
// * Else
//   * Exit

// Guess Letter
// * If guesses > 0
//   * Ask the user to guess a letter
//   * Expose letter in currentWord, if used
//   * If word is completely exposed:
//     * Tell user they win!
//     * Confirm new game
//   * Else
//     * Decrement guesses by 1
//     * Guess Letter
// * Else
//   * Confirm new game

////////////////
var Letter = require("./Letter");

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
  }
}

////////////////////
function Letter(character) {
    this.exposed = false;
    this.character = character;

    this.exposeIfMatches = function(letter) {
        if (this.character === letter) {
            this.exposed = true;
        }
    }
}

module.exports = Letter;

//////////////////////
var Word = require("./Word");

var wordChoices = [
    "apple",
    "banana"
];
var currentWord;
var numGuesses;

function guessLetter() {
    if (numGuesses > 0) {
        inquirer.prompt([
            {
                "message": "Guess a letter:",
                "name": "letter"
            }
        ])
        .then(function(userInput) {
            currentWord.exposeLetter(userInput.letter);
            if (currentWord.isExposed()) {
                // user won
                // confirm next game
            } else {
                numGuesses--;
                guessLetter();
            }
        })
    } else {
        // ask user if they want to play again
        // if yes, new game
    }
}

function newGame() {
    numGuesses = 10;
    currentWord = new Word(wordChoices[0]);
    guessLetter();
}

newGame();