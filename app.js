let gameStarted = false;
let level = 0;
let highestScore = 0;

let gameQue = [];
let userQue = [];

let h2 = document.querySelector("h2");

function selectRandom(){
    let num = Math.floor(Math.random()*4) + 1;
    gameQue.push(num);
    console.log(gameQue);
    switch(num){
        case 1:
            return document.querySelector(".btn1");
        case 2:
            return document.querySelector(".btn2");
        case 3:
            return document.querySelector(".btn3");
        case 4:
            return document.querySelector(".btn4");
    }
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 225);
}
function levelUp(){
    userQue = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomBtn = selectRandom();
    btnFlash(randomBtn);
}

let body = document.querySelector("body");
body.addEventListener("keydown", function(){
    if(!gameStarted){
        gameStarted = true;
        levelUp();
    }
})

function resetGame(){
    gameStarted = false;
    gameQue = [];
    userQue = [];
    level = 0;
}
function gameOver(){
    highestScore = Math.max(highestScore, level-1);
    body.classList.add("gameOver");
    setTimeout(function(){
        body.classList.remove("gameOver");
    }, 100);
    h2.innerHTML = `Game Over! Your Score is <b>${level-1}</b>.<br/> Highest Score: ${highestScore}.<br/> Press any key to restart the game`;
    resetGame();
}
function checkAns(ind){
    if(userQue[ind] == gameQue[ind]){
        if(ind == level-1){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        gameOver();
    }
}
function btnPress(){
    if(!gameStarted) return;

    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userQue.push(userColor);
    checkAns(userQue.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}