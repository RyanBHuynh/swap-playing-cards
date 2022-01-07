
/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables
let fullDeck = shuffleArray(create52CardDeck());
let cardArraySize = 14;
let cardArray = fullDeck.slice(0,cardArraySize); //Declared globally to make editing easier
let swapAnimationTime = 1500; //Time of swap animation in milliseconds
let cardSet = new Set(cardArray); //This set keeps track of all cards in the deck
let arraySizeElement = document.querySelector("#size_input");
let swapSpeedElement = document.querySelector("#speed_input");

//Event listeners

//Add an event listener to get the user-selected deck size
arraySizeElement.addEventListener('input', function() {
    cardArraySize = parseInt(arraySizeElement.value);
    cardArray = fullDeck.slice(0,cardArraySize);
    console.log(cardArray);
    displayCards(cardArray,cardArraySize);
    cardSet = new Set(cardArray);
});

//Add an event listener to get the user-selected animation speed
swapSpeedElement.addEventListener('input', function() {
    swapAnimationTime = 3500 - parseInt(swapSpeedElement.value);
    console.log(swapAnimationTime);
});


//Main function that gets called when the website loads
function main() {
    displayCards(cardArray,cardArraySize); //Add a specified number of cards to the screen
}

main();