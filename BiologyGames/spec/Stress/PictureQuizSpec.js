describe("StressPicQuiz", function() {
    beforeEach(function() {
        var quizQuestions = [
            {
              question: "Which of these is neuron?",
              options: [{name:"neuron", image:"neuron.PNG"}, {name:"ear", image:"ear.PNG"},{name:"rna", image:"rna.PNG"}],
              answer: "neuron",
            },
            {
              question: "Which of these is vertebrae?",
              options: [{name:"vertebrae", image:"vertebrae.PNG"}, {name:"spinal cord", image:"spinal cord.PNG"},{name:"brain", image:"brain.PNG"}],
              answer: "vertebrae",
            },
            {
              question: "Which of these represent peripheral nerves?",
              options: [{name:"peripheral_nerves", image:"peripheral nerves.PNG"}, {name:"rna", image:"rna.PNG"},{name:"brain", image:"brain.PNG"}],
              answer: "peripheral_nerves",
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
