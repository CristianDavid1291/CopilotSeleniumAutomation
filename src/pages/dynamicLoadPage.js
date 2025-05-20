const { By, until } = require('selenium-webdriver');

class DynamicLoadPage {
    constructor(driver) {
        this.driver = driver;
        this.startButtonSelector = '#start button';
        this.helloWorldSelector = '#finish h4';
    }

    async clickStartButton() {
        const startButton = await this.driver.findElement(By.css(this.startButtonSelector));
        await startButton.click();
        // Wait for the loading to finish and "Hello World!" to appear
        await this.driver.wait(until.elementLocated(By.css(this.helloWorldSelector)), 10000);
        await this.driver.wait(until.elementIsVisible(
            await this.driver.findElement(By.css(this.helloWorldSelector))
        ), 10000);
    }

    async clickStartButton2() {

        const startButton = await this.driver.findElement(By.css(this.startButtonSelector));
        await startButton.click();
        // Wait for the loading to finish and "Hello World!" to appear
        await this.driver.wait(until.elementLocated(By.css(this.helloWorldSelector)), 10000);
        await this.driver.wait(until.elementIsVisible(
            await this.driver.findElement(By.css(this.helloWorldSelector))
        ), 10000);
    }

    async getHelloWorldText() {
        const helloWorld = await this.driver.findElement(By.css(this.helloWorldSelector));
        return await helloWorld.getText();
    }
}

module.exports = DynamicLoadPage;