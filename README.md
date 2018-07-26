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

Current 0.4.1 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.1/win-eos-voter-0.4.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.1/mac-eos-voter-0.4.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.deb
a767a8a85de0a7b2e7cada4ea9c80ee5610117c8eb9b09b09305671577474a238b5ead10ed9cb32a132fc7ceadf935de4176822788ed4da88fdf015635663aab *linux-eos-voter-0.4.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.snap
1a14c2cfa69500f8534eed13a449835c153424b2a02337e3d7d0d13d1c88d50e4d10d20e2c78ab967653b4896848f3fc47fea4aef2a084076a028313a43bc2fb *linux-eos-voter-0.4.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.1-arm64.deb
7f20c47f724e71ae1c7b4bf130170b33803bfdf83e124bc9f7fd6ab21e5071c7a48a7e5447218cae1e6cd45f32303a314f2c47c32b9b9d2baf61bdb8677cb015 *linux-eos-voter-0.4.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-armv7l.deb
389cf80e3e28e71bfcbd5b8850736b27722edb4063dfc6a450ae9f8a1240d7fd5e39fd13b4cdc6f3f4087e512df98e9e73b1c900e00495cf5608f4b1655ffe09 *linux-eos-voter-0.4.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.1-i386.deb
91c0697bb0b50af607517690c2423f0c07f997eaf4f488800eb7abdb68e26d1c2b36c5c1622c1afaaba150701e864899a250b79679602b729ff8f48859762bb5 *linux-eos-voter-0.4.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.1-x86_64.AppImage
cec2f578ddbb01508327b2c5dab4ee476c8ba141d8a7cc10c5fef3da1bcf83d6e9922588882baa06f00c4e49792c1b166eba14a3658733d8eb1b85aa7539f716 *linux-eos-voter-0.4.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.1.dmg
efdf141a65a65424783f394e712338e57b653e6322d7e08039fe796755211f4d8cde27fa9a0a120abbc338dd360f882f4388dd3022ab94831fea10c09f78e433 *mac-eos-voter-0.4.1.dmg
shasum -b -a 512 mac-eos-voter-0.4.1.zip
ed5a7e73a6f6b6e2716fbb8396713cd3184e17e640bc8b51a4b141b7f50e478b23d26374aed78670fc1d5bf4d5e4bcabc803dedb7679e83c02a5cc004910e603 *mac-eos-voter-0.4.1.zip
shasum -b -a 512 win-eos-voter-0.4.1.exe
6cac7e0cf78e02e10a91fc008cbef02dc4f51e013493d412f1bd412d732371ead7bd770979b890df8f09312ab53003c04787bc7beb1a5fb6ef61551333d74852 *win-eos-voter-0.4.1.exe
```
