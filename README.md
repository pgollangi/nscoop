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


## Requirements

## Installation
```
// Install nscoop
$ npm install -g nscoop
// Install any binary on github repo
$ nscoop install pgollangi/netselect

```
## Inspriration
- [Scoop](https://scoop.sh/)
- [Homebrew](https://brew.sh/)

## What kind of apps can `nscoop` install?