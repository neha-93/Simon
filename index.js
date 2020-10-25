

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var color = ["red", "blue", "green", "yellow"];

function playSound(sound){
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'sounds/'+ sound + '.mp3');
  audioElement.play();
}

function animation(key){
  $("#"+key).addClass('pressed');
  setTimeout(function(){
    $("#"+key).removeClass('pressed');
  }, 100);
}
var cnt = 0;
var clickCnt = 0;

$(document).keydown( function(){
  if(cnt === 0) nextSequence();
  cnt = 1;
});


function faliure(){
  console.log("wrong");
  userClickedPattern = [];
  gamePattern = [];
  $("h1").text("Game Over, Press any key to Restart.");
  cnt = 0;
  level = 0;
  clickCnt = 0;
  $("body").addClass("game-over");
  setTimeout( function(){
    $("body").removeClass("game-over");
  }, 300);
}


// if(gamePattern === userClickedPattern){
//   nextSequence();
// } else{
//   $("h1").text("Game Over, Press Any Key to Restart");
//   gamePattern = [];
//   userClickedPattern = [];
//   $("body").addClass("game-over");
//   setTimeout(function(){
//     $("body").removeClass("game-over");
//   },100);
// }

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      console.log("success");
      console.log(gamePattern);
      console.log(userClickedPattern);
      userClickedPattern = [];
      clickCnt = 0;
      setTimeout(function (){
        nextSequence();
      }, 1000);
    } else {
      console.log(currentLevel);
      console.log(gamePattern);
      console.log(userClickedPattern);
    }
  }
  else {
    console.log(currentLevel);
    console.log(clickCnt);
    console.log(gamePattern);
    console.log(userClickedPattern);
    playSound("wrong");
    faliure();
  }
}

function nextSequence() {

  $("h1").text("Level " + level);
  console.log(level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = color[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).delay(100).fadeOut().fadeIn("slow");
  playSound(randomColor);
}

$(".btn").click( function(){
  var userChosenId = this.id;
  userClickedPattern.push(userChosenId);
  playSound(userChosenId);
  animation(userChosenId);
  clickCnt++;
  checkAnswer(clickCnt-1);
});
