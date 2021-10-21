// features/support/world.js
const { setWorldConstructor } = require("cucumber"); 
const { Builder, By, Key, until } = require("selenium-webdriver"); 
const chrome = require("chromedriver"); 
const iexplorer = require("iedriver"); 
const firefox = require("geckodriver"); 
const edge = require("edgedriver"); 
const { sleep } = require("./util"); 

class browserBuild {
    constructor() {}

    async init() {
        // Currently only works with "chrome" and "firefox" browser options
        // Workaround for testing in other browsers has not yet been pursued due to minimal requirements
        const driver = await new Builder().forBrowser("chrome").build(); 
        await driver.manage().window().maximize(); 
        await driver.get(`file:///${__dirname}/../../index.html`);
        this.guesses = new Set(); 
        this.driver = driver; 
    }

    async guessLetter(letter) {
        const driver = this.driver; 
        this.guesses.add(`${letter}`);
        const button = await driver.findElement(By.id(`${letter}`));  
        await button.click(); 
        sleep(500); 
    }

    async getStatus() {
        const driver = this.driver; 
        const status = await driver.findElement(By.id('status')); 
        return status.getText(); 
    }

    async checkWords() {
        const driver = this.driver; 
        this.updated = true; 
        const words = await driver.findElements(By.className('word')); 
        var all = "";
        for (let word of words) all += await word.getText(); 
        for (let letter of this.guesses) this.updated = this.updated && all.includes(letter); 
        return this.updated; 
    }

    async checkImage() {
        const driver = this.driver; 
        const image = await driver.findElement(By.id('hangmanPic')); 
        return image.getAttribute('src'); 
    }

    async lose() {
        var incorrect = ['b','d','f','g','h','j','k','l']; 
        for (let letter of incorrect) {
            this.guessLetter(letter); 
        }
    }

    async win() {
        var correct = ['a','c','e','i','m','n','o','r','s','t','u','v']; 
        for (let letter of correct) {
            this.guessLetter(letter); 
        }
    }

    async checkReset() {
        const driver = this.driver; 
        const reset = await driver.findElement(By.id('reset')); 
        return reset.isDisplayed(); 
    }

    async reset() {
        const driver = this.driver; 
        const reset = await driver.findElement(By.id('reset')); 
        await reset.click(); 
        sleep(500); 
    }
}

setWorldConstructor(browserBuild); 