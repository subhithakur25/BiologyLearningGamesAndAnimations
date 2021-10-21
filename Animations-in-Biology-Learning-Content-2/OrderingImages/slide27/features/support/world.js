// features/support/world.js
const { setWorldConstructor } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chromedriver = require("chromedriver");

class browserBuild {
  constructor() {}

  async init() {
    // const driver = await new Builder().forBrowser("chrome").build();
    // await driver.manage().window().maximize();
    // await driver.get(`file:///${__dirname}/../../index.html`);
    // this.driver = driver;

  }

  async imageOrder(correctness) {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();

    if (correctness) {
      await driver.get(`file:///${__dirname}/../../index1.html`);
      const images = await driver.findElement(By.id("original_items"));
      const individuals = await images.findElements(By.tagName("li"));
      individuals[0].getAttribute("id") == "first";
      individuals[1].getAttribute("id") == "second";
      individuals[2].getAttribute("id") == "third";
      individuals[3].getAttribute("id") == "fourth";
      individuals[4].getAttribute("id") == "fifth";
    } else {
      await driver.get(`file:///${__dirname}/../../index.html`);
      const images = await driver.findElement(By.id("original_items"));
      const individuals = await images.findElements(By.tagName("li"));
      individuals[0].getAttribute("id") != "first";
      individuals[1].getAttribute("id") != "second";
      individuals[2].getAttribute("id") != "third";
      individuals[3].getAttribute("id") != "fourth";
      individuals[4].getAttribute("id") != "fifth";
    }
    this.driver = driver;
  }

  async getResultPhrase() {
    const driver = this.driver;
    const elem = await driver.findElement(By.id("checked_order"));
    return elem.getText();
  }
}

setWorldConstructor(browserBuild);