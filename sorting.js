
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
async function bubbleSort(cards) {
    document.querySelector("#size_input").disabled = true; //Disable size slider during sorting

    for(let i = 0; i < cardArraySize - 1; i++) {
        everSwapped = false; //Keeps track if there were any swaps during this pass
        for(let j = 0; j < cardArraySize - i - 1; j++) {
            if(compareCards(cards[j],cards[j + 1]) == 1) {
                everSwapped = true;
                swapCards([cards[j],cards[j + 1]]);
                await sleep(setTimeoutDelay);
            }
        }

        //If there were no swaps, then all the cards are in sorted order
        if(everSwapped == false)
            break;
    }

    document.querySelector("#size_input").disabled = false;
}

async function insertionSort(cards) {
    document.querySelector("#size_input").disabled = true; //Disable size slider during sorting

    for(let i = 1; i < cardArraySize; i++) {
        let key = cards[i];
        let j = i - 1;

        while (j >= 0 && cards[j] > key)
        { 
            cards[j + 1] = cards[j]; 
            j--; 
        } 
        swapCards([cards[j + 1], key]);
        await sleep(setTimeoutDelay);
    }

    document.querySelector("#size_input").disabled = false;
}

//Called when the user clicks the bubble sort button
function bubbleSortButtonOnClick() {
    bubbleSort(cardArray);
}

function insertionSortButtonOnClick() {
    insertionSort(cardArray);
}