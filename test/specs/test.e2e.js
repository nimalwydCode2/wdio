const { expect, browser } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');

// credentials can be moved to a fixture if desired
// const creds = require('../data/creds.json');

describe('Login flow', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('accepts valid credentials', async () => {
    const secure = await LoginPage.login('tomsmith', 'SuperSecretPassword!');

    // wait for the flash alert to appear instead of a fixed pause
    await expect(secure.flashAlert).toBeDisplayed();
    // manually verify text contains substring
    const text = await secure.flashAlert.getText();
    expect(text).toContain('secure area');

    // verify that the url changed
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/secure');
  });

  it('rejects invalid password', async () => {
    await LoginPage.login('tomsmith', 'badpass');
    await expect(LoginPage.errorAlert).toBeDisplayed();
    const errText = await LoginPage.errorAlert.getText();
    expect(errText).toContain('Your password is invalid');
  });
});
