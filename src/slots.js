// Slot Machine
// var symbols = [":gem:", ":seven:", ":bell:", ":heart:", ":lemon:", ":watermelon:", ":cherries:"];

var symbols = [":gem:", ":seven:", ":bell:", ":heart:", ":lemon:", ":watermelon:", ":cherries:"];
jackpot = false;

function gamble() {
    slotA = symbols[Math.floor(Math.random() * symbols.length)];
    slotB = symbols[Math.floor(Math.random() * symbols.length)];
    slotC = symbols[Math.floor(Math.random() * symbols.length)];

    result = slotA + "   " + slotB + "   " + slotC;
    if (slotA == slotB && slotA == slotC) {
        jackpot = true;
    }
    return result;
}

function check_jackpot() {
    if (jackpot) {
        jackpot = false;
        return true;
    }
    return false;
}

module.exports = {
    gamble,
    check_jackpot,
};