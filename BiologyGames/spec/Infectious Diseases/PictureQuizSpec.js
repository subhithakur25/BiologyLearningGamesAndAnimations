describe("InfectiousDiseasesPicQuiz", function() {
    beforeEach(function() {
        var quizQuestions = [
            {
              question: "Which of these is measles?",
              options: [{name:"measles", image:"measles.PNG"}, {name:"small pox", image:"small pox.PNG"},{name:"rubella", image:"rubella.PNG"}],
              answer: "measles",
            },
            {
              question: "Which of these is polio?",
              options: [{name:"polio", image:"polio.PNG"}, {name:"pertussis", image:"pertussis.PNG"},{name:"mumps", image:"mumps.PNG"}],
              answer: "polio",
            },
            {
              question: "Which of these is tetanus?",
              options: [{name:"tetanus", image:"tetanus.PNG"}, {name:"cracked_heel", image:"cracked heel.jpg"},{name:"plantar_warts", image:"plantar warts.jpg"}],
              answer: "tetanus",
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
