exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: '144',
      // run headless in CI (and increase window size for screenshots)
      'goog:chromeOptions': {
        args: [
          // '--headless=new',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--window-size=1920,1080',
        ],
      },
    },
  ],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'mochawesome',
      {
        outputDir: './reports',
        reportFilename: 'wdio-report',
        html: true,
        json: true,
        reportTitle: 'WDIO E2E Test Report',
        inlineAssets: true,
        overwrite: false,
        quiet: true,
      },
    ],
  ],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 3, // retry failed tests up to 3 times
  },

  onComplete: function () {
    // automatically generate HTML report from mochawesome JSON
    try {
      const { execSync } = require('child_process');
      // use the cid from results or default filename
      const jsonFile = './reports/results-0-0.json';
      execSync(
        `npx marge ${jsonFile} --reportDir reports --reportFilename wdio-report`,
        { stdio: 'inherit' }
      );
    } catch (err) {
      console.error('Failed to generate HTML report:', err.message);
    }
  },

  // capture screenshot on failure and attach to mochawesome report
  afterTest: async function (test, context, { error }) {
    if (error) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filepath = `./reports/screenshots/${test.title}-${timestamp}.png`;
      await browser.saveScreenshot(filepath);

      // add screenshot path to mochawesome context (so it shows in HTML)
      try {
        const addContext = require('mochawesome/addContext');
        addContext({ test }, filepath);
      } catch (err) {
        // ignore if addContext not available
      }
    }
  },
};
