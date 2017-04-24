import fs from 'mz/fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import isDirectory from './isDirectory'
import isReadable from './isReadable'
import readScreenshots, { GLOB_PATTERN } from './readScreenshots'
import config from './config'
import { displayInfo } from './display'
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

  displayInfo(`found ${screenshots.length} screenshots to upload`)

  const body = new FormData()
  body.append('data', JSON.stringify({
    branch: config.get('branch'),
    commit: config.get('commit'),
    token,
    names: screenshots.map(screenshot => screenshot.name),
  }))

  screenshots.reduce((body, screenshot) => {
    body.append('screenshots[]', fs.createReadStream(screenshot.filename))
    return body
  }, body)

  return fetch(`${config.get('endpoint')}/builds`, {
    headers: {
      'X-Argos-CLI-Version': pkg.version,
    },
    method: 'POST',
    body,
  })
}

export default upload
