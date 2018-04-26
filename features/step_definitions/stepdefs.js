const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { AfterAll, BeforeAll, After, Before } = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
const BotDriver = require('botium-core').BotDriver;

setDefaultTimeout(60 * 1000);

BeforeAll(function () {
  global.driver = new BotDriver();
  return global.driver.Build().then((c) => { global.container = c });
});
Before(function () {
  return global.container.Start();
});

Given('first number is {int}', function (int) {
  this.firstNumber = int;
});

Given('second number is {int}', function (int) {
  this.secondNumber = int;
});

When('I ask to add the numbers', function () {
  return global.container.UserSaysText('start')
    .then(() => global.container.WaitBotSaysText())
    .then((text) => assert.equal(text, 'I can do a very advanced scientific calculations for you ("Addition").'))
    .then(() => global.container.WaitBotSaysText())
    .then((text) => assert.equal(text, 'Please tell me the first number!'))
    .then(() => global.container.UserSaysText(`${this.firstNumber}`))
    .then(() => global.container.WaitBotSaysText())
    .then((text) => assert.equal(text, 'Please tell me the second number!'))
    .then(() => global.container.UserSaysText(`${this.secondNumber}`))
    .then(() => global.container.WaitBotSaysText())
    .then((text) => this.calculationResult = text);
});

Then('the result should be {int}', function (int) {
  assert.equal(this.calculationResult, `${this.firstNumber} + ${this.secondNumber} = ${int}`);
});

After(function () {
  return global.container.Stop();
});
AfterAll(function () {
  return global.container.Clean();
});
