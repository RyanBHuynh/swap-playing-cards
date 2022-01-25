/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables
let fullOrderedDeck = create52CardDeck(); //Original deck in sorted order
let cardArray = shuffleArray(fullOrderedDeck.slice()); //Declared globally to make editing easier. A copy of fullOrderedDeck
let cardSet = new Set(cardArray.slice(0,cardArraySize)); //This set keeps track of all cards in the deck
let orderedCardHashMap = createCardHashMap(fullOrderedDeck); //Keeps the proper sort order for the cards

//Global variables for event listeners
let cardArraySize = document.querySelector("#size_input").value;
let swapAnimationTime = parseInt(document.querySelector("#speed_input").value); //Time of swap animation in milliseconds

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
        cardSet = new Set(cardArray.slice(0,cardArraySize));
    });

    //Add an event listener to get the user-selected animation speed
    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 3500 - parseInt(swapSpeedElement.value);
        console.log(swapAnimationTime);
    });

}

main();