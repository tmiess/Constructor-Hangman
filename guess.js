// Incorporate inquirer
var inquirer = require('inquirer');

// Incorporate module
var Word = require("./word.js");

var wordChoices = [
    "tesla",
    "microsoft",
    "samsung",
    "google",
    "apple",
    "amazon",
    "facebook",
    "twitter"
];
var currentWord;
var numGuesses;

function guessLetter() {
    if (numGuesses > 0) {
        inquirer.prompt([{
                "message": "Guess a letter:",
                "name": "letter"
            }])
            .then(function(userInput) {
                currentWord.exposeLetter(userInput.letter);
                if (currentWord.isExposed()) {
                    // user won
                    inquirer.prompt([{
                            type: "message",
                            name: "congrats",
                            message: "You win!"
                        },
                        // confirm next game
                        {
                            type: "confirm",
                            name: "newWord",
                            message: "Guess next word?",
                            default: true,
                        }
                    ]);
                }
                else {
                    numGuesses--;
                    guessLetter();
                }
            });
    }
    else {
        // ask user if they want to play again
        inquirer.prompt([{
            type: "confirm",
            name: "newRound",
            message: "Play again?",
            default: true
            // if yes, new game
        }]).then(function(answers) {
            if (answers.newRound) {
                newGame();
            }
            else {
                inquirer.prompt([{
                    type: "message",
                    name: "End Game",
                    message: "Thanks for playing!"
                }]);
            }
        });
    }
}

function newGame() {
    numGuesses = 10;
    currentWord = new Word(wordChoices[0]);
    guessLetter();
}

newGame();
