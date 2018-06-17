[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md)

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

Current 0.1.6 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-setup-0.1.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-0.1.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.snap)

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
git clone git@github.com:greymass/eos-voter.git eos-voter
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
git clone git@github.com:greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 eos-voter\ Setup\ 0.1.6.exe
efca4512c724bf3fa02adcdf20b81c55c8f1fc340a468e51825b9c48950af44a51c197998eb4d909a2a58a30e2a94c6a168e0229a7c5e5c93f0e44de0d48e832 *eos-voter Setup 0.1.6.exe

shasum -b -a 512 eos-voter-0.1.6.dmg
40758a8bd5cb21c6f2f730c6559b6c84123016875d4688b9fc617014f07a1b0757d1b3b4a31de580700ce89164b7527bd9f9f56729b178d4c3a05cde4307d33d *eos-voter-0.1.6.dmg

shasum -b -a 512 eos-voter-0.1.6-mac.zip
0546babf79d3630be7f0d1ec442ae27be09bff8eb97b98c9239437645533d6f196ff5fd16a182b2d34b6564434ef742d5686ed04b75c572f0b43fe909f51702a *eos-voter-0.1.6-mac.zip

shasum -b -a 512 eos-voter-0.1.6-x86_64.AppImage
5bdf8205347c9fd8d8663fc42927ad54ee39c69403706b2c5b9b219c1630fdbcd232c359a06c95771b6a01d1d7fc69260753ceb8b048ade8386678c28acaa0a4 *eos-voter-0.1.6-x86_64.AppImage

shasum -b -a 512 eos-voter_0.1.6_amd64.deb
ff503e323242f7f88418268df623e3c495d2b526b785394988b089c65181c49b805587873f0c0543b618dd3797b4847ce1085d9279cb714c161abc4bbdb1b1b6 *eos-voter_0.1.6_amd64.deb

shasum -b -a 512 eos-voter_0.1.6_amd64.snap
af0cf453636fb9021ffd741c58a8cc5fe3e9492c8f7b7fbbd422d57aa38c7e1cb26e359e6de75bb579eb0249afe68f286fb3a6d1e4e17a259d0c7fbad0c83bb9 *eos-voter_0.1.6_amd64.snap
```
