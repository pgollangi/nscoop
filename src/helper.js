const { GithubInstaller } = require("./installers/github")

function getInstaller(repo) {
    return GithubInstaller;
}


exports.getInstaller = getInstaller;

