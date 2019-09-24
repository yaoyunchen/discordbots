const express = require('express')
const mongoose = require('mongoose')

const logger = require('../utils/logger')
const graphQL = require('../graphql')

const DnDBot = require('../bots/dndBot')


mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  logger.info('Connected to Mongo DB at 127.0.0.1:27017')
})

const app = express()

app.use('/graphql', graphQL)


app.listen(4000, () => {
  logger.info('Running GraphQL API server at localhost:4000/graphql')
})

const dndBot = new DnDBot()
dndBot.connect()
