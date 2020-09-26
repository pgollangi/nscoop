const InstallCommand = require('./install')

const UnInstallCommand = require('./uninstall')

const commands = [new InstallCommand(), new UnInstallCommand()]

exports = module.exports = commands
