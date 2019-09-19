const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const logger = require('../utils/logger')


class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }


  rollDie() {
    return 1 + Math.floor(Math.random() * this.numSides)
  }


  roll({ numRolls }) {
    const output = []
    for (let i = 0; i < numRolls; i += 1) {
      output.push(this.rollDie())
    }

    return output
  }
}


const schema = buildSchema(`
  type Query {
    quote: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
  }

  type RandomDie {
    numSides: Int!
    rollDie: Int!
    roll(numRolls: Int): [Int]
  }
`)


const root = {
  quote: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },

  random: () => Math.random(),

  rollDice: ({ numDice, numSides }) => {
    const output = []
    for (let i = 0; i < numDice; i += 1) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }

    return output
  },

  getDie: ({ numSides }) => new RandomDie(numSides || 6)
}


const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
logger.info('Running GraphQL API server at localhost:4000/graphql')

// graphql(schema, '{ hello }', root)
//   .then((response) => console.log(response))
