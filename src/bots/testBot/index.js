const Discord = require('discord.io')
const fetch = require('node-fetch')

const auth = require('../../../auth.json')
const logger = require('../../utils/logger')

const botList = [
  'dnd-bot'
]

// Initialize Discord Bot
const client = new Discord.Client({
  token: auth.testBotToken,
  autorun: true,
})

client.on('ready', () => {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(`${client.username} - (${client.id})`)


  const allBots = Object.entries(client.users)
    .map(userInfo => userInfo[1])
    .filter(user => user.bot === true)

  const onlineUserIds = Object.entries(client.servers[auth.serverId].members)
    .map(userInfo => userInfo[1])
    .filter(user => user.status === 'online')
    .map(user => user.id)

  const onlineBots = allBots.filter(bot => onlineUserIds.includes(bot.id))
    .map(bots => bots.username)

  const hasPersonalBots = onlineBots.some(bot => botList.includes(bot))

  if (!hasPersonalBots) {
    // client.sendMessage({
    //   to: channelId,
    //   message: 'No other bots connected. Do you wish to connect a bot?'
    // }, (err, res) => {
    //   if (err) logger.info('ERROR:', err)
    //   if (res) logger.info('RESPONSE:', res)
    // })
  }

  // const baseUrl = 'http://localhost:4000/graphql'

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


  // fetch(baseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: `{
  //       getDie(numSides: 10) {
  //         roll(numRolls: 10)
  //       }
  //     }`
  //   })
  // })
  //   .then(r => r.json())
  //   .then(data => logger.info('data returned:', data))
})


client.on('message', (user, userId, channelID, message, evt) => {
  logger.info(message)
  if (message.substring(0, 1) !== '!') return

  let args = message.substring(1).split(' ')
  const cmd = args[0]
  args = args.splice(1)

  switch (cmd.toLowerCase()) {
    case 'channelid':
      client.sendMessage({
        to: channelID,
        message: channelID
      })
      break
    default:
  }
})
