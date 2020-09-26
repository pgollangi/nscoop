const Command = require('./command')

class UnInstallCommand extends Command {
  constructor () {
    super('uninstall <repo>', 'Uninstall binary installed by nscoop', 'un')
    this.addExample('nscoop uninstall pgollang/fastget')
  }

  execute (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode)
  }
}

exports = module.exports = UnInstallCommand
