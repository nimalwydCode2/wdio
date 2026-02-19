const { expect } = require('@wdio/globals');
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
    await expect(secure.flashAlert).toHaveTextContaining('secure area');

    // also verify that the url changed
    await expect(browser).toHaveUrlContaining('/secure');
  });

  it('rejects invalid password', async () => {
    await LoginPage.login('tomsmith', 'badpass');
    await expect(LoginPage.errorAlert).toBeDisplayed();
    await expect(LoginPage.errorAlert).toHaveTextContaining(
      'Your password is invalid'
    );
  });
});
