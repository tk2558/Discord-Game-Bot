# Discord-Game-Bot

This is a discord bot with different games users may play inside a discord server written in Node JavaScript

# 1) Slots
-> A basic slot machine users may play using the command !slots

-> A gif will be sent when someone wins the slot machine
   
# 2) Wordle
-> Bot will choose a random word from a list of 5000 different 5 letter words

-> Users will use the command !guess to guess the word

-> Users can use the command !giveup to restart the game

   
# 3) Jeopardy
-> Bot will initiate a Jeopardy game with 5 different categories: Anime, Math, Geography, Science & Random

-> User who started game will get first pick of category and point worth using the command !pick (category) (point)

-> Bot will provide a question and start a timer waiting for an answer

-> Player who answers correctly using command !whatis (answer), will recieve the points and be able to pick the next category and points

   -> If no one answers before timer runs out, player who last picked the category picks again
   
   -> There is a 100 penalty for incorrect answers
   
-> Bot will keep track players points and showcase leaderboard at the end or when player use the command !score
