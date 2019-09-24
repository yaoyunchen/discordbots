
// const graphql = require('graphql')


// const NPC = require('../models/NPC')

// const logger = require('../utils/logger')

// const {
//   GraphQLObjectType,
//   GraphQLID,
//   GraphQLList,
//   GraphQLString,
//   GraphQLSchema,
//   GraphQLNonNull
// } = graphql


// const NPCType = new GraphQLObjectType({
//   name: 'NPC',
//   fields: () => ({
//     id: { type: GraphQLID },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     race: { type: GraphQLString },
//     personalities: { type: new GraphQLList(GraphQLString) },
//     ideals: { type: new GraphQLList(GraphQLString) },
//     bonds: { type: new GraphQLList(GraphQLString) },
//     flaws: { type: new GraphQLList(GraphQLString) }
//   })
// })


// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addNPC: {
//       type: NPCType,
//       args: {
//         firstName: { type: GraphQLNonNull(GraphQLString) },
//         lastName: { type: GraphQLString },
//         race: { type: GraphQLNonNull(GraphQLString) }
//       },
//       resolve(parent, args) {
//         const npc = new NPC(args)
//         return npc.save()
//       }
//     }
//   }
// })


// // Describes how users can use the graph and grab data
// const RootQuery = new GraphQLObjectType({
//   name: 'Root',
//   fields: {
//     npc: {
//       type: NPCType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return NPC.findById(args.id)
//       }
//     },
//     npcs: {
//       type: new GraphQLList(NPCType),
//       resolve() {
//         return NPC.find({})
//           .then((data) => data)
//           .catch((err) => logger.error(err))
//       }
//     }
//   }
// })


// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// })
