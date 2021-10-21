var maxScore = 4;
var minScore = 5;
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var anim_container= document.getElementById("road_id");
var battery_container= document.getElementById("battery_id");

const startButton = document.getElementById("start");
startButton.addEventListener("click", start);
const submitButton = document.getElementById("submit");
submitButton.style.display = "none";
anim_container.style.display="none";
battery_container.style.display="none";
submitButton.addEventListener("click", checkAnswer);


var questions = window.questions;
var questionIndex;

var yaySound = new Audio();
yaySound.src = "sound/correct_sound.mp3";

var noSound = new Audio();
noSound.src = "sound/incorrect_sound.mp3";

var winSound = new Audio();
winSound.src = "sound/Win.mp3";

var GameoverSound = new Audio();
GameoverSound.src = "sound/Gameover.mp3";



function start() {
  // update buttons and images
  document.getElementById("start").textContent = "New Game";
  startButton.style.display = "none";
  submitButton.style.display = "inline-block";
  questionDiv.style.display = "";
  choicesDiv.style.display = "";
  anim_container.style.display="";
  battery_container.style.display="";
  score = 0;
  n_score=0;
  anim_container.src = "img/score0.jpeg";
  battery_container.src = "img/battery0.jpeg";
  shuffle(questions);
  questionIndex = 0;

  displayQuestion();
}

function displayQuestion() {
  const choices = [];
  const currentQuestion = questions[questionIndex];

  // Shuffle answer choices without changing order of currentQuestion[choices]
  let choiceIndices = [...Array(currentQuestion.choices.length).keys()];
  shuffle(choiceIndices);

  // Add radio button for each answer choice
  for (let i = 0; i < choiceIndices.length; i++) {
    let choice = choiceIndices[i];
    choices.push(
      `<label>
        <input type="radio" name="question${questionIndex}" value="${choice}">
        ${String.fromCharCode('a'.charCodeAt(0)+i)}.
        ${currentQuestion.choices[choice]}
      </label>`
    );
  }

  questionDiv.textContent = `${currentQuestion.question}`;
  choicesDiv.innerHTML = `${choices.join("")}`;
}

// scores current question and then moves onto the next one or ends the game
function checkAnswer() {
  const currentQuestion = questions[questionIndex];
  const correctChoice = currentQuestion["choices"][0];
  const selector = document.querySelector(`input[name=question${questionIndex}]:checked`);
  let userAnswer = "";
  if (selector !== null)
    userAnswer = currentQuestion["choices"][selector.value];

  if (userAnswer === correctChoice) {
    swal("Correct!", `${currentQuestion.explanation}`, "success");
    score++;
	if(score != maxScore)
	  yaySound.play();
    movePlayerForward();
  } else {
    swal("Incorrect", `${currentQuestion.explanation}`, "warning");
    n_score++;
	if(n_score != minScore)
	  noSound.play();
    movePlayerBackward();
  }
  console.log(`Score is now ${score}`);

  if (score == maxScore) {
    winSound.play(); // terminate game upon reaching a certain score
    swal("Congratulations! \n you won! \n Try a new game again");
    endGame();
    return;
  }

  if (n_score == minScore) {
    GameoverSound.play();
    swal("Game Over! \n Try a new game");
    endGame();
    return;
  }

  questionIndex = (questionIndex + 1) % questions.length;
  displayQuestion();
}
//animation:move the player
function movePlayerForward(){
  if (score == 1){
    anim_container.src = "img/score1.jpeg"
  }
  else if( score==2){
    anim_container.src = "img/score2.jpeg"
  }
  else if( score==3){
      anim_container.src = "img/score3.jpeg"
  }
  else if( score==4){
      anim_container.src = "img/score4.jpeg"
  }

}
function movePlayerBackward(){
  if (n_score == 1){
        battery_container.src = "img/battery1.jpeg"
    }
    else if( n_score==2){
      battery_container.src = "img/battery2.jpeg"
    }
    else if( n_score==3){
        battery_container.src = "img/battery3.jpeg"
    }
    else if( n_score==4){
        battery_container.src = "img/battery4.jpeg"
    }
}


function endGame() {
  if (score == maxScore) {
    console.log("Game won!");

    // TODO: add win event/animation
  } else {
    console.log("Game lost.");
    // TODO: add lose event/animation
  }

  // update buttons
  document.getElementById("start").textContent = "New Game";
  startButton.style.display = "";
  submitButton.style.display = "none";
  anim_container.style.display="none";
  battery_container.style.display="none";
  score = 0;
  n_score=0;
  questionDiv.style.display = "none";
  choicesDiv.style.display = "none";
}

// helper to randomly permute an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
