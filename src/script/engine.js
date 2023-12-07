const state = {
    view:
    {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),

    },
    values:
    {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTIme: 60,
        totalLife: 4,

    },
};
function DestroyLife()
{
    state.view.life.textContent = state.values.totalLife;
}
function countDown()
{
    state.values.curretTIme--;
    state.view.timeLeft.textContent = state.values.curretTIme;
    if(state.values.curretTIme <= 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        playSound("GameOver");
        alert("O tempo Acabou! sua pontuação foi: " + state.values.result);
        
    }
}

function playSound(NameAudio){
    let audio = new Audio(`./src/sounds/${NameAudio}.m4a`);
    audio.volume = 0.5;
    audio.play();
}

function randomSquare()
{
state.view.squares.forEach((square)=>{

    square.classList.remove("enemy");
});

let randomNumber = Math.floor(Math.random() * 9);
let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox()
{
state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", ()=>
    {
        if(square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }
       
    })
})
}


function main()
{
    DestroyLife();
    moveEnemy();
    addListenerHitBox();
}

main();