const { By } = require('selenium-webdriver');

class AlertPage {
    constructor(driver) {
        this.driver = driver;
        this.simpleAlertButton = 'button[onclick="jsAlert()"]';
        this.confirmAlertButton = 'button[onclick="jsConfirm()"]';
        this.promptAlertButton = 'button[onclick="jsPrompt()"]';
        this.resultSelector = '#result';
    }

    async clickSimpleAlert() {
        await this.driver.findElement(By.css(this.simpleAlertButton)).click();
    }

    async clickConfirmAlert() {
        await this.driver.findElement(By.css(this.confirmAlertButton)).click();
    }

    async clickPromptAlert() {
        await this.driver.findElement(By.css(this.promptAlertButton)).click();
    }

    async getResultText() {
        const result = await this.driver.findElement(By.css(this.resultSelector));
        return await result.getText();
    }
}

module.exports = AlertPage;