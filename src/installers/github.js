
const https = require('https')
const fs = require('fs')
const fetch = require('node-fetch')
const decompress = require('decompress')

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
      })
  }

  download (url, dest, cb) {
    var file = fs.createWriteStream(dest)
    https.get(url, function (response) {
      response.pipe(file)
      file.on('finish', function () {
        file.close(cb) // close() is async, call cb after close completes.
      })
    }).on('error', function (err) { // Handle errors
      fs.unlink(dest) // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message)
    })
  };
}

exports.GithubInstaller = GithubInstaller
