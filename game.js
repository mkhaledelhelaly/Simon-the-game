gamePattern = [];
userClickedPattern = [];

buttonColors = ["red", "blue" , "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keydown",function(){
    
    if(started == false){
        $("h1").text("Level " + level);
        nextSequence(); 
        started = true; 
    }
    
    
});

$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    level++;
    $("h1").text("Level "+ level);
   


    $("#"+ randomColor).fadeOut(200).fadeIn(200);
    makeSound(randomColor);
    

}

function makeSound(colorName){
    var audio = new Audio("./sounds/"+ colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    //$("#" + currentColor).removeClass("pressed", 200);
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 200);
    
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("right");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 2000);
        }
        
    }
    else{
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 300);
        $("h1").text("Game Over, Press any key to restart")
        startOver();
    }



}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}