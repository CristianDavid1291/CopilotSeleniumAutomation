const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const LoginPage = require('../pages/loginPage');

describe('Login Tests', function() {
    let driver;
    let loginPage;
    this.timeout(15000);

    before(async function() {
        const options = new chrome.Options();
        options.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions',
            '--disable-translate',
            '--disable-popup-blocking',
            '--disable-features=AutofillServerCommunication,PasswordManagerOnboarding,PasswordManagerRedesign',
            '--disable-blink-features=AutomationControlled',
            '--user-data-dir=/tmp/chrome-test-profile',
            '--reduce-security-for-testing',
            '--guest' // Enable guest mode
        );
        options.setUserPreferences({
            'credentials_enable_service': false,
            'profile.password_manager_enabled': false,
            'profile.default_content_setting_values.notifications': 2,
            'safebrowsing.enabled': false // Deactivate Safe Browsing
        });

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        loginPage = new LoginPage(driver);
        await driver.get('https://the-internet.herokuapp.com/login');
    });

    after(async function() {
        await driver.quit();
    });

    it('should login with valid credentials', async function() {
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        await loginPage.submitLogin();
        await driver.sleep(5000);
        const successMessage = await driver.findElement(By.css('.subheader')).getText();
        assert(successMessage.includes('Welcome to the Secure Area. When you are done click logout below.'));
        await loginPage.submitLogOut();
    });

    it('should not login with invalid credentials', async function() {
        await loginPage.enterUsername('invalidUser');
        await loginPage.enterPassword('invalidPassword');
        await loginPage.submitLogin();
        await driver.sleep(5000);
        const errorMessage = await driver.findElement(By.css('.flash.error')).getText();
        assert(errorMessage.includes('Your username is invalid!'));
    });
});