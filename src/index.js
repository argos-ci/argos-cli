/* eslint-disable no-console */

import program from 'commander'
import chalk from 'chalk'
import updateNotifier from 'update-notifier'
import errorReporter, { initializeErrorReporter } from './errorReporter'
import pkg from '../package.json'
import upload, { UploadError } from './upload'
import { displayError, displaySuccess } from './display'

updateNotifier({ pkg }).notify()
initializeErrorReporter()

if (process.env.NODE_ENV !== 'production') {
  process.on('exit', (code) => {
    console.info(`exit code: ${code}`)
  })
}

const list = value => value.split(',')

program
  .version(pkg.version)
  .command('upload <directory>')
  .description('Upload screenshots')
  .option('-T, --token <token>', 'Repository token')
  .option('--ignore <list>', 'List of glob files to ignore (ex: "**/*.png,**/diff.jpg")', list)
  .action(async (directory, command) => {
    console.log(`=== argos-cli: uploading '${directory}' directory...\n`)

    if (!command.token) {
      displayError('You must provide a repository token using --token.')
      process.exit(1)
    }

    let json

    try {
      const res = await upload({
        directory,
        token: command.token,
        ignore: command.ignore,
      })
      json = await res.json()

      if (json.error) {
        throw new UploadError(json.error.message)
      }
    } catch (error) {
      displayError('Sorry an error happened:')

      if (error instanceof UploadError) {
        console.error(chalk.bold.red(error.message))
      } else {
        errorReporter.captureException(error)
        console.error(chalk.bold.red(error.message))
        console.error(chalk.bold.red(error.stack))
      }

      process.exit(1)
    }

    displaySuccess('Upload complete!')
    console.log(chalk.green(`build created id: ${json.build.id}`))
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
} else {
  program.parse(process.argv)
}
