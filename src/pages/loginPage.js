class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = 'input#username';
        this.passwordField = 'input#password';
        this.loginButton = 'button[type="submit"]';
    }

    async enterUsername(username) {
        await this.driver.findElement({ css: this.usernameField }).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement({ css: this.passwordField }).sendKeys(password);
    }

    async submitLogin() {
        await this.driver.findElement({ css: this.loginButton }).click();
    }

    async submitLogOut() {
        await this.driver.findElement({ css: 'a.button.secondary.radius' }).click();
    }

    async submitAlert() {
        const alert = await this.driver.switchTo().alert();
        await alert.accept();
    }

        async acceptGoogleChangePassword() {
        // Wait for the Google Change Password dialog and click "Accept"
        try {
            // Adjust the selector as needed for the actual Google dialog
            const acceptButton = await this.driver.wait(
                async () => {
                    const buttons = await this.driver.findElements(By.xpath("//button[.='Accept']"));
                    return buttons.length > 0 ? buttons[0] : null;
                },
                5000,
                'Accept button not found in Google Change Password window'
            );
            if (acceptButton) {
                await acceptButton.click();
            }
        } catch (err) {
            // Handle if the dialog does not appear
            console.warn('Google Change Password Accept button not found or not needed.');
        }
    }


}

module.exports = LoginPage;