/* eslint-disable no-console */
import program from 'commander'
import chalk from 'chalk'
import updateNotifier from 'update-notifier'
import errorReporter, { initializeErrorReporter } from './errorReporter'
import pkg from '../package.json'
import upload, { UploadError } from './upload'

updateNotifier({ pkg }).notify()
initializeErrorReporter()

program
  .version(pkg.version)
  .command('upload <directory>')
  .description('Upload screenshots')
  .option('-T, --token <token>', 'Repository token')
  .action(async (directory, command) => {
    if (!command.token) {
      console.log(chalk.bold.red('argos-ci: You must provide a repository token using --token.'))
      return
    }

    let json

    try {
      const res = await upload(directory, command.token)
      json = await res.json()
    } catch (error) {
      console.error(chalk.bold.red('argos-ci: Sorry an error happened:\n'))

      if (error instanceof UploadError) {
        console.error(chalk.bold.red(error.message))
      } else {
        errorReporter.captureException(error)
        console.error(chalk.bold.red(error.message))
        console.error(chalk.bold.red(error.stack))
      }

      process.exit(1)
    }

    if (json.error) {
      throw new UploadError(json.error.message)
    }

    console.log(chalk.green(`argos-ci: Build created (id: ${json.id}).`))
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
} else {
  program.parse(process.argv)
}
