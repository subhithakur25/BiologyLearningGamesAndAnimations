
// #####################################################################
// set your questions and the images (including extension) here
// Options format: [{name: "Answer key to be displayed (replace space with '_')", image: "Corresponding image name including extension (.jpg, .png etc)"]
// Only 3 options are allowed.'
// Any number of questions can be added.
// answer format: Same as name in one of the options.

// #####################################################################
var quizQuestions = [
  {
    question: "Which of these represent scientific method?",
    options: [{name:"data_analysis", image:"data_analysis.PNG"}, {name:"scientific_method", image:"scientific_method.PNG"},{name:"scientist_chatting", image:"scientist_chatting.PNG"}],
    answer: "scientific_method",
  },
  {
    question: "Which of these represent Observation?",
    options: [{name:"data_analysis", image:"data_analysis.PNG"}, {name:"questions_from_hypothesis", image:"questions_from_hypothesis.PNG"},{name:"observation", image:"observation.PNG"}],
    answer: "observation",
  },
  {
    question: "Which of these represent experimentation?",
    options: [{name:"experimentation", image:"experimentation.PNG"}, {name:"research", image:"research.PNG"},{name:"data_analysis", image:"data_analysis.PNG"}],
    answer: "experimentation",
  },
];
// #####################################################################
var imgWidth = "170px";
var imgHeight = "170px";
var questionNumber = 0;
var stage = "#currQuestion";
var stage2 = new Object();
var questionLock = false;
var score = 0;
var noOfQuestions;
var chances = 0;

/* Entry point of the js upon DOM loading */
$(document).ready(function () {
  console.log("json data has been loaded .....");
  console.log("Shuffle the quiz questions....");
  shuffleArray(quizQuestions);
  console.log("The quiz will start now....");
  displayQuestion(quizQuestions);
});

//score card
function handleQuizStatus() {
  $(".currQuizStatus").html(
    `<p class="status"><span>Question: </span>${
      questionNumber + 1
    } out of ${noOfQuestions}<br><span>Score: </span>${score} out of ${noOfQuestions}</p>`
  );
}

//display the question
function displayQuestion(questionBank) {
  chances = 0;
  noOfQuestions = questionBank.length;
  handleQuizStatus();
  shuffleArray(questionBank[questionNumber]);

  let q1 = questionBank[questionNumber].options[0];
  let q2 = questionBank[questionNumber].options[1];
  let q3 = questionBank[questionNumber].options[2];

  $(stage).append(
    '<div  class="question" id ="questionText">' +
      questionBank[questionNumber].question +
      '</div> <div class = "row"><div class="quizOptions"><div id=' +
      q1.name +
      ' class="options" ><img src="img/' +
      q1.image +
      `"width=${imgWidth} height=${imgHeight}>` +
      `</div><div id=`+
      q2.name +
      ' class="options"><img src="img/' +
      q2.image +
      `"width=${imgWidth} height=${imgHeight}>` +
      `</div> <div id=` +
      q3.name+
      ' class="options" ><img src="img/' +
      q3.image +
      `"width=${imgWidth} height=${imgHeight}></div></div></div>`
  );
  $(stage).append('<div id="feedback"></div>');
  $(stage).append('<div id="goToNextQuestion"></div>');

  $(".options").click(function () {
    console.log(chances);
    if (chances < 2) {
      chances++;

      console.log("you clicked: " + this.id);

      //correct answer
      if (this.id == questionBank[questionNumber].answer) {
        score++;
        handleQuizStatus();
        $("#" + this.id + ".options").addClass("right");
        $("#feedback").html('<div class="feedback1">CORRECT</div>');
        chances = 2;
      }

      //wrong answer
      if (this.id != questionBank[questionNumber].answer) {
        $("#" + this.id + ".options").addClass("wrong");
        $("#feedback").html(
          `<div class="feedback2">That was the ${this.id}.</div>`
        );
      }

      if (chances == 2) {
        addNextButton(noOfQuestions, questionBank);
      } else {
        $("#chancesModal .modal-body").html("You have one more chance left !!");
        $("#chancesModal").modal("show");
      }
    } else {
      addNextButton(noOfQuestions, questionBank);
      $("#chancesModal .modal-body").html(
        " You can't alter your answer now !!! <br> Please proceed to the next question when you are ready."
      );
      $("#chancesModal").modal("show");
    }
  });
}

/* adds the button moving to the next question */
function addNextButton(noOfQuestions, questionBank) {
  if (questionNumber == questionBank.length - 1){
    $("#goToNextQuestion").html(
      '<button type="button" id="next"> Finish Quiz >></button>'
    );
  }else{
    $("#goToNextQuestion").html(
      '<button type="button" id="next">Next Question >></button>'
    );
  }

  $("#next").click(function () {
    changeQuestion(noOfQuestions, questionBank);
  });
}

/* In charge of transition to the next question */
function changeQuestion(noOfQuestions, questionBank) {
  handleQuizStatus();
  questionNumber++;

  if (stage == "#currQuestion") {
    stage2 = "#currQuestion";
    stage = "#nextQuestion";
  } else {
    stage2 = "#nextQuestion";
    stage = "#currQuestion";
  }

  if (questionNumber < noOfQuestions) {
    displayQuestion(questionBank);
  } else {
    quizEnd(noOfQuestions);
  }

  $(stage2).animate({ right: "+=800px" }, "slow", function () {
    $(stage2).css("right", "-800px");
    $(stage2).empty();
  });

  $(stage).animate({ right: "+=800px" }, "slow", function () {
    chances = 0;
  });
}

/* last page of the quiz */
function quizEnd(noOfQuestions) {
  $(".currQuizStatus").remove();
  $(stage).append(
    '<div class="Quiz end" id ="questionText">You have reached the end of the quiz !!!!!<br><br>Questions encountered: ' +
      noOfQuestions +
      "<br>You got <b>" +
      score +
      "</b> correct.</div>"
  );
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
