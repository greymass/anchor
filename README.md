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

Current 0.4.0 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.0/win-eos-voter-0.4.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.0/mac-eos-voter-0.4.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.deb
7561c25d8931025434233ca10f31d0f63e2e0941870e57518ccb60fafdd42fe56ab6796fb557bfd97d0855d80d8ed3e328c007eecb7aa57d952da672edc5bfbf *linux-eos-voter-0.4.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.snap
db2efc19a06f9d51ba40aaaf06f28f93b9867296a2707adee98dd145871eb3cb57f9d12438f295c09481957b366f9e59346d0e42cf9208c852ca4ced1fbaa2f5 *linux-eos-voter-0.4.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.0-arm64.deb
4c5567a7917e951df14bb7ac9c53afacce8e4d7b93a8ff14024ec4b60651b4eaaae54f8418b25a91c22e6010c555d967bc5f8bfcf33a72822d04ce8b9f0e375d *linux-eos-voter-0.4.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-armv7l.deb
1956e33dd7f4a70c1fa1e008a9f652590a917c399902ad3acd47c4520499808bb5b027f3d14ed797eeda65eed4d6a89d0e8afc3df0eb093e3475eacf3388bf3e *linux-eos-voter-0.4.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.0-i386.deb
a77842c747d4a71f2d073db112e344bcbe2c006acdf02aa43cef2aebc159c418c393ffba7cb5f29a57c0d5e86a9a7b3bebe75c3d3882aabfdef0bab3d98ccdd2 *linux-eos-voter-0.4.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.0-x86_64.AppImage
c81d8ddb03a4c6ab5af8c00b7802dec4ea04dfe6044a9cd28e2c589a1011a33faf94bbe2ac1eecdde896f89dbf9031346687e3eb96fd553060f5eb5f72443778 *linux-eos-voter-0.4.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.0.dmg
82824383e2bae3338880d5f9278abd0dd97b0dbc6c4c640eec602c87c3ced1d2e65267dea66b211334a28f214a2e43c47c40016dc7b58e2cd2e0628a5f837b1a *mac-eos-voter-0.4.0.dmg
shasum -b -a 512 mac-eos-voter-0.4.0.zip
7cffcbeac3b89edc55376e95b014efdf4af25e5471128ecbce7ec4ac7cc0252e6ea61cf76a337536687c2278f939a6c25cf6aaf1d8a04252c26233c627a24729 *mac-eos-voter-0.4.0.zip
shasum -b -a 512 win-eos-voter-0.4.0.exe
2e535c7f0cc93cfba5f40cae5df3d8f294bed08e0dcc48bfe6d6176c667f7586032c19c22d0c8125acc048a87c28ad0a41ca1aaaaa7bf6ff7568e03a5926e1cc *win-eos-voter-0.4.0.exe
```
