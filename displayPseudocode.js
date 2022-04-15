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
function clearPseudocode() {
    //Clear header
    let pseudocodeHeaderDiv = document.getElementById('pseudocode-header');
    pseudocodeHeaderDiv.innerHTML = "";
    pseudocodeHeaderDiv.innerText = "";

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
    let pseudocodeContainerDiv = document.getElementById('pseudocode-container');
    pseudocodeContainerDiv.innerHTML = "";

    let preElement = document.createElement("pre");
    preElement.innerText = pseudocodeText;
    
    if(codeOnScreen) {
        clearPseudocode();
    }

    pseudocodeContainerDiv.append(preElement);
    codeOnScreen = true;
}

function selectPseudocodeToDisplay(algorithm) {
    let pseudocodeHeaderDiv = document.getElementById('pseudocode-header');
    pseudocodeHeaderDiv.innerHTML = "";

    switch(algorithm) {
        case "bubbleSort":
            pseudocodeHeaderDiv.innerText = "Bubble Sort Pseudocode";
            displayPseudocode(bubbleSortText);
            break;
        case "insertionSort":
            pseudocodeHeaderDiv.innerText = "Insertion Sort Pseudocode";
            displayPseudocode(insertionSortText);
            break;
        case "selectionSort":
            pseudocodeHeaderDiv.innerText = "Selection Sort Pseudocode";
            displayPseudocode(selectionSortText);
            break;
        case "quickSort":
            pseudocodeHeaderDiv.innerText = "Quick Sort Pseudocode";
            displayPseudocode(quickSortText);
            break;
        default:
            clearPseudocode();
            break;
    }
}
