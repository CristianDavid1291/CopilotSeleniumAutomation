//write automation test to test download functionality
// using the downloadPage.js page object model
// and the download.test.js test file
// the page is available at https://the-internet.herokuapp.com/download
// the test should check if the file is downloaded successfully
// and if the text "File downloaded!" is present on the page
const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const DownloadPage = require('../pages/downloadPage.js');
const fs = require('fs');
const path = require('path');
const downloadDir = path.resolve(__dirname, 'C:\Users\User\Downloads'); 
const fileName = 'Appiumsetup.txt'; 
const filePath = path.join(downloadDir, fileName);
const { until } = require('selenium-webdriver');

describe('Download Tests', function() {
    let driver;
    let downloadPage;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        chromeOptions.setUserPreferences({
            'download.default_directory': downloadDir,
            'download.prompt_for_download': false,
            'safebrowsing.enabled': true
        });
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        downloadPage = new DownloadPage(driver);
    });

    after(async function() {
        //await driver.quit();
    });
    it('should download a file successfully', async function() {
        await driver.get('https://the-internet.herokuapp.com/download');
        await downloadPage.clickDownloadLink(fileName);

        // Wait for the file to be downloaded
        await driver.wait(async () => {
            return fs.existsSync(filePath);
        }, 30000); // Wait up to 30 seconds

        // Check if the file exists
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).to.be.true;

        // Clean up: delete the downloaded file
        if (fileExists) {
            fs.unlinkSync(filePath);
        }
    });


 });

