
var buttonColours =["red","blue","green","yellow"];

var userClickedPattern=[];

var gamePattern = [];

var level=0;

// Action to be taken when first keypress is observed

$(document).one("keydown",function(){
$("#level-title").text("Level "+level);
nextSequence();
});

// Action taken when a click is observed

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Function to check answer

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    var sound= new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Function to re-start the game

function startOver(){
  level=0;
  gamePattern=[];
  $(document).one("keydown",function(){
  $("#level-title").text("Level "+level);
  nextSequence();
  });
}

function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

// Function to play sound

function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Function to play animation

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);
}
