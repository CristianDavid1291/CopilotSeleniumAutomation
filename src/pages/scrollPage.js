const { By } = require('selenium-webdriver');

class ScrollPage {
    constructor(driver) {
        this.driver = driver;
    }

    async scrollToBottom() {
        await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        // Wait for new content to load (infinite scroll)
        await this.driver.sleep(2000);
    }

    async getLastElement() {
        // Get the last div with class 'jscroll-added'
        const elements = await this.driver.findElements(By.css('.jscroll-added'));
        if (elements.length > 0) {
            return elements[elements.length - 1];
        }
        return null;
    }
}

module.exports = ScrollPage;