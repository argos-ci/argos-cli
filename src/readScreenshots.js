import path from 'path'
import glob from 'glob'

const readScreenshots = ({ cwd, ignore = [] }) => new Promise((resolve, reject) => {
  glob('**/*.{png,jpg}', {
    cwd,
    ignore,
    nodir: true,
  }, (error, matches) => {
    if (error) {
      reject(error)
      return
    }

    resolve(matches.map(match => path.resolve(cwd, match)))
  })
})

export default readScreenshots
