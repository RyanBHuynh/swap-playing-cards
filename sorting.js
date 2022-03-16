// Sort order: 2 through 10, J, Q, K, A, then Clubs, Spades, Diamonds, Hearts
// Smaller/weaker cards will have a smaller value

//Sort functions

/*
Compares two cards and returns a value indicating which card has a greater value according to the cards' sorted order
 - If c1 > c2, returns 1
 - If the cards are the same, returns 0
 - If c1 < c2, returns -1
 - If error, returns false

Parameters: two different cards
Return value: An integer indicating the order of the two cards
*/
function compareCards(c1,c2) {
    c1 = c1.toUpperCase();
    c2 = c2.toUpperCase();

    //Check if the cards are in the current deck
    if(!cardHashMap.has(c1) || !cardHashMap.has(c2)) {
        alert("Error: at least one of the cards is not a valid playing card");
        return false;
    }

    let c1HashRes = orderedCardHashMap.get(c1);
    let c2HashRes = orderedCardHashMap.get(c2);

    if(c1HashRes == undefined || c2HashRes == undefined)
        return false;

    if(c1 == c2)
        return 0;
    
    if(c1HashRes > c2HashRes)
        return 1;
    
    else
        return -1;

}

async function bubbleSort(cards) {
    document.querySelector("#size_input").disabled = true; //Disable size slider during sorting

    for(let i = 0; i < cardArraySize - 1; i++) {
        everSwapped = false; //Keeps track if there were any swaps during this pass
        for(let j = 0; j < cardArraySize - i - 1; j++) {
            if(compareCards(cards[j],cards[j + 1]) == 1) {
                everSwapped = true;
                swapCardsVisually([cards[j],cards[j + 1]]);
                await sleep(setTimeoutDelay);
            }
        }

        //If there were no swaps, then all the cards are in sorted order
        if(everSwapped == false)
            break;
    }

    document.querySelector("#size_input").disabled = false;
}

//Edited so that the swaps show properly
async function insertionSort(cards) {
    document.querySelector("#size_input").disabled = true; //Disable size slider during sorting

    for(let i = 0; i < cardArraySize - 1; i++) {
        let j = i + 1;

        //Check if j is in bounds and if the left card is greater than the right card
        while (j > 0 && (compareCards(cards[j - 1], cards[j]) > 0))
        { 
            swapCardsVisually([cards[j - 1], cards[j]]);
            await sleep(setTimeoutDelay);
            j--; 
        } 
    }

    document.querySelector("#size_input").disabled = false;
}