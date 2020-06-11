var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

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
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
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

function checkAnswer(currentLevel) {
  
}
