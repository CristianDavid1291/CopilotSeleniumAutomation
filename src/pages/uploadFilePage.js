const { By } = require('selenium-webdriver');
const path = require('path');

class UploadFilePage {
    constructor(driver) {
        this.driver = driver;
        this.fileInputSelector = '#file-upload';
        this.uploadButtonSelector = '#file-submit';
        this.successMessageSelector = 'h3';
    }

    async uploadFile(filePath) {
        
        // Resolve the absolute path for Windows
        const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
        const fileInput = await this.driver.findElement(By.css(this.fileInputSelector));
        await fileInput.sendKeys(absolutePath);
        const uploadButton = await this.driver.findElement(By.css(this.uploadButtonSelector));
        await uploadButton.click();
    }

    async getSuccessMessage() {
        const message = await this.driver.findElement(By.css(this.successMessageSelector));
        return await message.getText();
    }
}

module.exports = UploadFilePage;
