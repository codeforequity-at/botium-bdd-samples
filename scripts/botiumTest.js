const BotDriver = require('botium-core').BotDriver
const Capabilities = require('botium-core').Capabilities
const Source = require('botium-core').Source

function assert (expected, actual) {
  if (!actual || actual.indexOf(expected) < 0) {
    console.log(`ERROR: Expected <${expected}>, got <${actual}>`)
  } else {
    console.log(`SUCCESS: Got Expected <${expected}>`)
  }
}

const driver = new BotDriver()

driver.BuildFluent()
  .Start()
  .UserSaysText('start')
  .WaitBotSaysText((text) => assert('I can do a very advanced scientific calculations for you ("Addition").', text))
  .WaitBotSaysText((text) => assert('Please tell me the first number!', text))
  .UserSaysText('1')
  .WaitBotSaysText((text) => assert('Please tell me the second number!', text))
  .UserSaysText('1')
  .WaitBotSaysText((text) => assert('1 + 1 = 2', text))
  .WaitBotSaysText((text) => assert('Is this correct ?', text))
  .UserSaysText('yes')
  .WaitBotSaysText((text) => assert('I know.', text))
  .Stop()
  .Clean()
  .Exec()
  .then(() => {
    console.log('READY')
  })
  .catch((err) => {
    console.log('ERROR: ', err)
  })
