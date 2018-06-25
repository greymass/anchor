[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

# eos-voter - EOS Block Producer Voting & Wallet

`eos-voter` is a limited-functionality release of a light wallet being designed for the EOS blockchain. This application can be used to connect to a remote EOS API endpoint to perform producer voting actions and a few basic wallet commands.

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### Features

- **Block Producer Voting**: Select which block producers to support and cast your vote. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer EOS or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your EOS as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get eos-voter

### Releases

Current 0.2.0 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.0/win-eos-voter-0.2.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.0/mac-eos-voter-0.2.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.snap)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/greymass/eos-voter/releases](https://github.com/greymass/eos-voter/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`eos-voter-***.dmg`) or ZIP (`eos-voter-***-mac.zip`) file.
- **Windows User**: Download the EXE (`eos-voter-***.exe`) file.
- **Linux User**: Download either the SNAP (`eos-voter-***-_amd64.snap`) or DEB (`eos-voter-***-_amd64.deb`) file

### Security: Private Keys

When using `eos-voter`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/greymass/eos-voter/blob/master/nodes.md](https://github.com/greymass/eos-voter/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 linux-eos-voter-0.2.0-i386.deb
26fbfb5e23cc19c0cc995a86f6c5060b7f99f7fd6af8b50ca771028245b298f8ddffe59925d73ee65d88b4ff10096488abf5b22ced87a27c6f5bcadc6ff870fc *linux-eos-voter-0.2.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.deb
7eaf225b8267616407af0d494b1c6df2029fa15f85d680ad8a8a3e73c12f7d59b2611298cd4e9c73e2bd103facc4abab7ec15bf2d7bf1f4bf58dab76a3337a5b *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
99591a3391782a213c65bf73e172afe4bec043de3ef41565b4979b583ece9b944087556c5c58693d4ff543e6a07d6e3a1ba8401d0f5b6e555fd6a4410e787364 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
12c6ca7ca66a4d6e8409d6506360632ac3a6eaeaf5f85b22c32cc8f1d960ff2110a1ef9a1518ffca44f2f76ff7ae4e60f226ba2090125c0bb0023ab189e0ed59 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
a1b484aa7c42d93d207a1ba41d744da461ce71e6982d7827096f3b35ed0584712ec5e3765e439ff344ec73482c8cbe18cb6814c3bc0a863991eb62d466dbd9f6 *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
43f6df8c9e187cc02dfcfd6c3ac2e7ea3945ead44a29ad8d8a08585e855ff94b51b2486e76b633bfce1bf5f88e530e0d4896e75136661d66ae7f7a6310c8d9c9 *linux-eos-voter-0.2.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.0.zip
shasum: mac-eos-voter-0.2.0.zip:

shasum -b -a 512 win-eos-voter-0.2.0.exe
b8ed0befb7af56de6481235a4e49502b4fd9b97646d0f4003a75260ebb1c4de9a7c67977cde36d24b9c4bc065ef05d75ad6e0c7e912ebbfccdb2f98d899db6e0 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
f01e64267979991a5f5dac6764015d9fb3d821ed6ffd1f8252faa2e1c64dc498e81a50428fb787135d9ca0e8ff0f2d722953057bb41fb0629e0b6dba6ac6a124 *mac-eos-voter-0.2.0.dmg
```
