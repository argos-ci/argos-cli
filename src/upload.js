import fs from 'mz/fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import isDirectory from './isDirectory'
import isReadable from './isReadable'
import readScreenshots, { GLOB_PATTERN } from './readScreenshots'
import config from './config'
import pkg from '../package.json'

export class UploadError extends Error {}

async function upload({
  directory,
  ignore = [],
  token,
}) {
  if (!config.get('branch')) {
    throw new UploadError('Branch missing: use ARGOS_BRANCH to specify it.')
  }

  if (!config.get('commit')) {
    throw new UploadError('Commit missing: use ARGOS_COMMIT to specify it.')
  }

  if (!await isDirectory(directory)) {
    throw new UploadError('The path provided is not a directory.')
  }

  if (!await isReadable(directory)) {
    throw new UploadError('The path provided is not a readable, please check fs rights.')
  }

  const screenshots = await readScreenshots({ cwd: directory, ignore })

  if (screenshots.length === 0) {
    throw new UploadError(`The path provided doesn't contain any image (${GLOB_PATTERN}).`)
  }

  const body = screenshots.reduce((body, screenshot) => {
    body.append('screenshots[]', fs.createReadStream(screenshot))
    return body
  }, new FormData())

  body.append('branch', config.get('branch'))
  body.append('commit', config.get('commit'))
  body.append('token', token)


  return fetch(`${config.get('endpoint')}/builds`, {
    headers: {
      'X-Argos-CLI-Version': pkg.version,
    },
    method: 'POST',
    body,
  })
}

export default upload
