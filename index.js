//JavaScript file for the swap-playing-cards website
//Hosted on GitHub Pages
//Accessible at https://ryanbhuynh.github.io/swap-playing-cards

//Global variables
let cardArray = create52CardDeck(); //Declared globally to make editing easier
const cardSet = new Set(cardArray); //This set keeps track of all cards in the deck
let cardArraySize = 14;

//Function definitions
//Adds cards onto the screen from the cards selected in arrayOfCards
//Size represents the number of cards to display on the screen
async function displayCards(arrayOfCards,size) {
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
    if(!cardSet.has(leftText) || !cardSet.has(rightText)) {
        console.log("Error in checkCardQuery: the left card and/or the right card is not a playing card");
        return false;
    }
         
    //Check if the cards are next to each other
    for(let i = 0; i < cardArray.length - 1; i++) {
        if(cardArray[i] == leftText) {
            if(cardArray[i + 1] != rightText) {
                console.log("Error in checkCardQuery: the cards are not next to each other or they are in the wrong spot");
                return false;
            }
        }          
    }  
    return true;
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
}

//Move card animation
//Gets two cards to swap from an array of size 2 called cardsToSwap
//cardsToSwap is an array with two elements: [leftCard,rightCard]
async function swapCards(cardsToSwap) {
    //Get left cards and right card
    let leftText = cardsToSwap[0];
    let rightText = cardsToSwap[1];

    //Do nothing if either location is empty
    if(leftText == '' || rightText == '')
        return;
    
    let id = null;
    const card1 = document.getElementById(leftText);
    const card2 = document.getElementById(rightText);
    
    let pos = 0;
    clearInterval(id);
    id = setInterval(moveCardsOver,1);
    pos = 0;

    //Function that physically moves the cards over
    function moveCardsOver() {
        if(pos == 100) //Length in pixels to move over (card width + gap)
            clearInterval(id);
        else {
            pos++;
            card1.style.left = pos + 'px';
            card2.style.left = -pos + 'px';
        }
    }
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

    console.log("cardArray[",i,"] =",cardArray[i]);
    console.log("cardArray[",i+1,"] =",cardArray[i+1]);
}

//Runs when the user clicks the swap button
function swapButtonOnClick() {
    let result = getCardsToSwap();
    async function displayCardsAfterSwap(array,size) { //Display new array on the screen
        await swapCards(result);
        editArrayAfterSwap(result); //Edit array to reflect swap
        displayCards(cardArray,cardArraySize);
    }; 
    displayCardsAfterSwap(cardArray,cardArraySize);
    console.log(cardArray);
}

//Shuffles an array and returns the shuffled version
//Fisher-Yates Shuffle
function shuffleArray(array) {
    for(let i = array.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * array.length);
        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

//Returns a sorted array of a 52 card deck
//Each card is its rank followed by its suit
//For example, a King of Hearts is represented as 'KH' in the array
//No jokers are included
//Sort order: Clubs, Spades, Diamonds, Hearts
function create52CardDeck() {
    let rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let suit = ['C','S','D','H'];
    let sortedCards = []

    for(i in rank) {
        for(j in suit) {
            sortedCards.push(rank[i] + suit[j]);
        }
    }
    return sortedCards;
}

//Main function that gets called when the website loads
function main() {
    displayCards(cardArray,cardArraySize); //Add a specified number of cards to the screen
}

main();