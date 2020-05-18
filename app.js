/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// declare needed variables
var scores, roundscore, activePlayer;

scores = [0, 0]; // initialize array with player 1 and 2's scores
roundscore = 0;
activePlayer = 0; // using 0 base to match array-access

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.dice').style.display = 'none'; // uses query selector to set the initial state of the dice image to none so it doesn't display until roll dice buttn clicked

function rollDice(){
    var dice = Math.floor(Math.random() * 6) + 1; // mimics dice rolling - will instantiate the dice variable with a value between 1-6
    var diceDOM = document.querySelector('.dice'); // instead of calling query selector multiple times, called once and object is stored as a variable
    diceDOM.src = 'dice-' + dice + '.png'; // adjust the src image to reflect the current dice roll
    diceDOM.style.display = 'block'; // make the src image appear in the browser
    if(dice ===1){ // if the player busts reset roundscore and dice value, also reset that players current score
        roundscore = 0;
        dice = 0
        scores[activePlayer] = 0;

    }
    roundscore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundscore;
    
}


document.querySelector('#current-' + activePlayer).textContent = roundscore; // one way to update the html to reflect the current dice score

// document.querySelector('#current-'+activePlayer).innerHTML = "<em>" + dice + "</em>"; // another way is injecting html at the selected element to update the dom with the current dice value
// worth remembering for scenarios where we need more than plain text dom manipulation

// querySelector can also read information from the dom that can be stored in variables
var x = document.querySelector('#score-0').textContent;

// can also use querySelector to change CSS - the code below will make the dice invisible when first loading 
// document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', rollDice);