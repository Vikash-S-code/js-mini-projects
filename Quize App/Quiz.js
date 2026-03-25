const questions = [
  {
    question: "which is a larget animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Dog", correct: false },
    ],
  },
  {
    question: "which is a larget animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Dog", correct: false },
    ],
  },
  {
    question: "which is a larget Country in the world?",
    answers: [
      { text: "nepal", correct: false },
      { text: "India", correct: true },
      { text: "Bhootan", correct: false },
      { text: "Canada", correct: false },
    ],
  },
  {
    question: "which is a larget Country in the world?",
    answers: [
      { text: "nepal", correct: false },
      { text: "India", correct: true },
      { text: "Bhootan", correct: false },
      { text: "Canada", correct: false },
    ],
  },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuetionIndex=0;
let score=0;

function startquize(){
    currentQuetionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuetion();
}

function showQuetion(){

    resetState();


    let currentQuetion =questions[currentQuetionIndex];
    let questionNo=currentQuetionIndex+1;
    questionElement.innerHTML=questionNo+". " + currentQuetion.question;

    currentQuetion.answers.forEach(answer=>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
          button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
  const selectbtn=e.target;
  const iscorrect=selectbtn.dataset.correct==="true";

  if(iscorrect){
    selectbtn.classList.add("correct");
    score++;
  }
  else{
    selectbtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`Your scored ${score} out  of ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function HadleNextButton(){
  currentQuetionIndex++;
  if(currentQuetionIndex<questions.length){
    showQuetion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuetionIndex<questions.length){
    HadleNextButton();
  }else{
    startquize();
  }
})
startquize();