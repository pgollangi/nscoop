
export default class Installer {

    constructor(repo, options) {
        this.repo = repo;
        this.options = options;
    }

    install() {
        githubInstaller.install()
    }
}
