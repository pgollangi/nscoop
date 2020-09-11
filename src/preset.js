import { GithubInstaller } from "./installers/github.js"


export function getInstaller(repo) {
    return GithubInstaller;
}

