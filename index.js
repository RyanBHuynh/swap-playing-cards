/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables for event listeners
let cardArraySize = document.querySelector("#size_input").value;
let swapAnimationTime = parseInt(document.querySelector("#speed_input").value); //Time of swap animation in milliseconds
let setTimeoutDelay = swapAnimationTime + 5; //Add 5ms just as a buffer
let cardWidth = 100; //The width of each card in pixels

//Global variables
let fullOrderedDeck = create52CardDeck(); //Original deck in sorted order
let cardArray = shuffleArray(fullOrderedDeck.slice()); //Declared globally to make editing easier. A copy of fullOrderedDeck
let cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Create a hash map where the key is the card and the value is the index of the card in cardArray
let orderedCardHashMap = createCardHashMap(fullOrderedDeck); //Keeps the proper sort order for the cards

//Called when the website loads
function main() {
    displayCards(cardArray,cardArraySize); //Add cards to the screen
    let arraySizeElement = document.querySelector("#size_input");
    let swapSpeedElement = document.querySelector("#speed_input");

    //Get the user-selected deck size
    arraySizeElement.addEventListener('input', function() {
        cardArraySize = parseInt(arraySizeElement.value);
        displayCards(cardArray,cardArraySize);
        cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Update hash map as size is changed
    });

    //Get the user-selected animation speed
    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 2000 - parseInt(swapSpeedElement.value); //2000ms is the the slowest swap speed
        setTimeoutDelay = swapAnimationTime + 5;
        console.log(swapAnimationTime);
    });
}

main();