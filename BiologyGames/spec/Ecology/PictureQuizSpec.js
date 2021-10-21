describe("EcologyPicQuiz", function() {
    beforeEach(function() {
        var quizQuestions = [
            {
              question: "Which of these is a heterotroph?",
              options: [{name:"heterotroph", image:"heterotroph.PNG"}, {name:"autotroph", image:"autotroph.PNG"},{name:"detrivore", image:"detrivore.PNG"}],
              answer: "heterotroph",
            },
            {
              question: "Which of these is fungi?",
              options: [{name:"fungi", image:"fungi.PNG"}, {name:"bacteria", image:"bacteria.PNG"},{name:"detrivore", image:"detrivore.PNG"}],
              answer: "fungi",
            },
            {
              question: "Which of these is omnivore?",
              options: [{name:"herbivore", image:"herbivore.PNG"}, {name:"omnivore", image:"omnivore.jpg"},{name:"carnivore", image:"carnivore.jpg"}],
              answer: "omnivore",
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
