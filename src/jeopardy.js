// Jeapordy Game

const { getQuestion, categories } = require("./questions");
const players = new Map(); // player, points

new_board = "```\
| Anime ||  Math  ||   Geo   || Science || Random |\n\
---------------------------------------------------\n\
|  100  ||   100  ||   100   ||   100   ||   100  |\n\
|  200  ||   200  ||   200   ||   200   ||   200  |\n\
|  300  ||   300  ||   300   ||   300   ||   300  |\n\
|  400  ||   400  ||   400   ||   400   ||   400  |\n\
|  500  ||   500  ||   500   ||   500   ||   500  |\n\
```";

header = "| Anime |\|  Math  |\|   Geo   |\| Science |\| Random |\n\
---------------------------------------------------\n"

board = ["|  100  |", "|   100  |", "|   100   |", "|   100   |", "|   100  |",
    "|  200  |", "|   200  |", "|   200   |", "|   200   |", "|   200  |",
    "|  300  |", "|   300  |", "|   300   |", "|   300   |", "|   300  |",
    "|  400  |", "|   400  |", "|   400   |", "|   400   |", "|   400  |",
    "|  500  |", "|   500  |", "|   500   |", "|   500   |", "|   500  |"];

finished_board = ["|  ---  |", "|   ---  |", "|   ---   |", "|   ---   |", "|   ---  |"];

const all_points = ["100", "200", "300", "400", "500"];
valid_spaces = Array(24).fill({ value: 1 });

var cur_pick;   // current player picking category
start = false;  // start game
solving = false; // solving question currently
start_timer = false; // authorize timer

let counter = 0; // counter for game over check (when count == 25)

que = ""; // current question
ans = ""; // current question's answer
question_point = 0; // current question's points worth

// Commands = !jeapordy, !pick, !scores

function get_square(category, point) {
    return (categories.get(category) + (((parseInt(point) / 100) - 1)) * 5);
}

function set_solving() {
    solving = false;
}
function reset_board() {
    valid_spaces = Array(24).fill({ value: 1 });
    start = false;
    board = ["|  100  |", "|   100  |", "|   100   |", "|   100   |", "|   100  |",
        "|  200  |", "|   200  |", "|   200   |", "|   200   |", "|   200  |",
        "|  300  |", "|   300  |", "|   300   |", "|   300   |", "|   300  |",
        "|  400  |", "|   400  |", "|   400   |", "|   400   |", "|   400  |",
        "|  500  |", "|   500  |", "|   500   |", "|   500   |", "|   500  |"];
}

function reset_timer() {
    start_timer = false;
}

function check_picker(picker) {
    if (start == false || start_timer == false || picker != cur_pick) {
        return false;
    }
    return (picker === cur_pick);
}

function check_winner() {
    return (counter === 25);
}

function start_jg(player) {
    if (start == false) {
        msg = 'A jeapordy game is now in session, ' + player + " begin by using !pick to pick a category and points (ex: !pick random 300)\nAnyone who wants to answer use !whatis (ex: !whatis answer)\n" + new_board;
        cur_pick = player;
        start = true;
    }
    else {
        msg = 'A jeapordy game is already in session';
    }
    return msg;
}

function print_board() {
    if (start) {
        let display = "";
        divide = 0;

        for (let i = 0; i < board.length; i++) {
            display += board[i]; // Concatenate each string to the msg
            divide++;
            if (divide == 5) {
                display += "\n";
                divide *= 0;
            }
        }

        curr_board = "```" + header + display + "```";
        return curr_board;
    }
    else {
        msg = 'A jeapordy game needs to be started first';
        return msg;
    }
}

function getscore() {
    const scoreboardArray = Array.from(players, ([username, score]) => ({ username, score }));
    scoreboardArray.sort((a, b) => b.score - a.score);

    let scoreboard = "Scoreboard:\n";

    scoreboardArray.forEach((entry, index) => {
        scoreboard+= `${index + 1}. ${entry.username}: ${entry.score}\n`;
    });

    return scoreboard;
}

function pick(picker, category, point) {
    // Check Game Start
    if (start == false) {
        start_msg = "A jeapordy game needs to be started first";
        return start_msg;
    }

    // Check if we are already solving a question
    if (solving == true) {
        error_msg = "Solve the current question first";
        return error_msg;
    }

    // Check valid person picking
    if (picker != cur_pick) {
        error_msg = "Not your turn to pick the category";
        return error_msg;
    }

    // Check if valid space, category, and points chose
    sq = get_square(category, point);
    if ((!categories.has(category)) || (!all_points.includes(point)) || (valid_spaces[sq] == 0)) {
        error_msg = "Invalid Pick";
        return error_msg;
    }

    // Accessing board space
    board[sq] = finished_board[categories.get(category)];
    valid_spaces[sq] = 0;
    solving = true;
    start_timer = true;
    counter++;

    // get question, answer and points
    QA = getQuestion(category, point);

    // console.log(QA);

    que = QA.question;
    ans = QA.answer;
    question_point = parseInt(point);

    // console.log(ans);

    return que;
}

function answer(player_name, whatis) {
    // Check Game Start, if we are solving a problem, answer is correct
    if (!start || solving == false) {
        return false;
    }

    // Add player to player map and set their score to 0 if this is their first time answering
    if (!players.has(player_name)) {
        players.set(player_name, 0);
    }

    //console.log(whatis);

    // if answer is correct, stop timer, make person who solved the current picker and give them their points
    if (whatis === ans) {
        cur_pick = player_name;
        players.set(player_name, players.get(player_name) + question_point);
        question_point = 0;
        set_solving();

        return true;
    }
    else {
        players.set(player_name, players.get(player_name) - 100); // 100 point penalty for incorrect answer
    }
    return false;
}

module.exports = {
    start_jg,
    print_board,
    getscore,
    pick,
    categories,
    answer,
    set_solving,
    check_winner,
    check_picker,
    reset_board,
    reset_timer,
};