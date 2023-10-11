// Wordle Game
const fs = require('fs');
const { join } = require('node:path');

const all_words = fs.readFileSync(join(__dirname, "words.txt"), 'utf8').split('\n');
const word_bank = all_words.map(word => word.trim()).filter(Boolean);

game_start = false;
word = " ";
msg = " ";
 

function start_game() {
    if (!game_start) {
        word = word_bank[Math.floor(Math.random() * word_bank.length)];
        game_start = true;
        msg = 'Game Started, use !guess command to guess the word. If you give up use, !giveup';
    }
    else {
        msg = 'A game is already in session, use !guess to try to guess the word';
    }
    return msg;
}

function giveup() {
    if (!game_start) {
       msg = 'Start a game before you give up';
    }
    else {
        game_start = false
        msg = 'The word was: ' + word;
    }
    return msg;
}

function guessing(guess, user) {
    if (!game_start) {
        msg = 'Start a Game with !wordle first';
        return msg;
    }

    let correct = true;
    let result = "";

    if (guess.length != 5) {
        msg = 'Invalid Guess';
        return msg;
    }

    else {
        for (let i = 0; i < word.length; i++) {
            if (guess[i] === word[i]) {
                result += ":green_square: ";
            }
            else {
                correct = false;
                if (word.includes(guess[i], 0)) {
                    result += ":yellow_square: ";
                }
                else { result += ":red_square: "; }
            }
        }
    }
    if (correct) {
        game_start = false;
        msg = 'Winner: ' + "<@" + user + ">!";
        return msg;
    }

    else {
        return result;
    }
}

module.exports = {
    start_game,
    giveup,
    guessing,
};