#!/usr/bin/env node

const { program } = require('commander')

const { getInstaller } = require('./src/installers')
const pInfo = require('./package.json')

program
  .version(pInfo.version)
  .description(pInfo.description)

program
  .command('install [repo]')
  .alias('i')
  .description('Install binary from git repository')
  .action(function (repo, options) {
    var installer = getInstaller(repo, options)
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
  }).on('-h, --help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ nscoop install pgollangi/netselect')
  })

program
  .command('uninstall <cmd>')
  .alias('ex')
  .description('Uninstall binary installed by nscoop')
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode)
  }).on('-h, --help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ nscoop uninstall pgollang/fastget')
  })

// must be before .parse()
program.on('--help', () => {
  console.log('')
  console.log('For more about usage:')
  console.log('  $ nscoop help')
})

program.parse(process.argv)

if (!program.args.length) program.help()
