const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
   restartQuiz(); 
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
   nextBtn.classList.remove('active');
   resultBox.classList.remove('active');
 
    restartQuiz(); 
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

const optionList = document.querySelector('.option-list');


function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb} .${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();

       
        setTimeout(() => {
            if (questionCount < questions.length - 1) {
                questionCount++;
                questionNumb++;
                showQuestions(questionCount);
                questionCounter(questionNumb);
            } else {
                showResultBox(); 
            }
        }, 1000); 
    }
    else {
        answer.classList.add('incorrect');

        setTimeout(() => {
            restartQuiz();
        }, 1000); 
    }


    for  (let i = 0; i < allOptions; i++)  {
        optionList.children[i].classList.add('disabled');
    }
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} de ${questions.length} Questões`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = Math.round((userScore / questions.length) * 100);
    let speed = 20;

    let progress = setInterval(() =>{
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#21aca0 ${progressStartValue * 3.6}deg, #404d4b 0deg)` ;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}


function restartQuiz() {
    // Função para reiniciar o quiz
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
   
    alert("Para jogar, insira seu nome! :)")

    let nomeUser = prompt("Digite seu nome:");
    while (nomeUser.length < 3) {
        nomeUser = prompt("Erro. Insira seu nome:");
    }
    alert("Boas vindas " + nomeUser + " :)");