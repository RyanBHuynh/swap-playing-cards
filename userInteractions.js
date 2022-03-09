//This JavaScript file stores the functions and variables that are related to how the user interacts with the website.
//Here, you'll find functions that get and change the deck size, deck speed, and for buttons that sort the playing cards.

//Event listeners

//Get and change the user-selected deck size
function modifyDeckSize(arraySizeElement) {
    arraySizeElement.addEventListener('input', function() {
        cardArraySize = parseInt(arraySizeElement.value);
        displayCards(cardArray,cardArraySize);
        cardHashMap = createCardHashMap(cardArray.slice(0,cardArraySize)); //Update hash map as size is changed
    });
}

//Get and change the user-selected swap speed
function modifySwapSpeed(swapSpeedElement) {
    swapSpeedElement.addEventListener('input', function() {
        swapAnimationTime = 2000 - parseInt(swapSpeedElement.value); //2000ms is the the slowest swap speed
        setTimeoutDelay = swapAnimationTime + 5;
        console.log(swapAnimationTime);
    });
}