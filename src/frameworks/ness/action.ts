import chalk from 'chalk'
import { execSync } from 'child_process'
import fs from 'fs'
import { askQuestion, initDir, rl } from '../../helpers/functions'
import { NessStructure } from './structure'

const actions = (props: InitProps) => {
  const init = async () => {
    if (!props.appName) {
      const appName: string = await askQuestion('Application  name: ')
      props.appName = appName.replace(' ', '')
    }
    if (fs.existsSync(props.appName)) {
      console.log(
        chalk.red.bold('Your'),
        chalk.green.bold(props.appName),
        chalk.red.bold('is already exist!')
      )
      console.log(chalk.red.bold('Aborting'))
      rl.close()
      return
    }
    props.dbUser = await askQuestion('Postgres Username : ')
    props.dbPass = await askQuestion('Postgres Password : ')
    props.swaggerUser = await askQuestion('Swagger Username  : ')
    props.swaggerPass = await askQuestion('Swagger Password  : ')
    fs.mkdirSync(props.appName)
    const workingDir = process.cwd()
    const appDir = workingDir + '/' + props.appName
    initDir(NessStructure, props, appDir)
    process.chdir(appDir)
    execSync('git init')
    rl.close()
    console.log(chalk.green('Your awesome app is ready!'))
    console.log('run this command below to start:\n')
    console.log(
      chalk.yellow.bold('cd ' + props.appName + ' && yarn install')
    )
    console.log('')
    console.log(
      'to build your project, use:\n',
      chalk.yellow.bold('yarn build')
    )
    console.log('')
    console.log(
      'to dockerize your project, use:\n',
      chalk.yellow.bold('make docker')
    )
    console.log('')
    console.log('')
    console.log(
      chalk.bgBlue.white('  Lombok  ') +
      chalk.bgWhite.blue('  TS  ') +
      ' Community 2021'
    )
    console.log('')
    console.log('')
  }
  return {
    init
  }
}

export default actions
