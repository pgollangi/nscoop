![Build](https://github.com/pgollangi/nscoop/workflows/Build/badge.svg)

# nscoop 

Install portable cross-platform executable binaries via NPM.

## What does it mean?
When building a cross-compiled portable binaries which works on Windows, Linux, Mac etc., how to distribute them to users? When a new release published, how to let users update the binary?

`nscoop` makes it easy to install or update binaries directly from github releases.

## But, Why NPM?
- NPM already installed on almost developers 
- Works across any platform.
- NPM makes binary available on `$PATH`. Your app works immeditly after installation. 

## How does `nscoop` work?
`nscoop` identifies and downloads the right binary for the current oparating system from latest releases of the Git repo provided, and creates symlink to the executable binary using [npm-bin](https://docs.npmjs.com/cli/bin.html) which makes the command available for use.

## Requirements
 - npm

## Installation
```console
// Install nscoop
$ npm install -g nscoop
// Install any binary on github repo
$ nscoop install pgollangi/netselect

```
## Inspriration
- [Scoop](https://scoop.sh/)
- [Homebrew](https://brew.sh/)

## What kind of apps can `nscoop` install?
If you have a public git repo available on github which releases portable binaries. Thats all you need to make those binaries installed on any OS using `nscoop`.

## Author
[Prasanna Kumar](https://pgollangi.com)
