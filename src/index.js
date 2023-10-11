const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// Imports from other JS files
const { gamble, check_jackpot } = require('./slots.js');
const { start_game, giveup, guessing } = require('./wordle.js');
const { start_jg, print_board, getscore, pick, set_solving, check_winner, answer, check_picker, reset_board, reset_timer } = require('./jeopardy.js');

let timer;
lock_timer = false;

client.once('ready', () => { // initialization process
    console.log("Bot is Ready");
    client.user.setActivity("Game Bot")
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;  // Ignore messages from bots
    if (message.content === "!slots") {
        message.reply({
            content: gamble(),
        })
        if (check_jackpot()) {
            message.channel.send('https://tenor.com/view/berd-jackpot-gif-19090057');
        }
    }

    else if (message.content === "!wordle") {
        message.reply({
            content: start_game(),
        })
    }

    else if (message.content === "!giveup") {
        message.reply({
            content: giveup(),
        })
    }

    else if (message.content.startsWith('!guess')) {
        const guess = message.content.toLowerCase().split(' ').slice(1).join(' ');
        message.reply({
            content: guessing(guess, message.author.id),
        })
    }

    else if (message.content === "!jeopardy") {
        message.reply({
            content: start_jg(message.author.username),
        })
    }
    else if (message.content === "!score") {
        message.reply({
            content: getscore(),
        })
    }

    else if (message.content.startsWith('!pick')) {
        const picking = message.content.toLowerCase().split(' ');

        message.reply({
            content: pick(message.author.username, picking[1], picking[2]),
        })

        if (check_picker(message.author.username) && lock_timer == false) {
            lock_timer = true;
            timer = setTimeout(() => {
                message.channel.send("Time's up! Pick something else");
                message.channel.send(print_board());
                set_solving();
                reset_timer();
                lock_timer = false;

                if (check_winner()) {
                    message.channel.send("Game Over!\n" + getscore());
                    message.channel.send('https://tenor.com/view/congrats-molang-piu-piu-congratulations-well-done-gif-27060080');
                    reset_board();
                }
            }, 50000);
        }
    }

    else if (message.content.startsWith('!whatis')) {
        const guess = message.content.toLowerCase().split(' ').slice(1).join(' ');
        if (answer(message.author.username, guess)) {
            clearTimeout(timer);
            lock_timer = false;
            reset_timer();
            message.reply({
                content: 'Correct! Your board...',
            })

            if (check_winner()) {
                message.channel.send("Game Over!\n" + getscore());
                message.channel.send('https://tenor.com/view/congrats-molang-piu-piu-congratulations-well-done-gif-27060080');
                reset_board();
            }
            else {
                message.channel.send(print_board());
            }
        }
    }
    else if (message.content === "!die") {
        client.destroy();
    }
})

client.login("MTEyNzgwMDAzNzI4MDMyOTc3MA.GNEfgZ.HIaR1KQVL1rkNSKcUyNxORqoseMkLsWXGWHj1g");
// Current Bot Token ID = MTEyNzgwMDAzNzI4MDMyOTc3MA.GNEfgZ.HIaR1KQVL1rkNSKcUyNxORqoseMkLsWXGWHj1g