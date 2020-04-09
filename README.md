[![version](https://img.shields.io/github/release/greymass/anchor/all.svg)](https://github.com/greymass/anchor/releases)
[![issues](https://img.shields.io/github/issues/greymass/anchor.svg)](https://github.com/greymass/anchor/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/anchor/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/anchor/total.svg)

# Anchor - A feature rich, open-source, EOSIO Wallet

### Features

## Download Anchor

### Releases

Current 1.0.0 release downloads:

- [Windows Installer](https://github.com/greymass/anchor/releases/download/v1.0.0/win-anchor-1.0.0.exe)
- [macOS Package](https://github.com/greymass/anchor/releases/download/v1.0.0/mac-anchor-1.0.0.dmg)
- [Linux (deb)](https://github.com/greymass/anchor/releases/download/v1.0.0/linux-anchor-1.0.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/anchor/releases/download/v1.0.0/linux-anchor-1.0.0-amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/greymass/anchor/releases](https://github.com/greymass/anchor/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`anchor-***.dmg`) or ZIP (`anchor-***-mac.zip`) file.
- **Windows User**: Download the EXE (`anchor-***.exe`) file.
- **Linux User**: Download either the SNAP (`anchor-***-_amd64.snap`) or DEB (`anchor-***-_amd64.deb`) file

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/greymass/anchor.git anchor
cd anchor
npm install
cd app
npm install
cd ..
```

Then, depending on what OS you use, either:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

If you are building a binary, it must be compiled from the target OS. Windows builds need to be built on Windows, etc.

The files built will be located in the `releases` folder within the root project folder.

### Running in development mode

```
git clone https://github.com/greymass/anchor.git anchor
cd anchor
npm install --frozen-lockfile
cd app
npm install --frozen-lockfile
cd ..
npm run dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)
