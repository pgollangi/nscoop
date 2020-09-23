#!/usr/bin/env node

const { program } = require('commander')

const { getInstaller } = require('./src/helper')

program
  .version('0.1.0')
  .description('Install portable cross-platform executable binaries via NPM')

program
  .command('install [repo]')
  .description('Install binary from git repository')
  .action(function (repo, options) {
    var InstallerDef = getInstaller(repo)
    var installer = new InstallerDef(repo, options)
    installer.install()
  }).on('-h, --help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ nscoop install pgollangi/netselect')
  })

program
  .command('uninstall <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode)
  }).on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ deploy exec sequential')
    console.log('  $ deploy exec async')
  })

// must be before .parse()
program.on('--help', () => {
  console.log('')
  console.log('Example call:')
  console.log('  $ custom-help --help')
})

program.parse(process.argv)

if (!program.args.length) program.help()
