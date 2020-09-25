const os = require('os')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const uniqueFilename = require('unique-filename')
const progress = require('progress-stream')
const cliProgress = require('cli-progress')

const { Installer } = require('../installer')

const { findBinary, getBinaryFromArchive } = require('../helper')

class GithubInstaller extends Installer {
  canInstall (repo, options) {
    return true
  }

  getRepoURL () {
    return `https://github.com/${this.repo}`
  }

  getLatestReleaseURL () {
    return `https://api.github.com/repos/${this.repo}/releases/latest`
  }

  install () {
    var repoURL = this.getRepoURL()
    console.log(`Repository: ${repoURL}`)
    var latestRelease = this.getLatestReleaseURL()

    var archiveName
    return fetch(latestRelease).then(res => {
      const body = res.json()
      if (res.ok) {
        return body
      }
      if (res.status === 404) {
        throw new Error('No releases found or unknow github repository.')
      }
      return body.then(e => {
        throw new Error(e.message)
      })
    }).then(release => {
      console.log(`Latest release: ${release.name} (tag: ${release.tag_name})`)
      return release.assets
    }).then(assets => {
      const asset = findBinary(assets, a => a.name)
      archiveName = asset.name
      console.log(`Found suitable binary for your platform - ${archiveName}`)
      return asset.browser_download_url
    }).then(fetch).then(this.saveArchive).then(archive => {
      console.log(`Extracting archive ${archiveName}`)
      const binary = getBinaryFromArchive(archive)
      return binary
    }).then(this.createShim)
  }

  /**
   *
   * @param {fetch.Response} responseStream
   * @param {string} output file path
   */
  saveArchive (res, output) {
    if (!output) {
      output = uniqueFilename(os.tmpdir())
    }

    const contentLength = res.headers.get('content-length')

    const bar = new cliProgress.SingleBar({
      format: 'Downloading.. |  {bar} | {percentage}% | Speed: {speed}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    })
    bar.start(contentLength, 0, {
      speed: 'N/A'
    })

    const progressStream = progress({ time: 100 })

    progressStream.on('progress', function (progress) {
      bar.update(progress.transferred)
    })

    progressStream.on('finish', function (progress) {
      bar.stop()
    })

    return new Promise((resolve, reject) => {
      var archive = fs.createWriteStream(output)
      res.body
        .on('error', reject)
        .pipe(progressStream)
        .pipe(archive)
        .on('finish', () => {
          resolve(output)
        })
        .on('error', reject)
    })
  }

  /**
 *
 * @param {string} binaryPath Path to binary extracted from archive
 */
  createShim (binaryPath) {
    console.log('Creating shim ', binaryPath)
  }
}

exports.GithubInstaller = GithubInstaller
