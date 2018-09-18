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

Current 0.5.2 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.2/win-eos-voter-0.5.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.2/mac-eos-voter-0.5.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.2/linux-eos-voter-0.5.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.2/linux-eos-voter-0.5.2-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.2-amd64.deb
fbeb348c4af96d117e1e0a9234a6b436a5c5dcdf48b2024645cdea0501bbbd3ebb671dfb95c73f63e8f0ddea9e605032afc89d23df8e8d446c68c4122e158998 *linux-eos-voter-0.5.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-amd64.snap
e5e1e84045510a4e610fd3e6c434795ad658dd7d530cf56f3da2d26d5639b5beeed5a1a3f6ae153958e0be0fb7226ce8948bb34106795ca798142f42b96eb193 *linux-eos-voter-0.5.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.2-arm64.deb
c2d1f283327e0edaf0c538518598d913d506f9d6ebe9775e8cc74939c01f90e808173ce10529bb68c77a479899dba482b8a23b68d80b581ce0bf309fe27a4555 *linux-eos-voter-0.5.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-armv7l.deb
85dbe1c5e6ef70c22ac43237751c1c2a1282260b93fbfb194316e9a7c3d2aed99b01bd760f35b7b9168c73b0879c373c2a6eeab77670df03c935bd8c0f406414 *linux-eos-voter-0.5.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.2-i386.deb
8c7ddb6969fbc53125ebc2869350f6455613906c66282fbb8bd7823a5d47bc7316f9607255ad7e814da6404c943d9467f426f9b2c5221cee98c836155a9775b7 *linux-eos-voter-0.5.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.2-x86_64.AppImage
0e41926e7a131a37d8381a5dfbae6473969c9894d1b958ce7b7f0168a5cfb83637916d9ae1e684075bbb8564d6f22c283dcac7ea45adf6fe84bca497b5475a16 *linux-eos-voter-0.5.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.2.dmg
71b88ff2e75b651767143323cec7057a766fd35fd9a8e8a0ecf98251d35fd5794099c293e1dbee5a90e7141a6fa063d5d08d65e1f4c40a4f3916bf71388f4585 *mac-eos-voter-0.5.2.dmg
shasum -b -a 512 mac-eos-voter-0.5.2.zip
33073469eeb7234d9262fdfe40e7d3f0199265e831cbc20d88986d02918ba6a295bc7533fd7d878ad18c03ae4d6d28b34d98976fe11f20f09dab94eb03de147e *mac-eos-voter-0.5.2.zip
shasum -b -a 512 win-eos-voter-0.5.2.exe
48461512a74cd1d0f9b6f7ed8009b7625900e4c1f26d57dcd8b369cf15ce8a806a0bd305f17a814a09a91ee0abc0872e451673319475b9828f2ab4d9da92f9ad *win-eos-voter-0.5.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJboYkHAAoJECyLxnO05hN9Xn8P/iy/dSbQ3yrSKbhQnXdb/seH
7V7q/9ndvulZHZUuMPTb3vSbKjdff49THKuWXrEw+owyhAywDkv+nUB+F7slNnFp
pJ4V/V4r0l2QNb34feo0k15WlcmV8LzAxvH4fPf2VllMiLHNJvmA6afFt5WpMPjl
W7iJI6upise1ceAfzwhPKYC3vdAgvcEmR2rmdaMPATnid7u61vnJnfmTt5DBOsj2
Qt7cSOQy9zURMywMcQ08uPojSIIGQgSyjiWn9MNWJ5n3yyXnQ5adbV8/po25HS3s
ihlt29kjwR9luf70SfkjWZT6kJGBa3gN5MFt8zJxnTkwjdCJhd8ugH2Brq3nTOD5
z3f+D8lWjFVSB+n78YWjIEc4SN29CSkJnXVZGxKEsOhYE3+/JDLm9lE53LsHNFBp
R1/YAS6t7LkiDeY0VnnOUAJ1jZPzq+hgoNmOFS93GWlSQT9wjgj8bu0akzKij4+x
y/o6TnHbp8DVFxzZvszARLMLBEpcSaM+dUwnha0O+1JlZhhE/lEuUk8VIjqbl7AT
yincUP9FIJLeC35vYcyFObht4VGKuq5OWm7coK/TXFB9SFc4+7cDRTKTnDHByLHc
wNyzad8kkwcGZ+O/kZdGtyHyy5FR84mI1NE1t6BVHQrJY5IKuunsKTg8RG6P7iEe
GuYChabPGlWXyG9Z23Iz
=T+K4
-----END PGP SIGNATURE-----
```
