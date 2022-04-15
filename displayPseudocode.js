//This JavaScript file displays the pseudocode for the current sorting algorithm

//Global variables
let codeOnScreen = false; //Global boolean that marks whether pseudocode is currently on the screen

//Text for sorting algorithms
let bubbleSortText = `function bubblesort(array) {
    for(i = 0; i < array.length; i++) {
        for(j = 0; j < array.length - i - 1; j++) {
            if(array[j] > array[j + 1]) 
               swap(array[j], array[j + 1]);
       }
    }
}`;

let insertionSortText = `function insertionsort(array) {
    for(i = 1; i < array.length; i++) {
        j = i;
        while(j > 0 && array[j] < array[j - 1]) {
            swap(array[j], array[j - 1]);
            j--;
        }
    }
}`;

let selectionSortText = `function selectionsort(array) {
    for(i = 0; i < array.length; i++) {
        min = i;
        for(j = i + 1; j < array.length; j++) {
            if(array[j] < array[min])
                min = j;
        }
        swap(array[i], array[min]);
    }
}`;

let quickSortText = `function quicksort(array, left, right) {
    if(left < right) {
        pivot = partition(array, left, right);
        quicksort(array, left, pivot - 1);
        quicksort(array, pivot + 1, right);
    }
}`;

/*
Clears the pseudocode from the screen
*/
function clearPseudocodeAndHeader() {
    //Clear header
    let pseudocodeHeaderDiv = document.getElementById('pseudocode-header-h3');
    pseudocodeHeaderDiv.innerHTML = "";

    //Clear pseudocode
    let pseudocodeContainerDiv = document.getElementById('pseudocode-container');
    pseudocodeContainerDiv.innerHTML = "";
    codeOnScreen = false;
}

/*
Displays pseudocode for the current sorting algorithm
Parameters:
 - pseudocodeText: the text of the pseudocode to be displayed
*/
function displayPseudocode(pseudocodeText) {
    clearPseudocodeAndHeader();

    let pseudocodeContainerDiv = document.getElementById('pseudocode-container');
    pseudocodeContainerDiv.innerHTML = "";

    //Create pre element to store pseudocode text
    let preElement = document.createElement("pre");
    preElement.innerText = pseudocodeText;
    pseudocodeContainerDiv.append(preElement);
}

function displayHeader(headerText) {
    let pseudocodeHeaderDiv = document.getElementById('pseudocode-header-h3');
    pseudocodeHeaderDiv.innerHTML = "";
    pseudocodeHeaderDiv.innerText = headerText;
}

/*
Displays the header and pseudocode for a selected sorting algorithm
Parameters:
 - algorithm: the name of the algorithm to display
*/
function selectPseudocodeToDisplay(algorithm) {
    clearPseudocodeAndHeader();

    //Create object to store pseudocode text
    let pseudocodeHeaderDiv = document.getElementById('pseudocode-header-h3');
    pseudocodeHeaderDiv.innerHTML = "";

    //Display pseudocode and header
    //Pseudocode must be displayed before the header, or else the header gets cleared
    switch(algorithm) {
        case "bubbleSort":
            displayPseudocode(bubbleSortText);
            displayHeader("Bubble Sort Pseudocode");
            break;

        case "insertionSort":
            displayPseudocode(insertionSortText);
            displayHeader("Insertion Sort Pseudocode");
            break;

        case "selectionSort":
            displayPseudocode(selectionSortText);
            displayHeader("Selection Sort Pseudocode");
            break;

        case "quickSort":
            displayPseudocode(quickSortText);
            displayHeader("Quick Sort Pseudocode");
            break;

        default:
            break;

    }
}
