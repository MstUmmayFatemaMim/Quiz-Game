// //DOM elements
const startScreen=document.getElementById("start-screen");
const quizScreen=document.getElementById("quiz-screen");
const resultScreen=document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const questionText=document.getElementById("question-text");
const answersContainer=document.getElementById("answers-container");
const currentQuestionSpan=document.getElementById("current-question");
const totalQuestionSpan=document.getElementById("total-questions");
const scoreSpan=document.getElementById("score");
const finalScoreSpan=document.getElementById("final-score");
const maxScoreSpan=document.getElementById("max-score");
const resultMessage=document.getElementById("result-message");
const resultButton=document.getElementById("restart-btn");
const progressBar=document.getElementById("progress");

const quizQuestions = [
    {
        question:"What is the capital of France?",
        answers:[
            { text:"London",correct:false },
            { text:"Berlin",correct:false },
            { text:"Paris",correct:true },
            { text:"Madrid",correct:false },
        ],
    },

    {
        question:"Which planet is known as the Red planet?",
        answers:[
            { text:"Venus",correct:false },
            { text:"Mars",correct:true },
            { text:"Sat",correct:false },
            { text:"Sun",correct:false },
        ],
    },

    {
        question:"What is the capital of Bangladesh?",
        answers:[
            { text:"Dhaka",correct:true },
            { text:"London",correct:false },
            { text:"Berlin",correct:false },
            { text:"Madrid",correct:false },
        ],
    },

    {
        question:"What is the capital of Nepal?",
        answers:[
            { text:"London",correct:false },
            { text:"Berlin",correct:false },
            { text:"Kathmundu",correct:true },
            { text:"Madrid",correct:false },
        ],
    }
];

///Quiz state vars
let currentQuestionIndex = 0;
let score=0;
let answerDisabled=false
totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

// //event listeners
startButton.addEventListener("click",startQuiz)

function startQuiz(){
    //reset vars
    currentQuestionIndex=0;
    score = 0;
    scoreSpan.textContent=0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    //reset state
    answerDisabled=false
    const currentQuestion=quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent=currentQuestionIndex+1

    const progressPercent = ((currentQuestionIndex+1) / quizQuestions.length) * 100;
    progressBar.style.width=progressPercent + "%"

    questionText.textContent=currentQuestion.question

    // todo: explain this in a second
    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answers-btn");

        //WHAT IS DATASET? It's a property of the button element that allows you to store cutom data
        button.dataset.correct = answer.correct;
        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    //optimization check
    if(answerDisabled) return;

    answerDisabled=true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct ==="true";

    ///todo: explain this in a sec
    // Here Array.from() is used to convert the NodeList returned
    //  by answersContainer.children into an Array, this is because the NodeList is 
    // not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }else if(button===selectedButton){
            button.classList.add("incorrect");
        }
    });
    if(isCorrect){
        score++;
        scoreSpan.textContent=score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            ///check if there are more questions or if the quiz is over
            showQuestion()
        }else{
            showResults()
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")
    finalScoreSpan.textContent=score;
    const percentage=(score/quizQuestions.length)*100

    if(percentage === 100){
        resultMessage.textContent="Perfect! You are a genius!";
    } else if(percentage >= 80){
        resultMessage.textContent="Great job! You know your stuff!";
    } else if(percentage >= s60){
        resultMessage.textContent="Good effort! Keep learning!"
    } else if(percentage >= 40){
        resultMessage.textContent="Not bad! Try again to improve!"
    } else{
        resultMessage.textContent="Keep studying! You will get better!"
    }

}

resultButton.addEventListener("click", restartQuiz);

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}