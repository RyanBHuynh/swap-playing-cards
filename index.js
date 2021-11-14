let card1 = document.querySelector('#AC');
let rect = card1.getBoundingClientRect();

//cardID dimensions
console.log("rect.left: ",rect.left);
console.log("rect.right: ",rect.right);
console.log("rect.top: ",rect.top);
console.log("rect.bottom: ",rect.bottom);

//Get x and y values for the card
let card1X = window.scrollX + rect.left;
let card1Y = window.scrollY + rect.right;

console.log("card1X: ",card1X);
console.log("card1Y: ",card1Y);

function linedraw(ax,ay,bx,by)
{
    if(ay>by)
    {
        bx=ax+bx;  
        ax=bx-ax;
        bx=bx-ax;
        by=ay+by;  
        ay=by-ay;  
        by=by-ay;
    }
    var calc=Math.atan((ay-by)/(bx-ax));
    calc=calc*180/Math.PI;
    var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
    document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
}

//linedraw(card1X,card1Y,1000,1000);
//console.log("after linedraw");

//Move card animation
function moveCardLeft() {
    let id = null;
    const card1 = document.getElementById('AC');
    const card2 = document.getElementById('QH');
    
    let cardSize = document.querySelector("img.card").style.width;
    console.log("cardSize = ",cardSize);

    let pos = 0;

    clearInterval(id);
    id = setInterval(moveApart,3);

    function moveApart () {
        if(pos == 100)
            clearInterval(id);
        else {
            pos++;
            card1.style.top = pos + 'px';
            card2.style.top = -pos + 'px';
        }
    }

    clearInterval(id);
    id = setInterval(moveCardsOver,3);
    pos = 0;
    function moveCardsOver() {
        if(pos == 100 + 4) //Length in pixels to move over (card width + gap)
            clearInterval(id);
        else {
            pos++;
            card1.style.left = pos + 'px';
            card2.style.left = -pos + 'px';
        }
    }

}