const yargs = require('yargs')

yargs // eslint-disable-line
  .command({
    command: 'deleter <amount> <interval>',
    aliases: ['d'],
    desc: 'Delete newer db articles',
    handler: async (argv) => {
      const Deleter = require('./src/utils/deleter')
      await Deleter.run(argv.amount, argv.interval)
    },
    builder: (yargs) => yargs
      .positional('amount', {
        alias: 'a',
        type: 'number',
        describe: 'number',
        default: 1,
        demandOption: true
      })
      .positional('interval', {
        alias: 'i',
        type: 'string',
        describe: 'moment interval',
        choices: ['minute', 'hour', 'day'],
        default: 'hour',
        demandOption: true
      })
  })
  .command({
    command: 'sender [source]',
    aliases: ['s'],
    desc: 'Send amqp message',
    handler: async (argv) => {
      const Sender = require('./src/utils/sender')
      await Sender.run(argv.source)
    },
    builder: (yargs) => yargs
      .positional('source', {
        alias: 's',
        type: 'string',
        describe: 'source title',
        default: 'Klix',
        demandOption: false
      })
  })
  .command({
    command: 'changer <old> <new>',
    aliases: ['c'],
    desc: 'Modify articles source',
    handler: async (argv) => {
      const Changer = require('./src/utils/changer')
      await Changer.run(argv.old, argv.new)
    },
    builder: (yargs) => yargs
      .positional('old', {
        alias: 'o',
        type: 'string',
        describe: 'old source title',
        default: 'Cin',
        demandOption: true
      })
      .positional('new', {
        alias: 'n',
        type: 'string',
        describe: 'new source title',
        default: 'CIN',
        demandOption: true
      })
  })
  .command({
    command: 'remover <source>',
    aliases: ['r'],
    desc: 'Remove source',
    handler: async (argv) => {
      const Remover = require('./src/utils/remover')
      await Remover.run(argv.source)
    },
    builder: (yargs) => yargs
      .positional('source', {
        alias: 's',
        type: 'string',
        describe: 'source title',
        default: 'Cin',
        demandOption: true
      })
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv
