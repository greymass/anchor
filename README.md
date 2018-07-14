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

Current 0.3.3 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.3/win-eos-voter-0.3.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.3/mac-eos-voter-0.3.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.snap)

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

### Docker

If you use Docker on Linux, you can run the following commands to build and run the wallet.

```
docker build . -t eos-voter
xhost local:root
docker run -it --rm \
       -e DISPLAY=$DISPLAY \
       -v /tmp/.X11-unix:/tmp/.X11-unix \
       eos-voter
```

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
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.deb
345fe5f90a218fbb2b5d9638a9da56775aec1885a9bf059449f69ec54b54e036caf55becd0c05bf126519e82023f8079a2479deaf091de43fe9e2e33dbe7912d *linux-eos-voter-0.3.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.snap
f6e94469ec9ea4d9e3bcc22d29279722eb4586f5871b74781adcb395dab1c62d15b6ddb5b072cd9c23aad6cc2d0138d27e6bd5efcda27c13eae7f99db5f8dc61 *linux-eos-voter-0.3.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.3-arm64.deb
8ad0d51f4f2019a608093e120cf20814af757fe2d78ac38b7fa169767c3deea94ece99d2cabd8b89e3a6bbd10901a81377c5c8dac22c8f34096df5025b06364a *linux-eos-voter-0.3.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-armv7l.deb
ded0d6db8135ea404e1bda62b62ab4681bb38b9487bd14fdcb7f964c6140b350054bf5c0ce747c07d5ba975ed1952ba1ec588c3505dc7ff5ec2cfaed5c11f004 *linux-eos-voter-0.3.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.3-i386.deb
38259ca723b9104ca19f5006d94d994a1621b48ddfc8d632f835f02ba8faf0bbee23e79eccc7736506b91945710aa5d92f0b539250475c0a557662b1e6dfb009 *linux-eos-voter-0.3.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.3-x86_64.AppImage
80b960ffd41ea249574ec68d63bf3b6293cf8c5179fda7e6b9d39742b6e43f0eb303eb24f2b99361ce1181c4fc03afd43f370cb33a7945baf482d3eb8076d85a *linux-eos-voter-0.3.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.3.dmg
7fb73dea0829fdf070ed8f6e964b95967dac22e683c5707b2df06915663580cc4d741f9ce0b6da3d374f91ddbab7c18c6632b9573e8eadd35c81e25e0e46ca65 *mac-eos-voter-0.3.3.dmg
shasum -b -a 512 mac-eos-voter-0.3.3.zip
76685389d7c6210b536225ef63c7aa42c71d0eb51f2f1e44d178456f3d48ca5e0badc786bc05af50d7d0ecb5069a8aeabdf7f96d8bcf9916b2099a3377392386 *mac-eos-voter-0.3.3.zip
shasum -b -a 512 win-eos-voter-0.3.3.exe
77e3061e01bc6bfd3e62b54a11ff0f7638033ec5f0bd942f10b2359eeed615c1316df3bed1636d60618a7459bc2c5a2ad23cfdf6065ebd01cdf5b01058d8677b *win-eos-voter-0.3.3.exe
```
