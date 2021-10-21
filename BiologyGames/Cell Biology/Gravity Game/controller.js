var difficultyLevel = [0.0001, 0.0005, 0.001];
var questions = [];
var questionIdx = 0;
var imgWidth = "170px";
var imgHeight = "170px";
var questionNumber = 0;
var stage = "#currQuestion";
var stage2 = new Object();
var questionLock = false;
var score = 0;
var noOfQuestions;
var chances = 0;
var gravity = 0;

function setGravity(val) {
  gravity = val;
}

function setEasyMode() {
  setGravity(difficultyLevel[0]);
}

function setMediumMode() {
  setGravity(difficultyLevel[1]);
}

function setHardMode() {
  setGravity(difficultyLevel[2]);
}

function hideSubmissionButton() {
  var submissionButton = document.getElementById("submission");
  if (submissionButton) {
    submissionButton.style.visibility = "hidden";
  }
}

function showSubmissionButton() {
  var submissionButton = document.getElementById("submission");
  if (submissionButton) {
    submissionButton.style.visibility = "visible";
  }
}

/* Entry point of the js upon DOM loading */
$(document).ready(function () {
  // alert(gravity);
  startGame();
  // shuffleArray(questions);
  displayQuestion();
});


function startGame() {
    myGamePiece = new component(100, 30, "red", 180, 75);
    questions = data;
    myGameArea.start();
    //getNextQuestion();
    //setUpBtnListeners();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.yOrigin=y;
    this.xOrigin=x;   
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = gravity;
    this.gravitySpeed = 0;
    this.timeup = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    //Sends notification when time is up
    this.timer = function(){
        var rockbottom = myGameArea.canvas.height - this.height;
        if(this.y >= rockbottom && this.timeup===false){
            this.y = rockbottom;
            alert("timeup")
            this.timeup=true;
            // handleQuizStatus();
            hideSubmissionButton();
            addNextButton(noOfQuestions, questions);
            handleQuizStatus();
            // resetGameArea();
        }
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.timer();
    }
    this.resetPos=function(){
        this.y=this.yOrigin;
        this.timeup= false;
        this.gravitySpeed=0;
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}
function resetGameArea(){
    myGameArea.clear();
    myGamePiece.resetPos();
    myGamePiece.update();
}



//score card
function handleQuizStatus() {
  $(".currQuizStatus").html(
    `<p class="status"><span>Question: </span>${
      questionNumber + 1
    } out of ${noOfQuestions}<br><span>Score: </span>${score} out of ${noOfQuestions}</p>`
  );
}

//display the question
function displayQuestion() {
  showSubmissionButton();
  chances = 0;
  noOfQuestions = questions.length;
  handleQuizStatus();
  $(stage).append(
    '<div class="question" id ="questionText">' +
      questions[questionNumber].question +
      '</div>' + '<div class = "wordbox">' + 
      '<div> <input class="charbox" id="answer" type="text" height="20" width="80" maxlength="30"  placeholder="Your Answer" >' + 
      '<button type="button" id="submission" height="20" class="options">Submit</button>' + 
      '</div></div>'
  );

  $(stage).append('<div id="feedback"></div>');
  $(stage).append('<div id="goToNextQuestion"></div>');

  $(".options").click(function () {
    var x = document.getElementById("answer").value;
    if (true) {
      //correct answer
      if (x.toLowerCase() == questions[questionNumber].answer.toLowerCase()) {
        score++;
        hideSubmissionButton();
        
        // $("#" + this.id + ".options").addClass("right");
        //alert("Correct answer, you earned 1 point.")
        $("#feedback").html('<div class="feedback1">Correct Answer</div>');
      } else {
        // $("#" + this.id + ".options").addClass("wrong");
        // alert("Wrong answer.")
        $("#feedback").html('<div class="feedback2">Wrong Answer</div>');
      }
      handleQuizStatus();
      addNextButton(noOfQuestions, questions);
    } 
  });
}

/* adds the button moving to the next question */
function addNextButton(noOfQuestions, questions) {
  if (questionNumber == questions.length - 1){
    $("#goToNextQuestion").html(
      '<button type="button" id="next"> Finish Quiz >></button>'
    );
  }else{
    $("#goToNextQuestion").html(
      '<button type="button" id="next">Next Question >></button>'
    );
  }

  $("#next").click(function () {
    resetGameArea();
    changeQuestion(noOfQuestions, questions);
    
  });
}

/* In charge of transition to the next question */
function changeQuestion(noOfQuestions, questions) {
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
    displayQuestion();
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}