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

Current 0.2.1 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.1/win-eos-voter-0.2.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.1/mac-eos-voter-0.2.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.1-i386.deb
e713e624711d2ee3d36a3b8ab9b3bf8ad59be1e4c179c2bb78a3bac5b146b2be32fbf859bfcb5e60ba658e8aca89d026d4856942765e0f44bfe11dcaf0ac33f9 *linux-eos-voter-0.2.1-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.deb
d785502fdf8d31c8b6cea10ef8c64a516621fd92282903fd2cabe4fb0e090f4afcbbf7473ee730e46e6c8dc02c31e850162b2fb4c6ed587f89773bb499238385 *linux-eos-voter-0.2.1-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-arm64.deb
eec1efa387c01a18a7ea6f23936ba22396d67d0706de9d40c171117825d463d216f4d0207ff0902372eb2e46022d5bd588ee214802ba88d64b112847df311777 *linux-eos-voter-0.2.1-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-armv7l.deb
55b97236ac80f1f4565b4d74c33e20d6c35e7fbf8ea12f71c023a1a1a5d99412e0496d95efae61dbfb66a4880f2a09940754d653647608cc0d832de271e2d61e *linux-eos-voter-0.2.1-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.snap
3c2cc744eb4c54be508f95cf89ec4b4c05ba81c3d05e15f7689df5d69fa2b8a607a6abcd5934a2f34202342b5bfa052a545ec252822a292e9c160094424182ad *linux-eos-voter-0.2.1-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.1-x86_64.AppImage
e475bf94f6629e5841b57baab10837c3720bb89270db7e53393464305a76b46c9b87d66b8f57c6caacc78291494d65c0f891b59ac0f099eb9b31946b851fff0b *linux-eos-voter-0.2.1-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.1.zip
5692fe1c8c4860f0dff1a5df444258aefc1959709febcddf025e4387e99aa9554d71c6a9839c9ac15d5e0d9e2e79eaf03265a9060dc20325bb03c3c374fd9783 *mac-eos-voter-0.2.1.zip

shasum -b -a 512 win-eos-voter-0.2.1.exe
a7fa929d14820c5534a2b633146dc223396705c9059130504c450fecd061ad789f0c9338c58946cb0a19dac73045d430e1598c387338390f7c1d589cbd50a475 *win-eos-voter-0.2.1.exe

shasum -b -a 512 mac-eos-voter-0.2.1.dmg
bc3a28ae0354bb677fb5a775f1c4d5d624fae519bad5f49f3d9d70161d2e0c2dd19cef6a24b25ec0e0823bf1aafda7a422a9c2178c3bf784138173818b63d6b6 *mac-eos-voter-0.2.1.dmg
```
