const fs = require('fs');

class ScreenshotPage {
    constructor(driver) {
        this.driver = driver;
    }

    async takeScreenshot(filePath) {
        const image = await this.driver.takeScreenshot();
        // Ensure the directory exists
        const dir = require('path').dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, image, 'base64');
    }
}

module.exports = ScreenshotPage;