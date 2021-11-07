#! /usr/bin/env node
import chalk from 'chalk'
import { program } from 'commander'
import init from './commands/init'

program
    .command('init-ness')
    .argument('<appName>', 'The application name')
    .description('Init Node, Express, Sequlize, Swagger backend code')
    .action((appName: string) => {
        init({ appName })
            .ness()
            .then((r) => {})
            .catch((e) => console.log(chalk.red(e)))
    })

program.parse()
