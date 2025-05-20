const { By, Actions } = require('selenium-webdriver');

class MouseHoverPage {
    constructor(driver) {
        this.driver = driver;
        this.imageSelector = '.figure';
        this.captionSelector = '.figcaption h5';
    }

    async hoverOverImage(index) {
        const images = await this.driver.findElements(By.css(this.imageSelector));
        if (images[index - 1]) {
            const actions = this.driver.actions({ async: true });
            await actions.move({ origin: images[index - 1] }).perform();
        }
    }

    async getHoverText(index) {
        const images = await this.driver.findElements(By.css(this.imageSelector));
        if (images[index - 1]) {
            const caption = await images[index - 1].findElement(By.css(this.captionSelector));
            return await caption.getText();
        }
        return '';
    }
}

module.exports = MouseHoverPage;