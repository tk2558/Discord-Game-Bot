const fs = require('fs');
const { join } = require('node:path');

const categories = new Map([
    ["anime", 0],
    ["math", 1],
    ["geo", 2],
    ["science", 3],
    ["random", 4],
]);


const point_system = new Map([
    ["100", 0],
    ["200", 6],
    ["300", 12],
    ["400", 18],
    ["500", 24],
]);


// Read the text file and split it into line for...
// Category 1: Anime
const fileOne = fs.readFileSync(join(__dirname + "\\Questions\\", "anime.txt"), 'utf8');
const one_lines = fileOne.split('\n').filter(line => line.trim() !== '');
const qa_one = [];

for (let i = 0; i < one_lines.length; i += 2) {
    const question = one_lines[i];
    const answer = one_lines[i + 1].trim();
    qa_one.push({ question, answer });
}

// Category 2: Math
const fileTwo = fs.readFileSync(join(__dirname + "\\Questions\\", "math.txt"), 'utf8');
const two_lines = fileTwo.split('\n').filter(line => line.trim() !== '');
const qa_two = [];

for (let i = 0; i < two_lines.length; i += 2) {
    const question = two_lines[i];
    const answer = two_lines[i + 1].trim();
    qa_two.push({ question, answer });
}

// Category 3: Geography
const fileThree = fs.readFileSync(join(__dirname + "\\Questions\\", "geo.txt"), 'utf8');
const three_lines = fileThree.split('\n').filter(line => line.trim() !== '');
const qa_three = [];

for (let i = 0; i < three_lines.length; i += 2) {
    const question = three_lines[i];
    const answer = three_lines[i + 1].trim();
    qa_three.push({ question, answer });
}

// Category 4: Science
const fileFour = fs.readFileSync(join(__dirname + "\\Questions\\", "science.txt"), 'utf8');
const four_lines = fileFour.split('\n').filter(line => line.trim() !== '');
const qa_four = [];

for (let i = 0; i < four_lines.length; i += 2) {
    const question = four_lines[i];
    const answer = four_lines[i + 1].trim();
    qa_four.push({ question, answer });
}

// Category 5: Random
const fileRand = fs.readFileSync(join(__dirname + "\\Questions\\", "random.txt"), 'utf8');
const rand_lines = fileRand.split('\n').filter(line => line.trim() !== '');
const qa_Rand = [];

for (let i = 0; i < rand_lines.length; i += 2) {
    const question = rand_lines[i];
    const answer = rand_lines[i + 1].trim();
    qa_Rand.push({ question, answer });
}

const allQuestions = [qa_one, qa_two, qa_three, qa_four, qa_Rand];

function getQuestion(category, point) {
    // Randomly select a question-answer pair
    cat = categories.get(category);
    // Math.floor(Math.random() * (max - min) + min);
    const idx = Math.floor(Math.random() * ((point_system.get(point) + 6) - point_system.get(point)) + point_system.get(point));
    const pair = allQuestions[cat][idx];

    // Return the selected question and answer
    return pair;
}

module.exports = {
    getQuestion,
    categories,
};