//This JavaScript file displays the pseudocode for the current sorting algorithm

let codeOnScreen = false; //Global boolean that marks whether pseudocode is currently on the screen

let bubbleSortText = `function bubblesort(array) {
    for(i = 0; i < array.length; i++) {
        for(j = 0; j < array.length - i - 1; j++) {
            if(array[j] > array[j + 1]) 
               swap(array[j], array[j + 1]);
       }
    }
 }`;

/*
Clears the pseudocode from the screen
*/
function clearPseudocode() {
    let cardDiv = document.getElementById('pseudocode-container');
    cardDiv.innerHTML = "";
    codeOnScreen = false;
}

/*
Displays pseudocode for the current sorting algorithm
Parameters:
 - pseudocodeText: the text of the pseudocode to be displayed
*/
function displayPseudocode(pseudocodeText) {
    let cardDiv = document.getElementById('pseudocode-container');
    cardDiv.innerHTML = "";

    let preElement = document.createElement("pre");
    preElement.innerText = pseudocodeText;
    
    if(codeOnScreen) {
        clearPseudocode();
    }

    cardDiv.append(preElement);
    codeOnScreen = true;
}