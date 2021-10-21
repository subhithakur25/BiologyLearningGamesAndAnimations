/// <reference path="./Scramble/js/3p/script.js" /> ;
//var getRandomInt = require('../Scramble/js/*.js').getRandomInt;



describe("Scramble game", function() {
   describe("when player plays game", function(){
      it("should be able to play a scramble game", function() {
         expect(true).toBe(true);
      });
   });
   xdescribe("when word is unscrambled", function(){
      it("is removed from play", function(){
         expect(true).toBe(false);
      });
   });
   describe("This is an example test", function(){
      describe("It was written after application code", function(){
         myvalue = 20;
         othervalue = getRandomInt(0,myvalue);
         it("It tests a specific funtion in script.js", function(){
            expect(othervalue).toBeLessThan(20);
         });
      });
   });
});

