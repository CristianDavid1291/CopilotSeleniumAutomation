//Create test cases for Nested frames and iFrames using the web page https://the-internet.herokuapp.com/frames  
const { Builder } = require('selenium-webdriver');
const { expect } = require('chai'); 
const chrome = require('selenium-webdriver/chrome');
const FramesPage = require('../pages/framesPage'); 

describe('Frames Tests', function() {
    let driver;
    let framesPage;
    this.timeout(30000); // Set timeout for the entire suite

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        framesPage = new FramesPage(driver);
        await driver.get('https://the-internet.herokuapp.com/frames');
    });

    after(async function() {
        await driver.quit();
    });

    it('should switch to the nested frame and get the text', async function() {
        await framesPage.clickNestedFramesLink();
        await framesPage.switchToFrame('frame-top');
        await framesPage.switchToFrame('frame-middle');
        const text = await framesPage.getTextFromFrame();
        expect(text).to.equal('MIDDLE');
        await driver.navigate().back();
    });

    it('should switch to the iFrame and get the text', async function() {
        await framesPage.clickiFramesLink();
        await framesPage.switchToFrame('mce_0_ifr');
        const text = await framesPage.getTextFromiFrame();
        expect(text).to.equal('Your content goes here.');
        await driver.navigate().back();
    });

});
