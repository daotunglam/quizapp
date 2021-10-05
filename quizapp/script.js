/**
 * Some problems in this app I've found their solutions:
 * - How to calculate wrongAnswers when we don't answer and just click nextButton (solved)
 * - style of nextButton doens't change after click (sovled)
 * - How to disable a function that's not inside button (solved: addEventListener)
 */




let questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        answers: [
            "&ltscripting&gt",
            "&ltjs&gt",
            "&ltjavascript&gt",
            "&ltscript&gt",
        ],
        right_answer: 3,
    },
    {
        question: "Where is the correct place to insert a Javascript?",
        answers: [
            "Both the &lthead&gt section and the &ltbody&gt section are correct",
            "The &lthead&gt section",
            "The &ltbody&gt section",
            "The &ltfooter&gt section",
        ],
        right_answer: 0,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            'alert("Hello World")',
            'alertBox("Hello World")',
            'msgBox("Hello World")',
            'msg("Hello World")',
        ],
        right_answer: 0,
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            'function = myFunction()',
            'function myFunction()',
            'function: myFunction()',
        ],
        right_answer: 1,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [
            'if i==5 then',
            'if i=5 then',
            'if(i==5)',
            'if i=5',
        ],
        right_answer: 2,
    },
]

let qI = 0; //questionIndex
let aI = 0; //answerIndex
let chooseCorrect = 0; //Number of time an answer is chosen correctly
let chooseFalse = 0; //Number of time an answer is chosen wrongly
let correctAnswers = 0;
let wrongAnswers = 0;



/**
 * START SITE
 */

function loadStartSite(){
    document.getElementById('game_start_site').style.display = "block";
    document.getElementById('game_playing_site').style.display = "none";
}



/**
 * PLAYING SITE
 */

function loadPlayingSite() {
    document.getElementById('game_start_site').style.display = "none";
    document.getElementById('game_playing_site').style.display = "block";
    loadProgressBar();
    loadQuestionContainer();
}

function loadProgressBar() {
    let ratioDistanceFromStart = Math.round((qI + 1) / questions.length *100);
    document.getElementById('progress_bar').innerHTML = `
        <div class="progress-bar" role="progressbar" style="width: ${ratioDistanceFromStart}%;" aria-valuenow="${ratioDistanceFromStart}" aria-valuemin="0" aria-valuemax="100">
            ${qI + 1} / ${questions.length}
        </div>
    `;
}

function loadQuestionContainer() {
    document.getElementById('question_container').innerHTML = `
            <h5 class="card-title">${questions[qI].question}</h5>
            <div id="answers" class="answers"></div>
        `;
    loadAnswers();
    loadStackedBar(); //loadStackedBar must be here, after Question loaded
}

function loadAnswers(){
    document.getElementById('answers').innerHTML = ``;
    for(let aI=0; aI< questions[qI].answers.length; aI++){
        document.getElementById('answers').innerHTML += `
            <div onclick="chooseAnswer(${aI}, this)" class="answer card mb-2">
                <div class="card-body">
                    ${questions[qI].answers[aI]}
                </div>
            </div>
        `;
    }
}

function chooseAnswer(aI, x){
    if(aI == questions[qI].right_answer){
        x.classList.add('bg-success');
        document.getElementById('card_header').innerHTML = `<i><b>MOVE FORWARD!</b></i>`;
        disableAnswers(aI);
        chooseCorrect = 1;
        correctAnswers++;
    }else{
        x.classList.add('bg-danger');
        document.getElementById('card_header').innerHTML = `<i><b>TRY </br> ONCE MORE?</b></i>`;
        document.getElementById('card_header').style.animation = 'quickPump 0.1s 3';
        chooseFalse++;
        disableAnswers(aI);
        if(chooseFalse == 2){wrongAnswers++;} //when in an answer chosing wrong 2 times, wrongAnswer is substracted one
    }
    document.getElementById('next_btn').style = 'background-color:blue; color:white';
    loadStackedBar();
}

function disableAnswers(aI){
    if(aI == questions[qI].right_answer){
        document.getElementById('answers').innerHTML += `<img id="coverToDisable" class="coverToDisable" src="img/ok.jpg">`;
    }else{
        if(chooseFalse == 2){
            document.getElementById('card_header').innerHTML = `<i><b>CHOOSE </br> MAX 2 TIMES</b></i>`;
            document.getElementById('answers').innerHTML += `<img id="coverToDisable" class="coverToDisable" src="img/wrong.jpg">`;
        }
    }
}


function callBackCardImgTop(){
    document.getElementById('card_header').innerHTML = `<img class="card-img-top" src="img/card-img-top.png" alt="Card image cap">`;
}

function nextQuestion(){
    if(chooseCorrect == 0 && chooseFalse != 2){wrongAnswers++}; //when not chosing and just click next, 1 wrongAnswer is subtracted one
    qI ++;
    chooseCorrect = 0;
    chooseFalse = 0;
    if(qI < questions.length){
        callBackCardImgTop();
        loadProgressBar();
        loadQuestionContainer();
        loadStackedBar();
        document.getElementById('next_btn').style = '';
    }else{
        loadGameEndSite();
    }
}

function loadStackedBar(){
    let ratioCorrectAnswers = Math.round(correctAnswers / questions.length *100);
    let ratioWrongAnswers = Math.round(wrongAnswers / questions.length *100);
    document.getElementById('stackedBar').innerHTML = ``;
    document.getElementById('stackedBar').innerHTML = `
        <div class="progress-bar bg-success" role="progressbar" style="width: ${ratioCorrectAnswers}%" aria-valuenow="${ratioCorrectAnswers}"
        aria-valuemin="0" aria-valuemax="100">${ratioCorrectAnswers}%</div>
        <div class="progress-bar bg-danger" role="progressbar" style="width: ${ratioWrongAnswers}%" aria-valuenow="${ratioWrongAnswers}"
        aria-valuemin="0" aria-valuemax="100">${ratioWrongAnswers}%</div>
    `;
}



/**
 * GAME END
 */

function loadGameEndSite(){
    document.getElementById('game_start_site').style.display = 'none';
    document.getElementById('game_playing_site').style.display = 'none';
    document.getElementById('game_end_site').style = '';
    if(Math.round(correctAnswers / questions.length *100) >= 80){
        document.getElementById('game_end_site').innerHTML = `
            <img id="medal" src="img/medal-1.png">
            <h2 id="notice">CONGRATULATION</h2>
            <button id="restart_game" type="button" class="btn btn-warning" onclick="restartGame()">RESTART GAME</button>
        `;
    }else
    if(Math.round(correctAnswers / questions.length *100) >= 50){
        document.getElementById('game_end_site').innerHTML = `
            <img id="medal" src="img/medal-2.png">
            <h2 id="notice">CONGRATULATION</h2>
            <button id="restart_game" type="button" class="btn btn-warning" onclick="restartGame()">RESTART GAME</button>
        `;
    }else
    if(Math.round(correctAnswers / questions.length *100) >= 30){
        document.getElementById('game_end_site').innerHTML = `
            <img id="medal" src="img/medal-3.png">
            <h2 id="notice">LEARN A BIT MORE</h2>
            <button id="restart_game" type="button" class="btn btn-warning" onclick="restartGame()">RESTART GAME</button>
        `;
    }else{
        document.getElementById('game_end_site').innerHTML = `
            <img id="medal" src="img/medal-4.png">
            <h2 id="notice">LEARN MORE PLEASE</h2>
            <button id="restart_game" type="button" class="btn btn-warning" onclick="restartGame()">RESTART</button>
        `;
    }
}

function restartGame(){
    document.getElementById('game_end_site').style = 'display: none;';
    callBackCardImgTop();
    qI = 0;
    aI = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    loadPlayingSite();
}