const { By } = require('selenium-webdriver');

class FramesPage {
    constructor(driver) {
        this.driver = driver;
        this.nestedFramesLink = 'a[href="/nested_frames"]';
        this.iFramesLink = 'a[href="/iframe"]';
        this.headerSelector = 'h3';
    }

    async clickNestedFramesLink() {
        await this.driver.findElement(By.css(this.nestedFramesLink)).click();
    }

    async clickiFramesLink() {
        await this.driver.findElement(By.css(this.iFramesLink)).click();
    }

    async switchToFrame(frameNameOrId) {
        await this.driver.switchTo().frame(frameNameOrId);
    }

    async switchToDefaultContent() {
        await this.driver.switchTo().defaultContent();
    }

    async getTextFromFrame() {
        const body = await this.driver.findElement(By.css('body'));
        return await body.getText();
    }

    async getTextFromiFrame() {
        const editorBody = await this.driver.findElement(By.id('tinymce'));
        return await editorBody.getText();
    }

    async getHeaderText() {
        const header = await this.driver.findElement(By.css(this.headerSelector));
        return await header.getText();
    }
}

module.exports = FramesPage;