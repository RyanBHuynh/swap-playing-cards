//Has the sort functions

//Compares two cards
//If c1 > c2, returns 1
//If the cards are the same, returns 0
//If c1 < c2, returns -1
//If error, returns false
function compare(c1,c2) {
    //Convert strings to uppercase
    c1 = c1.toUppercase();
    c2 = c2.toUppercase();

    //Check if the cards are in the current deck
    if(!cardSet.has(c1) || !cardSet.has(c2)) {
        alert("Error: at least one of the cards is not a valid playing card");
        return false;
    }
    
    //Check if the strings are the same
    if(c1 == c2)
        return 0;

}

//Sorts the cards and displays them
function bubbleSort(cards) {
    cards = 1;
}

//Called when the user clicks the bubble sort button
function bubbleSortOnClick() {
    bubbleSort(cardArray);
}