/* JavaScript file for the swap-playing-cards website
Hosted on GitHub Pages
Accessible at https://ryanbhuynh.github.io/swap-playing-cards */

//Global variables for event listeners
let cardArraySize = document.querySelector("#size_input").value;
let swapAnimationTime = parseInt(document.querySelector("#speed_input").value); //Time of swap animation in milliseconds
let cardWidth = 100; //The width of each card in pixels

//Global variables
let fullOrderedDeck = create52CardDeck(); //Original deck in sorted order
let cardArray = shuffleArray(fullOrderedDeck.slice()); //Declared globally to make editing easier. A copy of fullOrderedDeck
let cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Create a hash map where the key is the card and the value is the index of the card in cardArray
let orderedCardHashMap = createCardHashMap(fullOrderedDeck); //Keeps the proper sort order for the cards

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
        cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Update hash map as size is changed
    });

    //Add an event listener to get the user-selected animation speed
    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 3500 - parseInt(swapSpeedElement.value);
        console.log(swapAnimationTime);
    });


    //Add new CSS rule
    removeCSSRule("img.card");

    let style = document.createElement("style");
    document.head.appendChild(style);
    let sheet = style.sheet;

    let newCardStyle = "img.card {width: 101px;}";
    sheet.insertRule(newCardStyle,0);

    let distance = 800 * 1.01;

    let moveLeftAnimation = `@keyframes animation-move-left 
                            { 25% {transform: translateY(-150px);} 
                              50% { transform: translateY(-150px) translateX(` + distance + `px); } 
                              100% {transform: translateX(` + distance + `px);} 
                            }`;
    
    let moveRightAnimation = `@keyframes animation-move-right 
                            { 25% {transform: translateY(150px);} 
                              50% { transform: translateY(150px) translateX(-` + distance + `px); } 
                              100% {transform: translateX(-` + distance + `px);} 
                            }`;                        
                    
    sheet.insertRule(moveLeftAnimation,1);
    sheet.insertRule(moveRightAnimation,2);

}

main();