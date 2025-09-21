/* eslint-disable @typescript-eslint/no-var-requires */
// Karma configuration for Angular v20 project
// - Auto-detects Chrome or Yandex Browser and sets CHROME_BIN
// - Provides a stable ChromeHeadlessCustom launcher for Windows/CI

const { existsSync } = require('fs');
const path = require('path');

// If CHROME_BIN not provided, try common Chrome/Yandex paths on Windows
if (!process.env.CHROME_BIN) {
  const candidates = [
    // Google Chrome (x64)
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    // Google Chrome (x86)
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    // Yandex Browser (per-user install)
    path.join(process.env.USERPROFILE || '', 'AppData/Local/Yandex/YandexBrowser/Application/browser.exe'),
    // Yandex Browser (system install)
    'C:/Program Files/Yandex/YandexBrowser/Application/browser.exe',
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (found) {
    process.env.CHROME_BIN = found;
    // eslint-disable-next-line no-console
    console.log(`[karma] Using CHROME_BIN: ${found}`);
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    // For Angular 20+, the builder wires itself; only 'jasmine' is needed here
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
    ],

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // Use our custom headless by default; you can still run `ng test --browsers=Chrome`
    browsers: ['ChromeHeadlessCustom'],

    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--disable-setuid-sandbox',
        ],
      },
    },

    singleRun: false,
    restartOnFileChange: true,
  });
};


