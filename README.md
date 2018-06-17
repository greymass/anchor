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
shasum -b -a 512 eos-voter Setup 0.1.6.exe
776cacf18c5827b5b9aa15b45e97a7b0a9bd53bbbc1316b7bb3aa8521c4bc8970686fd622ce833d881007c82a8df96def4f650f8b0a39908807fef1366a910d4 *eos-voter Setup 0.1.6.exe

shasum -b -a 512 eos-voter-0.1.6.dmg
77b95742e08510e0faf92dafceb764298f4c7c78293aa9f698e543406011586c5edde38acadb7ae7ea71d5814dfe80aca79eb55a23d67c3f061a7bda9275e133 *eos-voter-0.1.6.dmg

shasum -b -a 512 eos-voter-0.1.6-mac.zip
30b41d9064a717c1ea062e922992069e4ab2d6e13a8f63dd9c444fe08dbe8dc6e4bd7c72dd3e791005b0ebbdd4ee9263e4bc6b48953e8bfac5c58d5ad3ecf0a5 *eos-voter-0.1.6-mac.zip

shasum -b -a 512 eos-voter-0.1.6-x86_64.AppImage
79ef9a2de2bcc429e3381bca8d4fe78df2fc0937807edad2e8f81df0c1ef4d5305881a6c73ba972a98ca4c356dfe99313b56ec3c5cd036e6b96e1132f6616c60 *eos-voter-0.1.6-x86_64.AppImage

shasum -b -a 512 eos-voter_0.1.6_amd64.deb
24f379351f9262942ea31a52e9a662be3696032a9b24e82b8036bad617f688d853891dfc910ce3607beef3ef26563789784f962be78e1cbaa502e693ba7839fe *eos-voter_0.1.6_amd64.deb

shasum -b -a 512 eos-voter_0.1.6_amd64.snap
74f9f0e4096978118d3b0883efdc7c8b377673a2f7ae4a3abd459b53471b6d77927ef54f0a85ad3bb459d767a3340a181ba87ea57812a1a3d7e21f63a25d0cf9 *eos-voter_0.1.6_amd64.snap
```
