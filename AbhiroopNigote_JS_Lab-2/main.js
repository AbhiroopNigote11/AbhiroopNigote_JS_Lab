var questions_data = [
   {
        question:"Which is the smallest County?",
        answerOptions:[
            { 
                optionName:"a",
                value:"INDIA"
            },
            { 
                optionName:"b",
                value:"CHINA"
            },
            { 
                optionName:"c",
                value:"SRI LANKA"
            },
            { 
                optionName:"d",
                value:"VATICAN CITY"
            }
        ],
        answer:"d"
   },
   {
        question:"Which is the Largest Counrty of world?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Russia"
            },
            { 
                optionName:"b",
                value:"China"
            },
            { 
                optionName:"c",
                value:"USA"
            },
            { 
                optionName:"d",
                value:"Africa"
            }
        ],
        answer:"a"
    },
    {
        question:"Which is the most populated country of world?",
        answerOptions:[
            { 
                optionName:"a",
                value:"U.S.A"
            },
            { 
                optionName:"b",
                value:"INDIA"
            },
            { 
                optionName:"c",
                value:"UK"
            },
            { 
                optionName:"d",
                value:"CHINA"
            }
        ],
        answer:"d"
    },
    {
        question:"Which is has Largest G.D.P in world?",
        answerOptions:[
            { 
                optionName:"a",
                value:"U.S.A"
            },
            { 
                optionName:"b",
                value:"CHINA"
            },
            { 
                optionName:"c",
                value:"INDIA"
            },
            { 
                optionName:"d",
                value:"NONE"
            }
        ],
        answer:"a"
    },
    {
        question:"Which Country is known as Bharat?",
        answerOptions:[
            { 
                optionName:"a",
                value:"INDIA"
            },
            { 
                optionName:"b",
                value:"RUSSIA"
            },
            { 
                optionName:"c",
                value:"U.K"
            },
            { 
                optionName:"d",
                value:"SOUTH AMERICA"
            }
        ],
        answer:"a"
    }
];

let score = 0;
let question_index = 0;
let quizCompleted = false;

function getQuestionByIndex () {
    return questions_data[question_index];
}

function loadQuestion() {
   
    updateQuestionsCompletionCount();

    let question = getQuestionByIndex();
    
    document.getElementById("question").innerText = question.question;

    question.answerOptions.forEach((item) => {
        document.getElementsByName(item.optionName)[0].innerText = item.value;
    });
}

function updateQuestionsCompletionCount() {
    if(question_index < questions_data.length) {
        document.getElementById("questions-stat").innerText = question_index + " of " + questions_data.length;
    }
}


function goToNextQuestion() {
   
    question_index++;
    if(question_index >= questions_data.length) {
        quizCompleted = true;
        onQuizCompleted();
    }
    else {
        loadQuestion();
    }
}

function validateAnser(selectedAnswerOption) { 
    let question = getQuestionByIndex();
    if(question.answer === selectedAnswerOption) {
        score++;
    }
}

function questionAnswered(event) {
    var selectedElement =  event.target;

    console.log(selectedElement.attributes["name"].value);
    validateAnser(selectedElement.attributes["name"].value);
    goToNextQuestion(event.target);
}

function onQuizCompleted() {
    removeEventListenres();
    showQuizScoreCard();
}

function displayStatusByScore() {
    switch(score) {
        case 5: {
            document.getElementById("quiz-result").innerText = "Excellent!";
        }
        break;
        case 4:
            {
                document.getElementById("quiz-result").innerText = "Very Good!"
            }
            break;
        case 3:
            {
                document.getElementById("quiz-result").innerText = "Good!"
            }
            break;
        case 2:
            {
                document.getElementById("quiz-result").innerText = "Need improvement!";
                document.getElementById("quiz-result").style.color = "red";
            }break;
        default:
            {
                document.getElementById("quiz-result").innerText = "Poor!";
                document.getElementById("quiz-result").style.color = "red";
            }break;
    }
}


function showQuizScoreCard() {
   document.getElementById("quiz-card-container").remove();
   document.getElementById("quiz-result-container").style.visibility = "visible";

   displayStatusByScore();
   document.getElementById("quiz-score").innerText = " Your score is  " +score+" and overall percentage is " + ((score/questions_data.length)*100)+"%";
}


function addEventListenres() {
    Array.from(document.querySelectorAll(".answer-item p")).forEach((element) => {
        element.addEventListener("click", questionAnswered);
    });
}

function removeEventListenres() {
    Array.from(document.querySelectorAll(".answer-item p")).forEach((element) => {
        element.removeEventListener("click", questionAnswered);
    });
}

function startQuiz() {

    document.getElementById("quiz-result-container").style.visibility = "hidden";

    addEventListenres();
    loadQuestion();
}




