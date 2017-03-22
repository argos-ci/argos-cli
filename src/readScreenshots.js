import klaw from 'klaw'
import through2 from 'through2'
import path from 'path'

const AUTHORIZED_EXTENSIONS = ['.png', '.jpg']

const excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) {
    this.push(item)
  }

  next()
})

const excludeNonImages = through2.obj(function (item, enc, next) {
  const extension = path.extname(item.path).toLowerCase()
  if (AUTHORIZED_EXTENSIONS.includes(extension)) {
    this.push(item)
  }

  next()
})

function readScreenshots(directory) {
  return new Promise((resolve, reject) => {
    const screenshots = []

    const stream = klaw(directory)
      .pipe(excludeDirFilter)
      .pipe(excludeNonImages)
      .on('readable', () => {
        let item

        while (item = stream.read()) { // eslint-disable-line no-cond-assign
          screenshots.push(item.path)
        }
      })
      .on('error', error => reject(error))
      .on('end', () => resolve(screenshots))
  })
}

export default readScreenshots
