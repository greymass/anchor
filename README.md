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

Current 0.3.2 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.2/win-eos-voter-0.3.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.2/mac-eos-voter-0.3.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.deb
715b3d4a446bab2e1d9278b6783d911509bd87f31c905b556ba94f98830dce9c920d6663eb1ca588fbcc8f0b6646a75d6ab0daad1edfe23672dcbb2bc45ab5fc *linux-eos-voter-0.3.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.snap
ba3e60950dd9d87a46e35179d178eecb08ed6f2f46829c04cee4f8f61a04be65ec6e367b340a8d81060e96ff30ede7769bb38a993022aa13bfa823a421537147 *linux-eos-voter-0.3.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.2-arm64.deb
056cff9e11066d6cb7ec97cda586daa572c3d71e62f76603055fe2ffc477417051b3b6c4c573b08fa01551cb1294d025e1818fd40de94bb1eefd971259a5c9e3 *linux-eos-voter-0.3.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-armv7l.deb
e6c7bc7e2b958c8a85c5db568ab8fc409d7c324eff5136dc2e98e3caa761b74ff69a188b42c47fcb7da3b867e276e4962e8f6b3734bb1db9f0c48a5f42ab7d66 *linux-eos-voter-0.3.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.2-i386.deb
92b908f5906553877856640de7eb39256f4451f38f7cdd1178443fe302cad9272a325974b5a5e14df5074018a4c6a525e896cabefffaf4e3e5850726f599dfad *linux-eos-voter-0.3.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.2-x86_64.AppImage
9e46b5a1753ade0d26cfc7f17829ea476cebbc32596ce4637e827e41f245c6c1914952926606c58b27e4d27f99465914c7c88686e8e85c154ce68db9bfac0f4a *linux-eos-voter-0.3.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.2.dmg
0f8e1e8e69291c0686bd95fa25846aaa5f0fa8a4bf193cece54d1ac09aa51acd3bfc7f1eda2485992b9df083bb03b4e2cac62ef71f798f8646a8f3c499ca36c9 *mac-eos-voter-0.3.2.dmg
shasum -b -a 512 mac-eos-voter-0.3.2.zip
23877286bd0f98d8747d23fe49521ccd52963ba49d6b24283083a61ca591ab6a015190184641f35d04cb5d8d8fd45210c5861d7709b95d6492d79c7b8d5ba216 *mac-eos-voter-0.3.2.zip
shasum -b -a 512 win-eos-voter-0.3.2.exe
7c919e9f7d600abd57113544a4b13d7153e2fce95795093f7e57fcd6e37e802e6a429d2e69a78ab9860127524fc70802e785a428deac3eab79b09b4b12ae08ed *win-eos-voter-0.3.2.exe
```
