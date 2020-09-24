const decompress = require('decompress')
const path = require('path')

const { GithubInstaller } = require('./installers/github')

function getInstaller (repo) {
  return GithubInstaller
}

class Matcher {
  /**
     *
     * @param {string[]} matchers
     */
  constructor (matchers) {
    this.matchers = matchers
  }

  /**
     *
     * @param {string} name
     */
  match (name) {
    name = name.toLowerCase()
    return this.matchers.find(m => name.indexOf(m) !== -1)
  }
}

const PLATFORMS = {
  win32: new Matcher(['windows']),
  linux: new Matcher(['linux']),
  darwin: new Matcher(['darwin', 'macos'])
}

const ARCHS = {
  x32: new Matcher(['i386', '386']),
  x64: new Matcher(['x86_64', 'amd64'])
}

class BinaryMatcher {
  /**
     *
     * @param {string} platform
     * @param {string} arch
     */
  constructor (platform, arch) {
    this.platform = platform
    this.arch = arch
  }

  /**
     *
     * @param {string} name
     */
  match (name) {
    var p = PLATFORMS[this.platform]
    if (!p) {
      throw new Error('Unsupported platform ' + this.platform)
    }
    if (!p.match(name)) {
      return false
    }
    var a = ARCHS[this.arch]
    if (!a) {
      throw new Error('Unsupported OS architecture ' + this.arch)
    }
    return a.match(name)
  }
}

function findBinary (binaries, namer, platform, arch) {
  if (!platform) {
    platform = process.platform
  }
  if (!arch) {
    arch = process.arch
  }
  var matcher = new BinaryMatcher(platform, arch)
  var found = binaries.find(b => matcher.match(namer(b)))
  return found
}

/**
   *
   * @param {string} archive
   */
function getBinaryFromArchive (archivePath) {
  return decompress(archivePath, 'dist', {
    filter: file => {
      var ext = path.extname(file.path)
      return ext === '.exe' || ext === ''
    }
  }).then(files => {
    return files[0].path
  })
}

exports.getInstaller = getInstaller

exports.findBinary = findBinary
exports.getBinaryFromArchive = getBinaryFromArchive
