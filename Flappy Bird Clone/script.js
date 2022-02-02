var pipeSpace = document.getElementById("pipe-space");
var pipe = document.getElementById("pipe");
var character = document.getElementById("character");


/* Is creating pipescpace while animation is iteragin */
var createRandomWhitespace = ()=>{
    pipe.style.animation = "pipeMovement 2s infinite linear";
    pipeSpace.style.animation = "pipeMovement 2s infinite linear";
    window.addEventListener("animationiteration",()=>{
        var spaceY = Math.round((Math.random()*300)+100);
        pipeSpace.style.top = spaceY + "px";
    });
}
var gravityInterval;
var start = document.getElementById("start");/* Start div  */
var finish = document.getElementById("finish");/* Finish div */
var gameFinishScore = document.getElementById("game-finish-score");
var bestGameFinishScore = document.getElementById("best-game-finish-score");
/* when calls this function game will stop */
var stopGame = ()=>{
    clearInterval(gravityInterval);
    pipe.style.animationPlayState = "paused";
    pipeSpace.style.animationPlayState = "paused";
    finish.style.display = "block";
    gameFinishScore.innerText = "Score : " + score;
    bestGameFinishScore.innerText = "Best Score : " + localStorage.getItem("bestScore");
    gameFinishScore.style.display = "block";
    bestGameFinishScore.style.display = "block";
}
/* Start function */
var startGame = ()=>{
    
    score = 0;
    pipe.style.left = "600px";
    pipeSpace.style.left = "600px";
    pipeSpace.style.top = "200px";
    scoreDiv.innerText = score;
    crash();
    isCrashed = false;
    character.style.top = "200px";
    gravity();
    finish.style.display = "none";
    gameFinishScore.style.display = "none";
    bestGameFinishScore.style.display = "none";
    pipe.style.animationPlayState = "running";
    pipeSpace.style.animationPlayState = "running";

}
/* Gives gravity to character */
var gravity = ()=>{
    clearInterval(gravityInterval);
    gravityInterval = setInterval(()=>{
        var characterTop = character.getBoundingClientRect().top;
        character.style.top = (characterTop + 0.6) + "px";
        crash();
    },17);
}
/* Game is starting when player click a start div */
start.addEventListener("click",()=>{
    startGame();
    start.style.display = "none";
    createRandomWhitespace();
    gravity();
    scoreDiv.style.display = "block";
    isCrashed = false;
});


/* Bird crash function */
var isCrashed = true;
var crash = ()=>{
    var characterWidth = character.getBoundingClientRect().width;
    var characterHeight = character.getBoundingClientRect().height;
    var characterLeft = character.getBoundingClientRect().left;
    var characterRight = character.getBoundingClientRect().left + characterWidth;
    var characterTop = character.getBoundingClientRect().top;
    var characterDown = character.getBoundingClientRect().top + characterHeight;

    var pipeWidth = pipeSpace.getBoundingClientRect().width;
    var pipeHeight = pipeSpace.getBoundingClientRect().height;
    var pipeSpaceLeft = pipeSpace.getBoundingClientRect().left;
    var pipeSpaceRight = pipeSpace.getBoundingClientRect().left + pipeWidth;
    var pipeSpaceTop = pipeSpace.getBoundingClientRect().top;
    var pipeSpaceDown = pipeSpace.getBoundingClientRect().top + pipeHeight;

    if(characterRight > pipeSpaceLeft && characterTop < pipeSpaceTop || characterRight > pipeSpaceLeft && characterDown > pipeSpaceDown){
        stopGame();
        isCrashed = true;
    }
    if(character.getBoundingClientRect().top > 700){
        console.log("Game is stopped");
        stopGame();
        isCrashed = true;
    }
    if(character.getBoundingClientRect().top < pipe.getBoundingClientRect().top){
        isCrashed = true;
        stopGame();
    }
}

/* Jumping when player click a random button from keyboard*/
var jumpingInterval;
var jump = ()=>{
    
    window.addEventListener("keydown",()=>{
        if(isCrashed == false){
            var characterChange = 0;
            clearInterval(gravityInterval);
            jumpingInterval = setInterval(()=>{
                
                var characterTopPos = character.getBoundingClientRect().top;
                character.style.top = (characterTopPos - 15) + "px";
                characterChange += 15;
                if(characterChange > 300){
                    clearInterval(jumpingInterval);
                    characterChange = 0;
                }
                crash();
            },6);
            gravity();
        }
       
    });
}
jump();

/* Game Score  */
var score = 0;
var scoreInterval;
var scoreDiv = document.getElementById("score");
var scoreFun = ()=>{
    scoreInterval = setInterval(()=>{
        if(isCrashed == false && character.getBoundingClientRect().left + character.getBoundingClientRect().width >= pipeSpace.getBoundingClientRect().left){
            score++;
            console.log(score);
            if(score > localStorage.getItem("bestScore")){
                localStorage.setItem("bestScore",score); 
            }
            scoreDiv.innerText = score;
        }
    },300);
}
scoreFun();
/* Game is restarting with this function */
var restartGame = document.getElementById("restart-game");
restartGame.addEventListener("click",()=>{
    startGame();
});