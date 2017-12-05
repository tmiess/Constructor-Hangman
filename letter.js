function Letter(character) {
    this.exposed = false;
    this.character = character;

    this.exposeIfMatches = function(letter) {
        if (this.character === letter) {
            this.exposed = true;
        }
    };
}

module.exports = Letter;
