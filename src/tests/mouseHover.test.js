// Define a test case for mouse hover operations on the internet page "internet-herokuapp.com"
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const MouseHoverPage = require('../pages/mouseHoverPage');

describe('Mouse Hover Tests', function() {
    let driver;
    let mouseHoverPage;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        mouseHoverPage = new MouseHoverPage(driver);
        await driver.get('https://the-internet.herokuapp.com/hovers');
    });

    after(async function() {
        await driver.quit();
    });

    it('should hover over the first image and display the correct text', async function() {
        await mouseHoverPage.hoverOverImage(1);
        const text = await mouseHoverPage.getHoverText(1);
        assert.strictEqual(text, 'name: user1');
        await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it('should hover over the second image and display the correct text', async function() {
        await mouseHoverPage.hoverOverImage(2);
        const text = await mouseHoverPage.getHoverText(2);
        assert.strictEqual(text, 'name: user2');
        await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it('should hover over the third image and display the correct text', async function() {
        await mouseHoverPage.hoverOverImage(3);
        const text = await mouseHoverPage.getHoverText(3);
        assert.strictEqual(text, 'name: user3');
        await new Promise(resolve => setTimeout(resolve, 5000));
    });

    
});
