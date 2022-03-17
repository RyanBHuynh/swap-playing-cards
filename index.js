/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables for event listeners
let cardArraySize = document.querySelector("#size_input").value;
let swapAnimationTime = 2000 - parseInt(document.querySelector("#speed_input").value); //Time of swap animation in milliseconds
let setTimeoutDelay = swapAnimationTime + 5; //Add 5ms just as a buffer

//Global variables
let fullOrderedDeck = create52CardArray(); //Original deck in sorted order
let cardArray = shuffleArray(fullOrderedDeck.slice()); //Declared globally to make editing easier. A copy of fullOrderedDeck
let cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Create a hash map where the key is the card and the value is the index of the card in cardArray
let orderedCardHashMap = createCardHashMap(fullOrderedDeck); //Keeps the proper sort order for the cards

//Called when the website loads
function main() {
    displayCards(cardArray,cardArraySize); //Add cards to the screen
    let arraySizeElement = document.querySelector("#size_input");
    let swapSpeedElement = document.querySelector("#speed_input");

    modifyDeckSize(arraySizeElement);
    modifySwapSpeed(swapSpeedElement);
}

main();