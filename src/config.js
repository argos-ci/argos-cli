import path from 'path'
import convict from 'convict'

const config = convict({
  endpoint: {
    doc: 'Argos API endpoint',
    format: 'url',
    default: 'https://api.argos-ci.com',
    env: 'ARGOS_API_ENDPOINT',
  },
  commit: {
    doc: 'Git commit',
    format: String,
    default: '',
    env: 'ARGOS_COMMIT',
  },
  branch: {
    doc: 'Git branch',
    format: String,
    default: '',
    env: 'ARGOS_BRANCH',
  },
  token: {
    doc: 'Repository token',
    format: String,
    default: '',
    env: 'ARGOS_TOKEN',
  },
})

const NODE_ENV = process.env.NODE_ENV || 'development'

if (NODE_ENV !== 'production') {
  config.loadFile(path.join(__dirname, `../config/${NODE_ENV}.json`))
}
config.validate()

export default config
