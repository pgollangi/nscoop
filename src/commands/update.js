const Command = require('./command')

class UpdateCommand extends Command {
  constructor () {
    super('update <repo>', 'Updates binary to latest version', 'un')
    this.addExample('nscoop update pgollang/fastget')
  }

  execute (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode)
  }
}

exports = module.exports = UpdateCommand
