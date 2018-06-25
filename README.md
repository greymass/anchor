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
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.deb)
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
c14f41e5b2101cccdaa00067a4662c9ce297b4fbd6660f1e4af7ace7ad05e12a1112466b3dc948e77f34178b3c9cdcf7f2678886811f533bb9cafcb20e82b3d0 *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
7ee1e7f44a44315ba433acc7bcbffce083ae8f3e2f2710c61d84097c527be54d529e144b5219c41fcc3d3bd914d31a9d12dcabb224766d547ae5087a6f2c56e2 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
3cca96d529c21b804902e5103aff8572fba2348e6f7aa7f0719a0c2c69da9b1db49b7d2ede3260cf6e12275acfa7711778094b104a760a66ce8975dfc4613e24 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
b5d42aceaf8097604559ca7974eabcc6ab5c975ccf951a79c1e4774de1582636e9853ad29efd171e7091888097c8a5e09668857aaddfaa1a368ddaeacf805daa *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
302ed576e0f6c776e7dbdc1003f14da4f1db8b78d5e5b8db51efdfa90c922411eb6d6693e247aa900b03bc34a70479cae5d7fa9523267ea0f03beab92beb4a02 *linux-eos-voter-0.2.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.0.zip
50b34915924e432b99ad79e72e413432599b6e1a4e1ddeb4bd30b20febf08bd86c25bac1f484feb9771abe51f3ffcf9e90ac917417c1a49f41af44ba271d1008 *mac-eos-voter-0.2.0.zip

shasum -b -a 512 win-eos-voter-0.2.0.exe
b8ed0befb7af56de6481235a4e49502b4fd9b97646d0f4003a75260ebb1c4de9a7c67977cde36d24b9c4bc065ef05d75ad6e0c7e912ebbfccdb2f98d899db6e0 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
f01e64267979991a5f5dac6764015d9fb3d821ed6ffd1f8252faa2e1c64dc498e81a50428fb787135d9ca0e8ff0f2d722953057bb41fb0629e0b6dba6ac6a124 *mac-eos-voter-0.2.0.dmg
```
