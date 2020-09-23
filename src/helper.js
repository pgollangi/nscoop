const { GithubInstaller } = require("./installers/github")

function getInstaller(repo) {
    return GithubInstaller;
}


class Matcher {
    /**
     * 
     * @param {string[]} matchers 
     */
    constructor(matchers) {
        this.matchers = matchers
    }
    /**
     * 
     * @param {string} name 
     */
    match(name) {
        name = name.toLowerCase()
        return this.matchers.find(m => m.indexOf(name))
    }
}

const platforms = {
    win32: new Matcher(["windows"]),
    linux: new Matcher(["linux"]),
    darwin: new Matcher(["darwin", "macos"])
}

const archs = {
    x32: new Matcher(["i386", "386"]),
    x64: new Matcher(["x86_64", "amd64"]),
}

class BinaryMatcher {
    /**
     * 
     * @param {string} platform 
     * @param {string} arch 
     */
    constructor(platform, arch) {
        this.platform = platform;
        this.arch = arch;
    }

    /**
     * 
     * @param {string} name 
     */
    match(name) {
        var p = platforms[this.platform]
        if (!p) {
            throw "Unsupported platform " + this.platform
        }
        if (!p.match(name)) {
            return false;
        }
        var a = archs[this.arch]
        if (!a) {
            throw "Unsupported OS architecture " + this.arch
        }
        return a.match(name)
    }
}

function findBinary(binaries, namer, platform, arch) {
    if (!platform) {
        platform = process.platform
    }
    if (!arch) {
        arch = process.arch
    }
    var matcher = new BinaryMatcher(platform, arch)
    var names = binaries.map(namer)

    var found = binaries.find(b => matcher.match(namer(b)))
    return found
}

exports.getInstaller = getInstaller;

exports.findBinary = findBinary;

