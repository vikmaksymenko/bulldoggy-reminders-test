// eslint-disable-next-line
const fs = require('fs');
fs.rmSync('allure-report', { recursive: true, force: true });
fs.rmSync('allure-results', { recursive: true, force: true });
