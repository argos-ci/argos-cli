import fs from 'mz/fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import readScreenshots from './readScreenshots'
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

  const screenshots = await readScreenshots({ cwd: directory, ignore })

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
