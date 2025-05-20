const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');
const FileUploadPage = require('../pages/fileUploadPage');

describe('File Upload Tests', function() {
    let driver;
    let fileUploadPage;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        fileUploadPage = new FileUploadPage(driver);
        await driver.get('https://the-internet.herokuapp.com/upload');
    });

    after(async function() {
        await driver.quit();
    });

    it('should upload a file successfully', async function() {
        const filePath = path.resolve(__dirname, '../../test-files/sample.txt');
        await fileUploadPage.uploadFile(filePath);
        const message = await fileUploadPage.getUploadedMessage();
        assert.strictEqual(message, 'File Uploaded!');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Static wait for manual verification
    });

    it('should display the uploaded file name', async function() {
        const filePath = path.resolve(__dirname, '../../test-files/sample.txt');
        await fileUploadPage.uploadFile(filePath);
        const fileName = await fileUploadPage.getUploadedFileName();
        assert.strictEqual(fileName, 'sample.txt');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Static wait for manual verification
    });
});