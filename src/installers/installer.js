
class Installer {
  constructor (repo, options) {
    if (!repo) throw new Error('Repository cannot be empty!')
    this.repo = repo
    this.options = options
  }

  canInstall (repo) {
    return false
  }
}

exports.Installer = Installer
