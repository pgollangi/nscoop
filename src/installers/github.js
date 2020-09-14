
import https from "https"
import fs from "fs"

import fetch from "node-fetch"
import tar from "tar"

import Installer from "../installer.js"


export class GithubInstaller extends Installer {

    constructor(repo, options) {
        super(repo, options)
    }

    getRepoPath() {
        return this.repo;
    }

    install() {
        var path = this.getRepoPath()

        let ungz = zlib.createGunzip();
        let untar = tar.Extract({ path: opts.binPath });

        fetch(`https://api.github.com/repos/${path}/releases/latest`).then(res => res.json())
            .then(release => release.assets).then(fetch).then(ungz)(untar)
    }

    getAssetForCurrentPlatform(assets) {
        return findAssetForCurrentPlatform(assets, asset => asset.name).browser_download_url
    }

    findAssetForCurrentPlatform(assets, getName) {
        assets.find()
    }

    download(url, dest, cb) {
        var file = fs.createWriteStream(dest);
        https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(cb);  // close() is async, call cb after close completes.
            });
        }).on('error', function (err) { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            if (cb) cb(err.message);
        });
    };

}