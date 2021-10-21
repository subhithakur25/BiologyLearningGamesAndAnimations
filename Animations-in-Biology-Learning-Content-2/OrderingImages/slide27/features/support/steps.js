const {Given, When, Then, After } = require("cucumber");
const { expect } = require("chai");

const { sleep } = require("./util");

// After(async function () {
//   return this.driver.quit();
// });

When("Images are placed in {string} order", async function (
  correctness
) {
  await this.init();
  await this.imageOrder(correctness === "correct");
});
  
Then("I should see {string}", async function (phrase) {
  const resultText = await this.getResultPhrase();
  expect(resultText).to.eql(phrase);
});
