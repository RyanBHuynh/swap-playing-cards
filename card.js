//This JavaScript file has the functions tailoring to the cards themselves

/*
Adds cards onto the screen from the cards selected in arrayOfCards

Parameters:
 - arrayOfCards: the card array to display
 - size: the number of cards to display
*/
function displayCards(arrayOfCards,size) {
    let cardDiv = document.getElementById('cards');
    cardDiv.innerHTML = "";
    
    for(let i = 0; i < size; i++) {
        //Select image file
        let imgCard = document.createElement("img");
        imgCard.src = "cards/" + arrayOfCards[i] + ".svg";
        imgCard.id = arrayOfCards[i];
        imgCard.className = 'card'
        
        cardDiv.append(imgCard);
    }
}

/*
Checks if two cards are swappable
Used as a subroutine in getCardsToSwap 

Parameters:
 - leftText: the left card to check
 - rightText: the right card to check
*/
function checkCardQuery(leftText,rightText) {
    //Check if the cards are in the current deck
    if(!cardHashMap.has(leftText) || !cardHashMap.has(rightText)) {
        alert("Error: the left card and/or the right card is not a valid playing card");
        return false;
    }
    
    //Check if the cards are in the right order
    if(cardHashMap.get(leftText) > cardHashMap.get(rightText)) {
        alert("Error: the left card and right card are in the wrong order");
        return false;
    }

    return true;
}

/*
Removes a CSS rule by the specified name from the main stylesheet
Parameters:
 - rulename: the name of the rule to remove
*/
function removeCSSRule(rulename) {
    let styleTag = document.getElementById("main-stylesheet");
    let sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;

    //Look for the rule in the sheet and delete it
    if(sheet.cssRules) {
        for(let i = 0; i < sheet.cssRules.length; i++) {
            if(sheet.cssRules[i].selectorText === rulename)
                sheet.deleteRule(i);
        }
    }
}

/*
Gets two cards from the user input on the website
Return value: an array containing the cards to swap
*/
function getCardsToSwap() {
    //Get text input and make it all uppercase
    let leftText = document.getElementById('leftInput').value.toUpperCase();
    let rightText = document.getElementById('rightInput').value.toUpperCase();

    //Check if the input is valid
    if(checkCardQuery(leftText,rightText) == true)
        return [leftText,rightText];
    else
        return ['','']; //Return empty query if cards are invalid
}

/*
Find and return the distance in pixels between the left and right cards

Parameters: 
 - leftCard and rightCard: the cards to get the distance between
 - cardWidth: the width of each card in pixels
Return values:
 - Returns the distance in pixels to swap the left and right cards
 - Returns -1 if one of the cards does not exist or the cards are in the wrong order

*/
function distBetweenCards(leftCard, rightCard, cardWidth) {
    //Error check to make sure cards are valid
    if(checkCardQuery(leftCard,rightCard) == false)
        return -1;
    
    let leftPos = cardHashMap.get(leftCard);
    let rightPos = cardHashMap.get(rightCard);
    let result = (rightPos - leftPos) * cardWidth;
    
    //Error check if result is less than 0
    if(result <= 0)
        return -1;

    return result;
}

/*
Adds a CSS animation for swapping two cards on the screen
Parameters:
 - the JS-created stylesheet
 - a distance value (the number of pixels between two cards)
*/
function addAnimationCSSRules(stylesheet,distance) {
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
                    
    stylesheet.insertRule(moveLeftAnimation,0);
    stylesheet.insertRule(moveRightAnimation,1);
}

/*
Delays async code for a specified amount of time
Parameters: the number of milliseconds to wait
Returns a promise after waiting the specified amount of time
*/
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/*
Swaps two cards visually on the website
Parameters: Gets two cards to swap from an array of size 2 called cardsToSwap
cardsToSwap is an array with two elements: [leftCard,rightCard]
*/
async function swapCardsVisually(leftText, rightText) {
    //Do nothing if either location is empty
    if(leftText == '' || rightText == '')
        return;

    //Get cards from HTML document
    const card1 = document.getElementById(leftText);
    const card2 = document.getElementById(rightText);

    //Add new CSS rules
    let style = document.createElement("style");
    document.head.appendChild(style);
    let sheet = style.sheet;
    let distance = distBetweenCards(leftText, rightText, 100);
    addAnimationCSSRules(sheet, distance);

    card1.classList.add("move-left");
    card2.classList.add("move-right");

    //Set animation time
    card1.style["animation-duration"] = (swapAnimationTime / 1000) + 's';
    card2.style["animation-duration"] = (swapAnimationTime / 1000) + 's';

    await sleep(setTimeoutDelay);
    
    //Remove CSS animation class and rules
    card1.classList.remove("move-left");
    card2.classList.remove("move-right");
    sheet.deleteRule(0);
    sheet.deleteRule(0);

    //Update hash map and array with new card positions
    let leftCardPos = cardHashMap.get(leftText);
    let rightCardPos = cardHashMap.get(rightText);

    cardArray[leftCardPos] = rightText;
    cardArray[rightCardPos] = leftText;

    cardHashMap.set(leftText, rightCardPos);
    cardHashMap.set(rightText, leftCardPos);

    displayCards(cardArray,cardArraySize); 
}

/*
Shuffles an array and returns the shuffled version
Uses the Fisher-Yates Shuffle
Parameters: an array
Return values: a copy of array with shuffled values
*/
function shuffleArray(array) {
    let arrayCopy = array.slice();

    for(let i = arrayCopy.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * arrayCopy.length);
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[randomIndex];
        arrayCopy[randomIndex] = temp;
    }

    return arrayCopy;
}

/*
Returns a sorted array of a 52 card deck
Each card is its rank followed by its suit
For example, a King of Hearts is represented as 'KH' in the array
No jokers are included
Sort order: Clubs, Spades, Diamonds, Hearts
*/
function create52CardArray() {
    const rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const suit = ['C','S','D','H'];
    let sortedCards = [];

    //Insert cards in sorted order into sortedCards
    for(i in rank) {
        for(j in suit) {
            sortedCards.push(rank[i] + suit[j]);
        }
    }
    return sortedCards;
}

/*
Returns a hash map of all of the cards
Parameters: cards, an array of cards of any size
Key: card
Value: the card's rank
*/
function createCardHashMap(cards) {
    let cardMap = new Map();

    for(let i = 0; i < cards.length; i++) 
        cardMap.set(cards[i],i);
    
    return cardMap;
}

/* 
Visually shuffles the deck on the website
Fisher-Yates Shuffle is implemented
*/
async function shuffleDeckVisually() {
    let left = "";
    let right = "";
    let indexToSwapWith = 0;

    document.querySelector("#size_input").disabled = true; //Disable size slider during shuffling
    
    for(let i = cardArraySize - 1; i >= 0; i--) {
        indexToSwapWith = Math.floor(Math.random() * cardArraySize); //Choose a random index

        //Do nothing if the random index equals i
        if(i == indexToSwapWith)
            continue;
        
        else {
            //Check if indexToSwapWith is to the right of i
            if(indexToSwapWith > i) {
                left = cardArray[i];
                right = cardArray[indexToSwapWith];
            } 

            //Otherwise, indexToSwapWith is to the left of i
            else {
                left = cardArray[indexToSwapWith];
                right = cardArray[i];
            }

            swapCardsVisually(left, right);
            await sleep(setTimeoutDelay);
        }
    }

    document.querySelector("#size_input").disabled = false;
}