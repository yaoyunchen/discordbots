class Die {
  constructor(sides) {
    this.sides = sides
  }


  rollDie() {
    return 1 + Math.floor(Math.random() * this.sides)
  }


  roll({ rolls }) {
    const output = []

    for (let i = 0; i < rolls; i += 1) {
      output.push(this.rollDie())
    }

    return output
  }
}


const schema = `
  type Die {
    sides: Int!
    rollDie: Int!
    roll(rolls: Int): [Int]
  }
`


const root = {
  getDie: ({ sides }) => new Die(sides || 6)
}


const query = `
  getDie(sides: Int): Die
`


module.exports = {
  schema,
  root,
  query
}
