//This JavaScript file is used to sort and compare the cards on the screen
//Functions here are responsible for sorting the cards on the screen

// Sort order: 2 through 10, J, Q, K, A, then Clubs, Spades, Diamonds, Hearts
// Smaller cards have a smaller value

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
        console.log("c1:", c1);
        console.log("c2:", c2);
        return false;
    }

    let c1HashRes = orderedCardHashMap.get(c1);
    let c2HashRes = orderedCardHashMap.get(c2);

    //Check if the cards are in the hash map
    if(c1HashRes == undefined || c2HashRes == undefined)
        return false;

    if(c1 == c2)
        return 0;
    
    if(c1HashRes > c2HashRes)
        return 1;
    
    else
        return -1;
}

//Sort functions

/*
Sorts the cards on the screen using bubble sort
Parameters: the current card array
*/
async function bubbleSort(cards) {
    disableSizeSlider();

    let everSwapped = false;
    for(let i = 0; i < cardArraySize - 1; i++) {
        everSwapped = false; //Keeps track if there were any swaps during this pass

        for(let j = 0; j < cardArraySize - i - 1; j++) {
            if(compareCards(cards[j],cards[j + 1]) == 1) {
                everSwapped = true;
                swapCardsVisually(cards[j],cards[j + 1]);
                await sleep(setTimeoutDelay);
            }
        }

        //Stop sorting if cards are already sorted
        if(everSwapped == false)
            break;
    }

    enableSizeSlider();
}

/*
Sorts the cards on the screen using insertion sort
Parameters: the current card array
*/
async function insertionSort(cards) {
    disableSizeSlider();

    for(let i = 0; i < cardArraySize - 1; i++) {
        let j = i + 1;

        //Check if j is in bounds and if the left card is greater than the right card
        while (j > 0 && (compareCards(cards[j - 1], cards[j]) > 0))
        { 
            swapCardsVisually(cards[j - 1], cards[j]);
            await sleep(setTimeoutDelay);
            j--; 
        } 
    }

    enableSizeSlider();
}

/*
Sorts the cards on the screen using selection sort
Parameters: the current card array
*/
async function selectionSort(cards) {
    disableSizeSlider();

    for(let i = 0; i < cardArraySize - 1; i++) {
        let minIndex = i;
        
        //Find the smallest card in the array
        for(let j = i + 1; j < cardArraySize; j++) {
            if(compareCards(cards[j], cards[minIndex]) < 0)
                minIndex = j;
        }

        //Swap the smallest card with the current card
        if(minIndex != i) {
            swapCardsVisually(cards[i], cards[minIndex]);
            await sleep(setTimeoutDelay);
        }
    }

    enableSizeSlider();
}

/*
Partitions the cards on the screen for quicksort
Parameters:
- cards: the current card array
- low: the low index of the current array
- high: the high index of the current array
*/
async function partition(cards, low, high) {
    let pivot = cards[high]; //Select pivot as the last card in the array
    let i = low - 1; //Index where the pivot element will be placed in the sorted array

    //Swap cards that are less than the pivot
    for(let j = low; j < high; j++) {
        if(compareCards(cards[j], pivot) < 0) {
            i++;

            if(i != j) {
                swapCardsVisually(cards[i], cards[j]);
                await sleep(setTimeoutDelay);
            }
        }
    }

    //Swap pivot back into place
    if(i + 1 != high) {
        swapCardsVisually(cards[i + 1], cards[high]);
        await sleep(setTimeoutDelay);
    }

    return i + 1;
}

/*
Sorts the cards on the screen using quicksort
Parameters: the current card array
*/
async function quickSort(cards) {
    disableSizeSlider();
    await quickSortHelper(cards, 0, cardArraySize - 1);
    enableSizeSlider();
}

/*
Recursive helper function for quicksort
Parameters:
- cards: the current card array
- low: the low index of the current array
- high: the high index of the current array
*/
async function quickSortHelper(cards, low, high) {    
    if(low < high) {
        //Partition the array
        let pivot = await partition(cards, low, high);
        
        //Sort both halves of the array
        await quickSortHelper(cards, low, pivot - 1);
        await quickSortHelper(cards, pivot + 1, high);
    }
}
