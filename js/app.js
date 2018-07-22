/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

 let openCards = [];

 let matchCount = 0;

 let moveCount = 0;

 let timeCount = 0;

 let timeCal;

 let downloadTimer;

 let secCount;

 let flag = false;

 let secCounter;

 let moveCounter;

 let starCounter;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function makeGrid(){

    shuffle(cards.concat(cards)).forEach(function(card){
        $(".deck").append(
            `<li class="card">
                <i class="fa ${card}"></i>
            </li>`
        )
    });

}

function initMoves(){

    for(let i=0; i<3; i++){
        $(".stars").append(
            `<li><i class="fa fa-star"></i></li>`
        )
    }

}

function reset(){
    $(".deck").html("");
    $(".stars").html("");
    $(".moves").html(`<span class="moves" id="points">0</span>`);
    $(".star-points").html(`<span class="star-points" id="starPoints">3</span>`);
    $(".time-seconds").html(`<span class="time-seconds" id="timeSec">0</span>`);
    openCards = [];
    matchCount = 0;
    moveCount = 0;
    clearInterval(downloadTimer);
    flag = false;
    init();
}

 function init(){
     
     makeGrid();
     initMoves();
 
     $(".card").on("click", function(){
         if(flag == false){
             flag = true;
             calculateSeconds();
         }
         
         if($(this).attr("class").search("show") !== -1 || $(this).attr("class").search("match") !== -1){
             return;
         }
         
         if(openCards.length < 2){
             $(this).toggleClass("show");
 
             openCards.push($(this));
         }
 
         if(openCards.length == 2){
             if(openCards[0][0].firstElementChild.className == openCards[1][0].firstElementChild.className){
                 matchCount++;
 
                 openCards.forEach(function(card){
                     card.toggleClass("animated jello");
                     setTimeout(function(){
                         card.toggleClass("show match animated jello");
                     },600)
                 });
 
             }else{
                 openCards.forEach(function(card){
                    card.toggleClass("red")
                     card.toggleClass("animated swing");
                     setTimeout(function(){
                         card.toggleClass("show animated swing");
                     }, 600);
                 });
             }
             openCards = [];
             calculateMove();
         }
         if(matchCount == 8){
            congrats();
         }

         function calculateMove(){
             moveCount+=1;
             let movePoints = document.getElementById("points");
             movePoints.innerHTML = moveCount;
                if(moveCount === 16 || moveCount === 20){
                    reducePoints();
                }
         }

        function congrats(){
            secCounter = document.getElementById("score-card-sec");
            $("#score-card-sec").html(secCount);
            moveCounter = document.getElementById("score-card-moves");
            $("#score-card-moves").html(moveCount);
            starCounter = document.getElementById("score-card-star");
            $("#score-card-star").html(starPoints);
            $('#congratsModal').modal('toggle');
            stopTimer();
        }

        function reducePoints(){
            let starPoints = document.getElementById("starPoints");
            let stars = $(".fa-star");
            $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
            starPoints.innerHTML = $(".fa-star").length;
        }

        function calculateTime(){
            timeCount++;
            $("#timer").html(timeCount);
            timeCal = setTimeout(startTimer, 1000);

        }

        

     });
 }

 function calculateSeconds(){
    let timeStart = 0;
    downloadTimer = setInterval(function(){
    secCount = document.getElementById("timeSec").value = 0 + ++timeStart;
     if(timeStart >= 0)
       $(".time-seconds").html(secCount);
   },1000);
 }

 function stopTimer(){
    clearInterval(downloadTimer);
 }




//  window.onload = function () {
  
//     var seconds = 00; 
//     var tens = 00; 
//     var appendTens = document.getElementById("tens")
//     var appendSeconds = document.getElementById("seconds")
//     var buttonStart = document.getElementById('button-start');
//     var buttonStop = document.getElementById('button-stop');
//     var Interval ;
  
//     buttonStart.onclick = function() {
      
//        clearInterval(Interval);
//        Interval = setInterval(startTimer, 10);
        
//     //    console.log(`$tens`);
//     //    console.log(`$Interval`);
//     }

//     function freezeTimer() {
//         console.log(seconds);
//         clearInterval(Interval);
//     }
    
  
//     // buttonReset.onclick = function() {
//     //    clearInterval(Interval);
//     //   tens = "00";
//     //     seconds = "00";
//     //   appendTens.innerHTML = tens;
//     //     appendSeconds.innerHTML = seconds;
//     // }
    
     
    
//     function startTimer () {
//       tens++; 
      
//       if(tens < 9){
//         appendTens.innerHTML = "0" + tens;
//       }
      
//       if (tens > 9){
//         appendTens.innerHTML = tens;
        
//       } 
      
//       if (tens > 99) {
//         //console.log("seconds");
//         seconds++;
//         appendSeconds.innerHTML = "0" + seconds;
//         tens = 0;
//         appendTens.innerHTML = "0" + 0;
//       }
      
//       if (seconds > 9){
//         appendSeconds.innerHTML = seconds;
//       }
//     //   console.log(seconds);
//     //   console.log(tens);

      
    
//     }
    
  
//   }


 $(function(){
    init();
 });