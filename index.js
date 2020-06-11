var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log("gamePattern = "+gamePattern);
  level++;
  $("#level-title").html("Level "+level);

  $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

function firstRound() {
  if (started === false) {
    started = true;
    nextSequence();
  }
}
//detect when a keyboard key or h1 element has been pressed for the first time
$("body").on("keypress", firstRound);
$("h1").on("click", firstRound);

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log("userClickedPattern = "+userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer((userClickedPattern.length) - 1);
});

function playSound(name) {
  var randomChosenSoundFile = "sounds/"+name+".mp3";
  var audio = new Audio(randomChosenSoundFile);
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over")}, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
