const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const config = require('../config')

const dieType = require('./types/die')


const schema = buildSchema(`
  type Query {
    ${dieType.query}
  }

  ${dieType.schema}
`)

let rootValue = {}
rootValue = { ...dieType.root }


module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: config.graphiql
})
