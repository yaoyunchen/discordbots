const Discord = require('discord.io')
const fetch = require('node-fetch')

const auth = require('../../../auth.json')
const logger = require('../../utils/logger')


// Initialize Discord Bot
const testBot = new Discord.Client({
  token: auth.testBotToken,
  autorun: true,
})

testBot.on('ready', () => {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(`${testBot.username} - (${testBot.id})`)

  const baseUrl = 'http://localhost:4000/graphql'

  // fetch(baseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({ query: '{ random }' })
  // })
  //   .then(r => r.json())
  //   .then(data => logger.info('data returned:', data))


  // fetch(baseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: `query RollDice($dice: Int!, $sides: Int) {
  //       rollDice(numDice: $dice, numSides: $sides)
  //     }`,
  //     variables: { dice: 3, sides: 6 }
  //   })
  // })
  //   .then(r => r.json())
  //   .then(data => logger.info('data returned:', data))


  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `{
        getDie(numSides: 10) {
          roll(numRolls: 10)
        }
      }`
    })
  })
    .then(r => r.json())
    .then(data => logger.info('data returned:', data))
})

// testBot.on('message', (user, userID, channelID, message, evt) => {
//   // Our bot needs to know if it will execute a command
//   // It will listen for messages that will start with `!`
//   if (message.substring(0, 1) === '!') {
//     let args = message.substring(1).split(' ')
//     const cmd = args[0]

//     args = args.splice(1)
//     switch (cmd) {
//       // !ping
//       case 'ping':
//         bot.sendMessage({
//           to: channelID,
//           message: 'Pong!',
//         })
//         break
//       // Just add any case commands if you want to..
//       default:
//     }
//   }
// })
