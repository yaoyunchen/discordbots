const logger = require('winston')

logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: true })
logger.level = 'debug'

module.exports = logger
