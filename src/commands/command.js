class Command {
  constructor (nameAndArgs, description, ...aliases) {
    this.nameAndArgs = nameAndArgs
    this.aliases = aliases
    this.description = description
    this.examples = []
  }

  /**
   *
   * @param {string} example An exmaple of command usage
   */
  addExample (example) {

  }

  execute () {
    console.log('Execute not implemented!!')
  }

  help () {
    console.log('')
    if (this.examples > 0) {
      console.log('Examples:')
      console.log('')
      this.examples.forEach(e => {
        console.log(`  $ ${e}`)
      })
    }
  }
}

module.exports = Command
