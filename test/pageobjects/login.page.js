const { $ } = require('@wdio/globals');
const Page = require('./page');
const SecurePage = require('./secure.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('#username');
  }

  get inputPassword() {
    return $('#password');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get errorAlert() {
    // the same flash element is shown for error messages
    return $('#flash');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   * returns the secure area page on success
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
    return SecurePage;
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('login');
  }
}

module.exports = new LoginPage();
