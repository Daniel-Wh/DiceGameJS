/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- if a player rolls two sixs in a row their global score and current score are reset
*/

// declare needed variables
var scores, roundscore, activePlayer, isGameOn, prevRoll, highScore;

initializeGame();
/**
 * Initializes game by resetting all of the dynamic variables in preparation for the game to start
 */
function initializeGame() {
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    scores = [0, 0]; // initializing scores, activePlayer, and roundscore to 0
    roundscore = 0;
    activePlayer = 0;
    prevRoll = 0;
    isGameOn = true; // state variable for buttons
    document.querySelector('.dice').style.display = 'none'; // uses query selector to set the initial state of the dice image to none so it doesn't display until roll dice buttn clicked
    if (!document.querySelector('.player-0-panel').classList.contains('active')) toggleActive(); // if player one doesn't contain the active class then set it active
    document.querySelector('.player-0-panel').classList.remove('winner'); // remove the winnner class
    document.querySelector('.player-1-panel').classList.remove('winner');  // remove the winner class 
    highScore = prompt("What is the score ya'll want to play to?"); // create prompt for score to beat

}
/**
 * Rolls dice and checks game conditions associated with dice rolls
 */
function rollDice() {
    if (isGameOn) {
        var dice = Math.floor(Math.random() * 6) + 1; // mimics dice rolling - will instantiate the dice variable with a value between 1-6
        var diceDOM = document.querySelector('.dice'); // instead of calling query selector multiple times, called once and object is stored as a variable
        diceDOM.src = 'dice-' + dice + '.png'; // adjust the src image to reflect the current dice roll
        diceDOM.style.display = 'block'; // make the src image appear in the browser
        if (dice === 1) { // if the player busts reset roundscore and dice value, also reset that players current score
            roundscore = 0; 
            dice = 0;
            document.querySelector('.dice').style.display = 'none'
            updateCurrentScoreUI(roundscore, activePlayer) // update current score, switch players and then toggle the activePlayer styling
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            toggleActive();
        }
        else if(dice === 6 && prevRoll === 6){ // check if the previous dice and current dice are six, then the player busts
            bust();
        }
        roundscore += dice;
        prevRoll = dice;
        updateCurrentScoreUI(roundscore, activePlayer);
    }

}
/**
 * If the player rolls two 6's in a row, then resets all appropriate values 
 */
function bust() {
    roundscore = 0;
    dice = 0;
    document.querySelector('.dice').style.display = 'none'
    updateCurrentScoreUI(roundscore, activePlayer) // update current score, switch players and then toggle the activePlayer styling
    updateScoreUI(0, activePlayer);
    scores[activePlayer] = 0; // reset players
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    toggleActive();
}
/**
 * hold button updates global score and checks for win condition
 */
function holdBTN() {
    if (isGameOn) {
        scores[activePlayer] += roundscore; //update the activePlayers score with the current roundScore
        updateScoreUI(scores[activePlayer], activePlayer); //update the ui to reflect the activePlayers new score
        if (scores[activePlayer] >= highScore) { // if the current player has won
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'; //change the player name text to winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //add the winner class to player panel
            document.querySelector('.dice').style.display = 'none' //remove the dice
            isGameOn = false; // set to false so hold/roll dice buttons stop working until a new game is initialized

        } else {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //switch active players, reset round score, toggle active class tag, remove dice
            roundscore = 0;
            toggleActive();
            document.querySelector('.dice').style.display = 'none'
        }
    }

}
/**
 * updates the global score element with the passed parameters
 * @param {number} score 
 * @param {number} player 
 */
function updateScoreUI(score, player) {
    document.getElementById('score-' + player).textContent = score;
}
/**
 * updates current score element with the passed parameters
 * @param {number} score 
 * @param {number} player 
 */
function updateCurrentScoreUI(score, player) {
    document.getElementById('current-' + player).textContent = score;
}

/**
 * toggles active player and resets previous roll
 */
function toggleActive() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    prevRoll = 0;
}

// document.querySelector('#current-' + activePlayer).textContent = roundscore; // one way to update the html to reflect the current dice score

// document.querySelector('#current-'+activePlayer).innerHTML = "<em>" + dice + "</em>"; // another way is injecting html at the selected element to update the dom with the current dice value
// worth remembering for scenarios where we need more than plain text dom manipulation

// querySelector can also read information from the dom that can be stored in variables
// var x = document.querySelector('#score-0').textContent;

// can also use querySelector to change CSS - the code below will make the dice invisible when first loading 
// document.querySelector('.dice').style.display = 'none';



//event listeners for buttons
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdBTN);
document.querySelector('.btn-new').addEventListener('click', initializeGame);

