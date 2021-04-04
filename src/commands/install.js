const Command = require('./command')

const { getInstaller } = require('../installers')

class InstallCommand extends Command {
  constructor () {
    super('install <repo>', 'Install binary from git repository', 'i')
    this.addExample('nscoop install pgollangi/netselect')
  }

  execute (repo, options) {
    const installer = getInstaller(repo, options)
    if (!installer) {
      // no suitable installers found.
      console.log(' nscoop could not install binary from this repository.')
      console.log(' Please raise an FR at github.com/pgollangi/nscoop to get this supported.')
      return
    }
    installer.install().then(res => {
      console.log('Installation success!!')
    }).catch(err => {
      console.log(`ERROR : ${err.message || err}`)
    })
  }
}

module.exports = InstallCommand
