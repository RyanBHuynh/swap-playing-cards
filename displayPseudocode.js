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