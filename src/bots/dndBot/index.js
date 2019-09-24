const Discord = require('discord.io')

const auth = require('../../../auth.json')
const logger = require('../../utils/logger')


class DnDBot {
  constructor() {
    this.client = new Discord.Client({
      token: auth.dndBotToken
    })

    this.addEventHandlers()
  }

  connect() {
    this.client.connect()

    this.client.on('ready', () => {
      logger.info('D&D Bot Connected.')
      logger.info(`Logged in as:\n${this.client.username} - ${this.client.id}`)
    })
  }


  disconnect() {
    this.client.disconnect()
  }


  addEventHandlers() {
    this.disconnectEventHandler()
    this.messsageEventHandler()
  }


  disconnectEventHandler() {
    this.client.on('disconnect', (errMsg, code) => {
      logger.info('D&D Bot Disconnected.')
      if (errMsg) logger.error(errMsg, code)
    })
  }


  messsageEventHandler() {
    this.client.on('message', (user, userId, channelId, message, event) => {
      if (message.substring(0, 1) !== '!') return

      let args = message.substring(1).split(' ')
      const cmd = args[0]
      args = args.splice(1)

      switch (cmd) {
        case 'roll':
          this.handleRoll(args, channelId)
          break
        default:
      }
    })
  }


  rollDie(sides = 6) {
    return 1 + Math.floor(Math.random() * sides)
  }


  handleRoll(args, channelId) {
    let results

    if (args.length === 0) {
      results = this.rollDie()
    }

    results = args.map((arg) => {
      const output = []
      const regex = /^(\d{1,}d\d{1,})$/gm

      if (!regex.test(arg)) {
        output.push(`The param ${arg} is not in the correct format: "{rolls}d{sides}"`)
        return output
      }

      const [rolls, sides] = arg.split('d')

      if (sides > 100) {
        output.push(`Given sides "${sides}" mush be smaller than 100 for ${arg}`)
        return output
      }

      if (rolls > 100) {
        output.push(`Given rolls "${rolls}" mush be smaller than 100 for ${arg}`)
        return output
      }

      if (parseInt(sides, 2) === 0) {
        output.push(`Given sides "${sides}" mush be greater than 0 for ${arg}`)
        return output
      }

      for (let i = 0; i < rolls; i += 1) {
        output.push(this.rollDie(sides))
      }

      return output
    })

    const resultMessage = JSON.stringify(results)
      .replace(/,/gi, () => ', ')
      .replace(/\[\[/gi, () => '[')
      .replace(/\]\]/gi, () => ']')
      .replace(/\], \[/gi, () => ']\n[')

    this.client.sendMessage({
      to: channelId, message: resultMessage
    }, (err, res) => {
      if (err) logger.error('ERROR: ', err)
      if (res) logger.info('RESPONSE: ', res)
    })
  }
}


module.exports = DnDBot
