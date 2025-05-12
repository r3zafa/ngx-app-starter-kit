module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    reporters: ["progress", "kjhtml"],
    singleRun: false,
    restartOnFileChange: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["FirefoxHeadless", "ChromeHeadless"],
    singleRun: true,
    concurrency: Infinity,
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-firefox-launcher"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-coverage"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    customLaunchers: {
      ChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-dev-shm-usage"],
      },
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["--headless"],
      },
    },
  });
};
