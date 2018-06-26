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

Current 0.2.2 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.2/win-eos-voter-0.2.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.2/mac-eos-voter-0.2.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.2-i386.deb
acc63feded2f88e9ff4f2752400bf1a482ca55b87b756aa7376ede3d28aaf72ae4c62da6528b6d2b0eab039195d627ddf80244dc6192d71c55c41cd8ab7de481 *linux-eos-voter-0.2.2-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.deb
26704939f44f463881e2f6c3abcd9b1bb8d268db276fd233c5452468cacf574e1d88724f7e0d407bfea03deff1e6435f6891aa8ee0d045ff92b75f6cc98fe88b *linux-eos-voter-0.2.2-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-arm64.deb
fc43236352d9f6bd661c93f154386b788b227df5ef1e81be7d0345c3a06ba0973561742191a92018091451127dd223bc22014d9a9ad7159b093aae0ea175ceda *linux-eos-voter-0.2.2-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-armv7l.deb
e83c04cef0fee0070f9f2f9e93ad38a357c8d7d3d9c49a0f9efd24c3ebe12ec85676365a6e24eb13a4d904e69c94f41cdda09abeecef6ccedd02c7553ae99acf *linux-eos-voter-0.2.2-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.snap
097942f10b2c4dca49356ff2e83d2c1bea01ef46a422bd1e2b26d64da8c643a78b72bbefb4a7a9aab8c5ef6ec869461d61c11e50cf1abfb01b6240da4d399bea *linux-eos-voter-0.2.2-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.2-x86_64.AppImage
9cc312436528a07d134dd58a9362c8638057354a83752b94f94104444c4d271fa1b38b689f5bc9b02ec43538721ff5f95cc23e6085ee5887d5be48cc58d155f1 *linux-eos-voter-0.2.2-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.2.zip
355e7d18f462d7586af58acdfa7aff4c363e78d78d76a3c2cec9e3525e1c75a79ad988122f9b12337bcc1dfa78dfddec1deb3973aeb7fa5472cb3c036a581e06 *mac-eos-voter-0.2.2.zip

shasum -b -a 512 win-eos-voter-0.2.2.exe
56afe1adfa4dfa1b753db6f87b71f6b929e72003b4db50504e97b67990da067c4157c99062297522c6af067af921106f73375d4974c8e565e44816feabebff78 *win-eos-voter-0.2.2.exe

shasum -b -a 512 mac-eos-voter-0.2.2.dmg
56d17e0561c9ce9d06f9d1d159f5a77889d4ebb08f20e675823d3529c97c82b8108159f5144e171665c793d7ea7dc65e5b2c4bfe195ec0ae10866608855714b3 *mac-eos-voter-0.2.2.dmg
```
