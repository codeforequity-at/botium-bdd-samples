# Botium BDD Samples

Repository contains sample code for testing a chatbot with [Cucumber](https://cucumber.io/)

_Repository is using the [Calculator Chatbot Sample](https://github.com/codeforequity-at/testmybot-sample-calculator)_

## Usage instructions

* Pull repository from Github or download and unpack
* Install/Configure [Docker](https://www.docker.com/) - see [Botium Wiki](https://github.com/codeforequity-at/botium-core/wiki) for possible other configurations and use cases
* Install/Configure [Node.js](https://nodejs.org) (> 6.0)
* Open command line window to install dependencies and run the feature tests
    > npm install
    > npm run test

Output will show passed scenarios:
```
[xxx@ip-xx-xx-xx-xxx botium-bdd-samples]$ npm run test

> botium-bdd-samples@1.0.0 test /home/xxx/botium-bdd-samples
> cucumber-js

..............................

5 scenarios (5 passed)
20 steps (20 passed)
1m11.328s
```

## Insights

Feature files are written in [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin):

```
Feature: User feedback
  Getting feedback from the user after calculation

  Scenario: User confirms correctnes
    When bot does a calculation
	And bot asks for feedback
	And user accepts result
    Then bot should accept

  Scenario: Bot shows self confidence
    When bot does a calculation
	And bot asks for feedback
	And user declines result
    Then bot should insist
```

Step definitions are written in Javascript with [Botium](https://www.botium.at) - see [Botium Wiki](https://github.com/codeforequity-at/botium-core/wiki/) for more information

```
When('bot does a calculation', function () {
  global.driverFluent
    .UserSaysText('start')
    .WaitBotSaysText((text) => assert.equal(text, 'I can do a very advanced scientific calculations for you ("Addition").'))
    .WaitBotSaysText((text) => assert.equal(text, 'Please tell me the first number!'))
    .UserSaysText('1')
    .WaitBotSaysText((text) => assert.equal(text, 'Please tell me the second number!'))
    .UserSaysText('1')
    .WaitBotSaysText((text) => assert.equal(text, '1 + 1 = 2'));
  return Exec();
});
When('bot asks for feedback', function () {
  global.driverFluent
    .WaitBotSaysText((text) => assert.equal(text, 'Is this correct ?'));
  return Exec();
});
When('user accepts result', function () {
  global.driverFluent
    .UserSaysText('yes')
    .WaitBotSaysText((text) => this.botResponse = text);
  return Exec();
});
When('user declines result', function () {
  global.driverFluent
    .UserSaysText('no')
    .WaitBotSaysText((text) => this.botResponse = text);
  return Exec();
});
Then('bot should accept', function () {
  assert.equal(this.botResponse, `I know.`);
});
Then('bot should insist', function () {
  assert.equal(this.botResponse, `You are wrong. I know that this is correct!`);
});
```






