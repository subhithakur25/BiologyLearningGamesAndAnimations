describe("ClinicalTrialsPicQuiz", function() {
    beforeEach(function() {
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
      });
    describe("When loading the questions", function() {
        console.log("loading questions");
        shuffleArray(quizQuestions);
        
        it("should be three questions", function() {
            expect(quizQuestions.length).toEqual(3);
            console.log("quizQuestions.length = ");
            console.log(quizQuestions.length);
        })
    });

});
