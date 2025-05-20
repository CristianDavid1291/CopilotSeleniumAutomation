const { By } = require('selenium-webdriver');

class FileUploadPage {
    constructor(driver) {
        this.driver = driver;
        this.fileInputSelector = '#file-upload';
        this.uploadButtonSelector = '#file-submit';
        this.uploadedMessageSelector = 'h3';
        this.uploadedFileNameSelector = '#uploaded-files';
    }

    async uploadFile(filePath) {
        const fileInput = await this.driver.findElement(By.css(this.fileInputSelector));
        await fileInput.sendKeys(filePath);
        const uploadButton = await this.driver.findElement(By.css(this.uploadButtonSelector));
        await uploadButton.click();
    }

    async getUploadedMessage() {
        const message = await this.driver.findElement(By.css(this.uploadedMessageSelector));
        return await message.getText();
    }

    async getUploadedFileName() {
        const fileName = await this.driver.findElement(By.css(this.uploadedFileNameSelector));
        return await fileName.getText();
    }
}

module.exports = FileUploadPage;