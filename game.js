var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

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

//detect when a keyboard key has been pressed for the first time
$("body").one("keypress", function() {
  nextSequence();
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log("userClickedPattern = "+userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var lastIndex = (userClickedPattern.length) - 1;
  checkAnswer(lastIndex);
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
    console.log("fail");
  }
}
