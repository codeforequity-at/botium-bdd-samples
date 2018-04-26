const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { AfterAll, BeforeAll, After, Before } = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
const BotDriver = require('botium-core').BotDriver;

setDefaultTimeout(60 * 1000);

const Exec = () => global.driverFluent.Exec().then(() => global.driverFluent.tasks = [])

BeforeAll(function () {
  const driver = new BotDriver();
  global.driverFluent = driver.BuildFluent()
  return Exec()
});
Before(function () {
  global.driverFluent.Start()
  return Exec()
});

Given('first number is {int}', function (int) {
  this.firstNumber = int;
});

Given('second number is {int}', function (int) {
  this.secondNumber = int;
});

When('I ask to add the numbers', function () {
  global.driverFluent.UserSaysText('start')
    .WaitBotSaysText((text) => assert.equal(text, 'I can do a very advanced scientific calculations for you ("Addition").'))
    .WaitBotSaysText((text) => assert.equal(text, 'Please tell me the first number!'))
    .UserSaysText(`${this.firstNumber}`)
    .WaitBotSaysText((text) => assert.equal(text, 'Please tell me the second number!'))
    .UserSaysText(`${this.secondNumber}`)
    .WaitBotSaysText((text) => this.calculationResult = text)
  return Exec()
});

Then('the result should be {int}', function (int) {
  assert.equal(this.calculationResult, `${this.firstNumber} + ${this.secondNumber} = ${int}`);
});

After(function () {
  global.driverFluent.Stop();
  return Exec()
});
AfterAll(function () {
  global.driverFluent.Clean();
  return Exec()
});
