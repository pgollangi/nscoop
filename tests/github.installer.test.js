const { PassThrough } = require('stream')
const fs = require('fs')

const { GithubInstaller } = require('../src/installers/github')

const latestResponse = require('./data/github.latest.release.json')

// jest.mock('fs')
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

fetchMock
  .get('https://api.github.com/repos/pgollangi/nscoop-mock/releases/latest', latestResponse)
  .get('begin:https://github.com/pgollangi/nscoop-mock/releases/download/',
    fs.createReadStream('./tests/binaries/program_1.0.0_windows_amd64.zip'),
    { sendAsJson: false })

describe('github.installer', () => {
  const installer = new GithubInstaller('pgollangi/nscoop-mock')

  it('install', async () => {
    await expect(installer.install()).resolves.toContain('program')
    expect(fetchMock).toHaveFetched('https://api.github.com/repos/pgollangi/nscoop-mock/releases/latest')
  })

  it.skip('saveArchive', async () => {
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
