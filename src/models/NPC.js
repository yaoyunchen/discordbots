const mongoose = require('mongoose')

const { Schema } = mongoose


const NPCSchema = new Schema({
  firstName: String,
  lastName: String,
  race: String,
  personalities: [String],
  ideals: [String],
  bonds: [String],
  flaws: [String]
})


module.exports = mongoose.model('NPC', NPCSchema)
