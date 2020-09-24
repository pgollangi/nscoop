const { PassThrough } = require('stream')
const fs = require('fs')
const { GithubInstaller } = require('../src/installers/github')

jest.mock('fs')

describe('github.installer', () => {
  const installer = new GithubInstaller('github.com/pgollangi/nscoop')

  it('saveArchive', async () => {
    // Arrange
    const mockReadable = new PassThrough()
    const mockWriteable = new PassThrough()
    const mockError = new Error('You crossed the streams!')

    fs.createWriteStream.mockReturnValueOnce(mockWriteable)

    const actualPromise = installer.saveArchive(mockReadable)

    // setTimeout(() => {
    //   mockReadable.emit('error', mockError)
    // }, 100)

    mockReadable.emit('error', mockError)

    // Act & Assert
    await expect(actualPromise)
      .rejects.toEqual(mockError)
  })
})
