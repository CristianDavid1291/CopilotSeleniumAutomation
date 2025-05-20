const { By } = require('selenium-webdriver');
const path = require('path');

class DownloadPage {
    constructor(driver) {
        this.driver = driver;
        this.downloadLinkSelector = 'a'; // All download links are <a> tags
        this.downloadMessageSelector = 'h3'; // Adjust if the message selector is different
    }

    async clickDownloadLink(fileName) {
        // Find the link with the matching file name
        const links = await this.driver.findElements(By.css(this.downloadLinkSelector));
        for (const link of links) {
            const text = await link.getText();
            if (text.trim() === fileName) {
                await link.click();
                return;
            }
        }
        throw new Error(`Download link for file '${fileName}' not found.`);
    }

    async getDownloadMessage() {
        // This is a placeholder. The-internet.herokuapp.com/download does not display a message after download.
        // If you want to check for a message, adjust the selector and logic accordingly.
        try {
            const message = await this.driver.findElement(By.css(this.downloadMessageSelector));
            return await message.getText();
        } catch (err) {
            return '';
        }
    }
}

module.exports = DownloadPage;
