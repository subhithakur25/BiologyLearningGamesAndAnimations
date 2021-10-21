/* IF LOST READ THIS
 *
 * THIS FILE ENUMERATES TESTS FOR THE Quiz Game
 */
 
 var began = require('./quizGame/js/script.js').start;
describe("quizGame",function(){
	xdescribe("when player starts quiz", function(){
		it("should be able to answer quiz",function(){
			expect(true).toBe(true);
		});
	});
	describe("after starting",function(){
		it("should set lives to ",function(){
			//start();
			flower = 2;
			expect(flower).toBeLessThan(maxScore);
		});
	});
	describe("Incorrect answers",function(){
		it("should trigger irritating sound",function(){
			expect(true).toBe(true);
		});
	});
	describe("Correct answers",function(){
		it("should trigger pleasant sound",function(){
			expect(true).toBe(true);
		});
		it("should advance learner forward",function(){
			expect(true).toBe(true);
		});
	});
});
