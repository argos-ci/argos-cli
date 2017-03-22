import path from 'path'
import readScreenshots from './readScreenshots'

describe('readScreenshots', () => {
  it('should should keep images (with nesting)', async () => {
    const screenshots = await readScreenshots(path.join(__dirname, '../__fixtures__/screenshots'))
    expect(screenshots).toEqual([
      path.resolve(__dirname, '../__fixtures__/screenshots/penelope.jpg'),
      path.resolve(__dirname, '../__fixtures__/screenshots/nested/alicia.jpg'),
    ])
  })
})
