
// Sort order: 2 through 10, J, Q, K, A, then Clubs, Spades, Diamonds, Hearts
// Smaller/weaker cards will have a smaller value

//Sort functions

//Compares two cards
//If c1 > c2, returns 1
//If the cards are the same, returns 0
//If c1 < c2, returns -1
//If error, returns false
function compareCards(c1,c2) {
    //Convert strings to uppercase
    c1 = c1.toUpperCase();
    c2 = c2.toUpperCase();

    //Check if the cards are in the current deck
    if(!cardHashMap.has(c1) || !cardHashMap.has(c2)) {
        alert("Error: at least one of the cards is not a valid playing card");
        return false;
    }

    //Check the hash map result
    let c1HashRes = orderedCardHashMap.get(c1);
    let c2HashRes = orderedCardHashMap.get(c2);

    if(c1HashRes == undefined || c2HashRes == undefined)
        return false;

    //Check if the strings are the same
    if(c1 == c2)
        return 0;
    
    //Return 1 if c1 > c2
    if(c1HashRes > c2HashRes)
        return 1;
    
    //Return -1 if c1 < c2
    else
        return -1;

}

//Sorts the cards and displays them
function bubbleSort(cards) {
    for(let i = 0; i < cardArraySize; i++) {
        for(let j = i + 1; j < cardArraySize - i - 1; j++) {
            if(compareCards(cards[j],cards[j + 1]) == 1) {
                console.log("left =", cards[j]);
                console.log("right =",cards[j + 1]);
                swapCards(cards[j],cards[j + 1]);
            }
        }
    }
    console.log(cardArray);
    displayCards(cardArray);
}

//Called when the user clicks the bubble sort button
function bubbleSortButtonOnClick() {
    bubbleSort(cardArray);
}