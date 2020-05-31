// array of all possible colors
var arrayOfColors = ["green", "red", "cyan", "magenta", "yellow", "blue", "purple", "orange"];

// pattern for the random colors picked and the user clicked colors;
var arrayGamePattern = [];
var userClickedPattern = [];

// track whether the game has started, users current level and their highest score until they refresh
var started = false;
var level = 0;
var highScore = 0;


// jQuery used to add an event listener to the btn class to know what color the user clicks on


// on keydown the game starts if the game is not started
$(document).keydown(function () {


    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// when the user clicks a button it will animate it, play a sound wrt the color, checks if the user's pattern is correct
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    showHighScore();
});



// Animates the buttons when the user clicks a button by add ccs class"press" then removing it after 1 second
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// used to play a sound when the name of the color is passed
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

// randomly decides what the next color the user should follow
function nextSequence() {
    var randomNumberChosen = Math.floor(Math.random() * 8) ;
    var randomColorChosen = arrayOfColors[randomNumberChosen];

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);


    arrayGamePattern.push(randomColorChosen);

    //$("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    //playSound(randomColorChosen);
    console.log(arrayGamePattern);
    console.log("this is the random number: " + randomNumberChosen);
    animatePattern();

}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == arrayGamePattern[currentLevel]){

        if(userClickedPattern.length == arrayGamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 750);
        }
    }else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).onkeydown(startOver());
    }
}

// once the game is over you can start over by pressing any key since it sets started = false
function startOver() {
    level = 0;
    arrayGamePattern = [];
    started = false;
}

// animates the pattern of colors that the user is supposed to follow
function animatePattern() {
    $.each(arrayGamePattern, function (i, color) {
        setTimeout(function () {
            $(arrayGamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(arrayGamePattern[i]);
            animatePress(color);
        }, i * 500);
    });

}

// displays the top score to the user until the page is refreshed
function showHighScore() {
    if(level > highScore){
        highScore = level;
        $("#high-score").text("High Score: " + level);
    }else{
        return;
    }
}