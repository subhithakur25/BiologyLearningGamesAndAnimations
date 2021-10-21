function setUpHTMLFixture() {
  setFixtures('<body>'+
              '<div class ="container">'+
                '<div id="banner">Picture Quiz</div>'+
                '<div class="spacer"></div>'+
                '<div class="currQuizStatus" id ="currQuizStatusText"></div>'+
                '<div class="spacer2"></div>'+
                '<div id="navContent">'+
                '<div id="currQuestion"></div>'+
                '<div id="nextQuestion"></div>'+
                '<!-- The Modal -->'+
                '<div class="modal" id="chancesModal">'+
                '<div class="modal-dialog">'+
                      '<div class="modal-content">'+
                          '<!-- Modal Header -->'+
                          '<div class="modal-header">'+
                              '<h4 class="modal-title">Message from the Quiz Master</h4>'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                          '</div>'+
                          '<!-- Modal body -->'+
                          '<div class="modal-body"></div>'+
                          '<!-- Modal footer -->'+
                          '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
              '</div>'+
          '</div>'+
  '</div>'+
      '</body>');
  
};

describe("CellBiologyPicQuiz", function() {
    beforeEach(function() {
        setUpHTMLFixture();
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
        const imgWidth = "170px";
        const imgHeight = "170px";
        let questionNumber = 0;
        var stage = "#currQuestion";
        var stage2 = new Object();
        var questionLock = false;
        var score = 0;
        let noOfQuestions;
        let chances = 0;
        console.log("json data has been loaded .....");
        console.log("Shuffle the quiz questions....");
        shuffleArray(quizQuestions);
        console.log("The quiz will start now....");
        displayQuestion(quizQuestions);
      });
    describe("When loading the questions", function() {
        
        it("should be three questions", function() {
            expect(quizQuestions.length).toEqual(3);
            console.log("quizQuestions.length = ");
            console.log(quizQuestions.length);
        })
    });
    describe("When clicking the option", function(){
      let answers = ["scientific_method", "observation", "experimentation"];
      var answer_tmp;
      it("should add 1 to chances", function() {
        for(var i=0; i < $(".options").length; i++) {
          if(answers.includes($(".options")[i].id)) {
            answer_tmp = $(".options")[i];
          }
        }
        
        spyEvent = spyOnEvent(answer_tmp, 'click');
        $(answer_tmp).trigger("click");
        expect('click').toHaveBeenTriggeredOn(answer_tmp);
        expect(spyEvent).toHaveBeenTriggered();
        expect(chances).toEqual(2);
      })
    });
});