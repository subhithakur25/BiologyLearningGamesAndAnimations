// features/support/steps.js
const { Given, When, Then, After, setDefaultTimeout } = require("cucumber"); 
const { expect } = require("chai"); 
const { sleep } = require("./util"); 

setDefaultTimeout(10 * 1000);

After(async function() {
    return this.driver.quit(); 
}); 

Given(/^I am playing hangman$/, async function () {
    await this.init(); 
}); 

Given(/^I have already guessed the following letters$/, async function (dataTable) {
    var letters = dataTable["rawTable"]; 
    for (letter of letters) { this.guessLetter(letter); }
});

When(/^I guess the letter "(.*)"$/, async function(letter) {
    this.guessLetter(letter); 
}); 

When(/^I guess the following letters$/, async function (dataTable) {
    var letters = dataTable["rawTable"]; 
    for (letter of letters) {
        this.guessLetter(letter); 
    }
});

When(/^I guess too many incorrect letters$/, async function() {
    await this.lose(); 
}); 

When(/^I guess all the correct letters$/, async function() {
    await this.win(); 
});

When(/^I click the reset button$/, async function() {
    await this.reset(); 
}); 

Then(/^I should see status "(.*)"$/, async function(phrase) {
    const statusText = await this.getStatus(); 
    expect(statusText).to.eql(phrase); 
}); 

Then(/^I should see blanks turn into letters I guessed$/, async function() {
    const updated = await this.checkWords(); 
    expect(updated).to.eql(true); 
}); 

Then(/^I should see hangman image "(.*)"$/, async function(expected_img) {
    const img = await this.checkImage(); 
    expect(img).to.include(expected_img); 
}); 

Then(/^I should (.*)see the reset button$/, async function(should_see) {
    const can_reset = await this.checkReset(); 
    expect(can_reset).to.eql(should_see == null); 
}); 