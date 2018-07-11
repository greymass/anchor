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

Current 0.3.1 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.1/win-eos-voter-0.3.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.1/mac-eos-voter-0.3.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.1-amd64.deb
8022c1206e5a38b3d4f538cbf15a90fc1818c43e3cc0f58c7c73f9dc85e7cd12df20526a298611704d56d8a7429a7bcccc80aac5aba086729cd04f804f51a773 *linux-eos-voter-0.3.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.1-amd64.snap
bce76409ca941d368e7d865d3f6e893ff996e097c7e42a9dd159cb167bab68b8769b9d313b38633e89e1d6dcec180db49f67d8321a9e7a90be21b38958534430 *linux-eos-voter-0.3.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.1-arm64.deb
53e0f2a9c1fe5ff50ec3f8635c5f86aa611840292c1b902379354d6974f2636755059654d2305af43e968f2df90be75bd801125465d40307e3d851dc43a38c7d *linux-eos-voter-0.3.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.1-armv7l.deb
3c547be55efffc83aed3bb91fe6ffd8dab5b0b7460ed5608ac683c0aea4f3257028158eaa4e5db55bdff4d2e97dd0f277104540f5e2e36741db6f4384e27d90b *linux-eos-voter-0.3.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.1-i386.deb
845eb1acc6f5ac9300feeaaec82eb22dc2a4952ee7c7bda772cfee905b6480a5e2974c4be53853441351f33a83960b590aa16c8baaeb346df5ae79e1a177a67f *linux-eos-voter-0.3.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.1-x86_64.AppImage
e224d3618512d2e893e5ddc8cdb0f0e9082e33a8092a817c0ed79b89e2b6979b403c62ed0df012cd8bc13f4cb7dff31e162e09903073d0f4e14833f086106125 *linux-eos-voter-0.3.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.1.dmg
af8b152368a26c01447024fe2f52ec77e3da7c19d0a501cf274769eb7c59760f5fd48c77e95a812e5d15ebcba5e132061ec8ce37fe4893da75a4cdae76650716 *mac-eos-voter-0.3.1.dmg
shasum -b -a 512 mac-eos-voter-0.3.1.zip
7a30cf1390e1f1fa51f0a5cd0ef93f6c0978de3966d3bd5c24c2c66dff9dc00d6d7c3f6434a65c37789c6d86a661877da5388e22470b44327303502b3b62a573 *mac-eos-voter-0.3.1.zip
shasum -b -a 512 win-eos-voter-0.3.1.exe
d8c6b16a787302a83448ce294c66690573b235b5ebbd7afa9b168ed49f9090918030f6c2d161bc3217bf138f10969bb441385a6190e67f730feee8109ccbfa71 *win-eos-voter-0.3.1.exe
```
