/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables
let fullOrderedDeck = create52CardDeck();
let cardArraySize = document.querySelector("#size_input").value;
let cardArray = shuffleArray(fullOrderedDeck); //Declared globally to make editing easier
let swapAnimationTime = parseInt(document.querySelector("#speed_input").value); //Time of swap animation in milliseconds
let cardSet = new Set(cardArray); //This set keeps track of all cards in the deck
let cardHashMap = createOrderedCardHashMap();

//Main function that gets called when the website loads
function main() {
    displayCards(cardArray,cardArraySize); //Add a specified number of cards to the screen
    let arraySizeElement = document.querySelector("#size_input");
    let swapSpeedElement = document.querySelector("#speed_input");

    //Disable bubble sort button
    document.querySelector('#bubbleSortButton').disabled = true;

    //Event listeners
    //Add an event listener to get the user-selected deck size
    arraySizeElement.addEventListener('input', function() {
        cardArraySize = parseInt(arraySizeElement.value);
        console.log(cardArray);
        displayCards(cardArray,cardArraySize);
        cardSet = new Set(cardArray);
    });

    //Add an event listener to get the user-selected animation speed
    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 3500 - parseInt(swapSpeedElement.value);
        console.log(swapAnimationTime);
    });

}

main();