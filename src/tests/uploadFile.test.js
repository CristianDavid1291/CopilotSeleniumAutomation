//create automated test for uploadFile function
// the page is available at https://the-internet.herokuapp.com/upload
// the test should check if the file is uploaded successfully
// and if the text "File Uploaded!" is present on the page
const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const UploadFilePage = require('../pages/uploadFilePage.js');

describe('Upload File Tests', function() {
    let driver;
    let uploadFilePage;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        uploadFilePage = new UploadFilePage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('should upload a file successfully', async function() {
        await driver.get('https://the-internet.herokuapp.com/upload');
        await uploadFilePage.uploadFile('src/tests/dataDrivenTestCSV.js'); 
        const successMessage = await uploadFilePage.getSuccessMessage();
        expect(successMessage).to.equal('File Uploaded!');
        await driver.sleep(3000); // Wait for 2 seconds to see the result
    });
}
);
