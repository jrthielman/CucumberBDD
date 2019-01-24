// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/features/**/*.feature'
  ],
  multiCapabilities: [
    {
      browserName: "chrome",
      shardTestFiles: true,
      maxInstances: 2,
      chromeOptions: {
        args: ["disable-infobars"]
      },
      metadata: {
        browser: {
            name: 'chrome',
            version: '58'
        },
        device: 'Dell XPS 15',
        platform: {
            name: 'Windows',
            version: '10'
        }
      }
    }
  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  framework: 'custom',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  cucumberOpts: {
    require: ['./src/steps/**/*.steps.ts'],
    format: "json:tmp/results.json",
    strict: true
  },
  plugins: [
    {
      package: "protractor-simple-cucumber-html-reporter-plugin",
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: "Angular BDD exercise with cucumber"
      }
    }
  ],
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    browser.driver.manage().window().maximize();
  },
  
};