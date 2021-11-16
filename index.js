//JavaScript file for the swap-playing-cards website
//Hosted on GitHub Pages
//Accessible at https://ryanbhuynh.github.io/swap-playing-cards

//Function definitions
//Adds cards onto the screen from the cards selected in cardArray
//Size represents the number of cards to display on the screen
function addCards(cardArray,size) {
    let shuffledCards = shuffleArray(cardArray);
    
    //Loop through cardArray
    for(let i = 0; i < size; i++) {
        //Select image file
        let imgCard = document.createElement("img");
        imgCard.src = "cards/" + shuffledCards[i] + ".svg";
        imgCard.id = shuffledCards[i];
        imgCard.className = 'card';

        let cardDiv = document.getElementById('cards');
        cardDiv.append(imgCard);
    }
}

//Move card animation
function swapCards() {
    let leftInput = document.getElementById('leftInput');
    let rightInput = document.getElementById('rightInput');
    let button = document.getElementById('swapButton');

    //Disable input after one swap
    leftInput.disabled = true;
    rightInput.disabled = true;
    button.disabled = true;

    //Get text input and make it all uppercase
    let leftText = document.getElementById('leftInput').value.toUpperCase();
    let rightText = document.getElementById('rightInput').value.toUpperCase();

    let id = null;
    const card1 = document.getElementById(leftText);
    const card2 = document.getElementById(rightText);
    
    let pos = 0;
    clearInterval(id);
    id = setInterval(moveCardsOver,1);
    pos = 0;

    function moveCardsOver() {
        if(pos == 100) //Length in pixels to move over (card width + gap)
            clearInterval(id);
        else {
            pos++;
            card1.style.left = pos + 'px';
            card2.style.left = -pos + 'px';
        }
    }

}

//Shuffles an array and returns the shuffled version
//Fisher-Yates Shuffle
function shuffleArray(array) {
    for(let i = array.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * array.length);
        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

//Returns a sorted array of a 52 card deck
//Each card is its rank followed by its suit
//For example, a King of Hearts is represented as 'KH' in the array
//No jokers are included
//Sort order: Clubs, Spades, Diamonds, Hearts
function create52CardDeck() {
    let rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let suit = ['C','S','D','H'];
    let sortedCards = []

    for(i in rank) {
        for(j in suit) {
            sortedCards.push(rank[i] + suit[j]);
        }
    }
    console.log(sortedCards);
    return sortedCards;
}

//Main function that gets called when the website loads
function main() {
    let cardArray = create52CardDeck();
    addCards(cardArray,14); //Add a specified number of cards to the screen
}

main();