class Installer {

    constructor(repo, options) {
        this.repo = repo;
        this.options = options;
    }

    install() {
        githubInstaller.install()
    }

    getArchitecture() {
        var platform = process.platform;
        if (platform.startsWith("win")) {
            return "windows-amd64";
        }
        if (platform.includes("darwin")) {
            return "mac-386";
        }
        if (process.arch.includes("64")) {
            return "linux-amd64";
        }
        return "linux-386";
    }
}



exports.Installer = Installer;