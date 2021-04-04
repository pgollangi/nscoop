const os = require('os')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const logSymbols = require('log-symbols')
const uniqueFilename = require('unique-filename')
const progress = require('progress-stream')
const cliProgress = require('cli-progress')

const { Installer } = require('./installer')

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
    const repoURL = this.getRepoURL()
    console.log(`Repository: ${repoURL}`)
    const latestRelease = this.getLatestReleaseURL()

    return fetch(latestRelease).then(res => {
      const body = res.json()
      if (res.ok) {
        return body
      }
      if (res.status === 404) {
        throw new Error('No releases found or unknown github repository.')
      }
      return body.then(e => {
        throw new Error(e.message)
      })
    }).then(release => {
      console.log(logSymbols.success, `Latest release: ${release.name} (tag: ${release.tag_name})`)
      return release.assets
    }).then(assets => {
      const asset = findBinary(assets, a => a.name)
      this.archiveName = asset.name
      console.log(logSymbols.success, `Found suitable binary for your platform - ${this.archiveName}`)
      return asset.browser_download_url
    }).then(fetch).then(this.downloadArchive.bind(this)).then(archive => {
      console.log(logSymbols.success, `Extracting archive ${this.archiveName}`)
      const binary = getBinaryFromArchive(archive)
      return binary
    }).then(this.createShim)
  }

  /**
   *
   * @param {fetch.Response} responseStream
   * @param {string} output file path
   */
  downloadArchive (res, output) {
    if (!output) {
      output = uniqueFilename(os.tmpdir())
    }
    console.log(logSymbols.success, `Downloading archive ${this.archiveName}`)

    const contentLength = res.headers.get('content-length')

    const bar = new cliProgress.SingleBar({
      format: `${this.archiveName} |  {bar} | {percentage}% | ETA: {eta_formatted} | {value}/{total}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
      stopOnComplete: true,
      clearOnComplete: true
    })
    bar.start(contentLength, 0, {
      speed: 'N/A'
    })

    const progressStream = progress({ time: 100 })

    progressStream.on('progress', function (progress) {
      bar.update(progress.transferred)
    })

    return new Promise((resolve, reject) => {
      const archive = fs.createWriteStream(output)
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
    console.log(logSymbols.success, 'Creating shim ', binaryPath)
    return path.basename(binaryPath)
  }
}

exports.GithubInstaller = GithubInstaller
