const os = require('os')
const fs = require('fs')
const fetch = require('node-fetch')
var uniqueFilename = require('unique-filename')

const Installer = require('../installer').Installer

const { findBinary } = require('../helper')

class GithubInstaller extends Installer {
  getRepoPath () {
    return this.repo
  }

  install () {
    var path = this.getRepoPath()

    fetch(`https://api.github.com/repos/${path}/releases/latest`).then(res => res.json())
      .then(release => release.assets).then(assets => {
        return findBinary(assets, a => a.name).browser_download_url
      }).then(fetch).then(res => res.body).then(this.saveArchive)
  }

  /**
   *
   * @param {NodeJS.ReadableStream} responseStream
   * @param {string} output file path
   */
  saveArchive (responseStream, output) {
    if (!output) {
      output = uniqueFilename(os.tmpdir())
    }
    return new Promise((resolve, reject) => {
      var archive = fs.createWriteStream(output)
      responseStream
        .on('error', reject)
        .pipe(archive)
        .on('finish', () => resolve(output))
        .on('error', reject)
    })
  };
}

exports.GithubInstaller = GithubInstaller
