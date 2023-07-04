// 유저가 번호 입력 후 go라는 버튼 누름
// 랜덤번호 지정
// 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유전번호 Down!
// 랜덤번호 > 유전번호 up!
// rest버튼을 누르면 게임 리셋
// 기회를 다 쓰면 게임이 끝남(더 이상 추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려주고, 기회를 깎지 않음
// 이미 입력한 숫자를 입력하면, 알려주고 기회를 깎지 않음

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value
    
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요";
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent= "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
        return;
    }

    chances--;
    chanceArea.textContent = `남은기회:${chances}번`
    console.log("chance",chances)

    if(userValue < computerNum){
        resultArea.textContent = "Up!!!";
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!!";
    }else{
        resultArea.textContent = "맞췄습니다!!";
        gameOver=true
    }

    history.push(userValue);

    if(chances < 1){
        gameOver = true
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    //user input창이 정리됨
    userInput.value = ""
    //새로운 번호 생성
    pickRandomNum();
    chances = 5;
    chanceArea.textContent = `남은기회 : ${chances} 번`
    history = [];
    resultArea.textContent = "결과값이 여기 나옵니다";
}

pickRandomNum();