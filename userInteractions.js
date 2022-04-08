//This JavaScript file stores the functions and variables that are related to how the user interacts with the website.
//Here, you'll find functions that get and change the deck size, deck speed, and for buttons that sort the playing cards.

//Event listeners

//Get and change the user-selected deck size
function modifyDeckSize() {
    let arraySizeElement = document.querySelector("#size_input");

    arraySizeElement.addEventListener('input', function() {
        cardArraySize = parseInt(arraySizeElement.value);
        displayCards(cardArray,cardArraySize);
        cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Update hash map as size is changed
        console.log("cardArraySize = ", cardArraySize)
    });
}

//Get and change the user-selected swap speed
function modifySwapSpeed() {
    let swapSpeedElement = document.querySelector("#speed_input");

    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 2000 - parseInt(swapSpeedElement.value); //2000ms is the the slowest swap speed
        setTimeoutDelay = swapAnimationTime + 5;
        console.log(swapAnimationTime);
    });
}

//OnClick functions

//Runs when the user clicks the swap button
function swapButtonOnClick() {
    let result = getCardsToSwap();
    let leftCard = result[0];
    let rightCard = result[1];

    swapCardsVisually(leftCard, rightCard); //Runs CSS animation
}

//Called when the user clicks the shuffle deck button
function shuffleButtonOnClick() {
    shuffleDeckVisually();
}

//Called when the user clicks the bubble sort button
function bubbleSortButtonOnClick() {
    bubbleSort(cardArray);
}

//Called when the user clicks the insertion sort button
function insertionSortButtonOnClick() {
    insertionSort(cardArray);
}

async function quickSortButtonOnClick() {
    quickSort(cardArray);
}