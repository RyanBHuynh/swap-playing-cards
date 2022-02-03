/*
This JavaScript file has the functions tailoring to the cards themselves
*/

//Function definitions

//Adds cards onto the screen from the cards selected in arrayOfCards
//Size represents the number of cards to display on the screen
function displayCards(arrayOfCards,size) {
    let cardDiv = document.getElementById('cards');
    cardDiv.innerHTML = "";
    
    //Loop through arrayOfCards
    for(let i = 0; i < size; i++) {
        //Select image file
        let imgCard = document.createElement("img");
        imgCard.src = "cards/" + arrayOfCards[i] + ".svg";
        imgCard.id = arrayOfCards[i];
        imgCard.className = 'card'
        
        cardDiv.append(imgCard);
    }
}

//Checks if two cards are swappable
//Used as a subroutine in getCardsToSwap 
function checkCardQuery(leftText,rightText) {
    //Check if the cards are in the current deck
    if(!cardHashMap.has(leftText) || !cardHashMap.has(rightText)) {
        alert("Error: the left card and/or the right card is not a valid playing card");
        return false;
    }
    
    //Check if the cards are in the right order
    if(cardHashMap.get(leftText) > cardHashMap.get(rightText)) {
        alert("Error: the left card and right card are in the wrong order");
        return false
    }

    return true;
}

//Removes a CSS rule by the specified name
function removeCSSRule(rulename) {
    let styleTag = document.getElementById("main-stylesheet");
    let sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;

    //Look for the rule in the sheet
    if(sheet.cssRules) {
        for(let i = 0; i < sheet.cssRules.length; i++) {
            if(sheet.cssRules[i].selectorText === rulename)
                sheet.deleteRule(i);
        }
    }
}


//Gets two cards from the user input
//Returns an array containing the cards to swap
//O(n) time
function getCardsToSwap() {
    let leftInput = document.getElementById('leftInput');
    let rightInput = document.getElementById('rightInput');
    let button = document.getElementById('swapButton');

    //Get text input and make it all uppercase
    let leftText = document.getElementById('leftInput').value.toUpperCase();
    let rightText = document.getElementById('rightInput').value.toUpperCase();

    //Check if the input is valid
    if(checkCardQuery(leftText,rightText) == true)
        return [leftText,rightText];
    else
        return ['','']; //Return empty query if cards are invalid
    return [leftText,rightText];
}

//Returns the distance in pixels needed to swap the left and right cards
//We assume both cards are in the currently displayed deck in the valid position
//Returns false if one of the cards does not exist
function distBetweenCards(cardsToSwap) {
    //Get left cards and right card
    let leftText = cardsToSwap[0];
    let rightText = cardsToSwap[1];

    //Error check to make sure cards are valid
    if(!cardHashMap.has(leftText) || !cardHashMap.has(rightText)) {
        alert("Error: at least one of the cards is not a valid playing card");
        return false;
    }
    
    let leftPos = cardHashMap.get(leftText);
    let rightPos = cardHashMap.get(rightText);

    let result = (rightPos - leftPos) * cardWidth;
    
    //Error check if result is less than 0
    if(result <= 0)
        return -1;

    return result;
}

/*
Move card animation
Gets two cards to swap from an array of size 2 called cardsToSwap
cardsToSwap is an array with two elements: [leftCard,rightCard]
*/
function swapCards(cardsToSwap) {
    //Get left cards and right card
    let leftText = cardsToSwap[0];
    let rightText = cardsToSwap[1];

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
    
    let distance = distBetweenCards(cardsToSwap);

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
                    
    sheet.insertRule(moveLeftAnimation,0);
    sheet.insertRule(moveRightAnimation,1);

    //Add classes to cards to run CSS animation
    card1.classList.add("move-left");
    card2.classList.add("move-right");

    //Set animation time
    card1.style["animation-duration"] = (swapAnimationTime / 1000) + 's';
    card2.style["animation-duration"] = (swapAnimationTime / 1000) + 's';

    let setTimeoutDelay = swapAnimationTime + 10;

    //Wait to remove animation class
    window.setTimeout(() => {
        //Remove CSS animation class
        card1.classList.remove("move-left");
        card2.classList.remove("move-right");

        //Remove CSS animation rules
        sheet.deleteRule(0);
        sheet.deleteRule(0);

        //Edit array and display new cards
        editArrayAfterSwap(cardsToSwap); 
        displayCards(cardArray,cardArraySize); 
      }, setTimeoutDelay);

}

//Edits the array after two cards are swapped
//swappedCards is an array with two elements: [leftCard,rightCard]
function editArrayAfterSwap(swappedCards) {
    let leftCard = swappedCards[0];
    let rightCard = swappedCards[1];

//If empty strings are stored, then do nothing
    if(leftCard == '' || rightCard == '')
        return;

    let leftFound = false; //Marks whether the left card has been found yet
    let i = 0; //Array index 

//Find the location of leftCard
//We assume rightCard is right after leftCard
    while(leftFound == false && i < cardArray.length - 1) {
        if(cardArray[i] == leftCard)
            leftFound = true;
        else
            i++;
    }

//Edit array to reflect swapped cards
    cardArray[i] = rightCard;
    cardArray[i+1] = leftCard;
}

//Runs when the user clicks the swap button
function swapButtonOnClick() {
    let result = getCardsToSwap();
    swapCards(result); //Runs CSS animation
}

//Shuffles an array and returns the shuffled version
//Fisher-Yates Shuffle
function shuffleArray(array) {
    let arrayCopy = array.slice(); //Copy array rather than modifying the original
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
function create52CardDeck() {
//Initialize variables
    const rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const suit = ['C','S','D','H'];
    let sortedCards = []

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
Key: card
Value: the card's rank
*/
function createCardHashMap(cards) {
    let cardMap = new Map();

    for(let i = 0; i < cards.length; i++) 
        cardMap.set(cards[i],i);
    
    return cardMap;
}