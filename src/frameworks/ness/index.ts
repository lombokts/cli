import chalk from 'chalk'
import { Command } from 'commander'
import NessAction from './action'

const Ness = new Command('ness')

Ness.command('init')
    .description('Init Node, Express, Sequlize, Swagger (NESS) project')
    .alias('i')
    .argument('<appName>', 'The application name')
    .action((appName: string) => {
        NessAction({ appName })
            .init()
            .then((r) => {})
            .catch((e) => console.log(chalk.red(e)))
    })
export default Ness
