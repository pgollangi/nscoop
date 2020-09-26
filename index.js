#!/usr/bin/env node

const { program } = require('commander')

const commands = require('./src/commands')

const pInfo = require('./package.json')

program
  .version(pInfo.version)
  .description(pInfo.description)

for (const c of commands) {
  program
    .command(c.nameAndArgs)
    .aliases(c.aliases)
    .description(c.description)
    .action(function (...args) {
      c.execute(args)
    })
    .on('-h, --help', function () {
      c.help()
    })
}

program.on('--help', () => {
  console.log('')
  console.log('For more about usage:')
  console.log('  $ nscoop help')
})

program.parse(process.argv)

if (!program.args.length) program.help()
