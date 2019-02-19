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

Current 0.7.3 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.3/win-eos-voter-0.7.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.3/mac-eos-voter-0.7.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.snap)

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
npm install
cd app
npm install
cd ..
```

Then, depending on what OS you use, either:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

If you are building a binary, it must be compiled from the target OS. Windows builds need to be built on Windows, etc.

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
cd app
npm install
cd ..
npm run dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.7.3-amd64.deb
3d0358e1fe63e5739218f748f2436b8f8754e9442dff8e3a7a0081a8ecabd41ab276bdf6cf0246344fc7f635cdc72cf0f2a583c2c392afb8a6eb14d4f087bde4 *linux-eos-voter-0.7.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-arm64.deb
8968ba9f9c5ad2d61da1bf6bc4624317a9accf93d9988143f1871259a1f25bb11115a457334da894393d8d859505f54359518fd7a2b9ab985105d63ec589af64 *linux-eos-voter-0.7.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-armv7l.deb
b8eb83776671b0b5df6bdb2aed74ee12e5922d00c6012fbcc7d0eb9da32ff9eddc672eaecfc6a5dd7074d190e18d94b6cf0db324a5e1fb8c974fdd12e036132f *linux-eos-voter-0.7.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.3-x86_64.AppImage
b9242ba351b839994b3d0aeeb5c937cf2ef624c859c24aea07ae3c8d5a42530dc984c7c50f71963bc8227be101a278c83f070b5044af9d9a2bc9e456e0c92ff7 *linux-eos-voter-0.7.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.3.dmg
91005c6409de1468a948f63638caa21b6323342debf1a71262d56d6efa7a7bf1ad9bb920c680649a304c9a9d57e87f6376f82b0574e51c51f44393fdd440b95b *mac-eos-voter-0.7.3.dmg
shasum -b -a 512 mac-eos-voter-0.7.3.zip
cca60b96d8fc41eddd22d421f353bc9929499245fe62fb42de4f8baf21e9445635ddeebf305908f82876b6de04aa7d8cc818e0b654833fcfcd0e78c9c1273314 *mac-eos-voter-0.7.3.zip
shasum -b -a 512 win-eos-voter-0.7.3.exe
f7f9b00c82ae668979a4f4ad9bc8d76f59a0e5a102154cc170e4c0d6433ae3f6e21c996c112f57e95e90574195e3d879684f32280595486862dc794c215f8742 *win-eos-voter-0.7.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcUMZtAAoJECyLxnO05hN907MQAJ+tDGrVaSjHWSyRxP31hRLF
v3E/FIYV8IKMGgnMfayXe/9TKKCMZ/hDS6qglD4azOIWDGztcaI+pVpQ2DL7CL7I
QRKVxxUREvZh5GPUmWsHdFgnbWAL0fWXd8M6YGRRilcKnIAr0ylAV9/YJifr/DWi
8+/OnWCwuSlz1IIiq2XfkBn5uvDOa5HuK5X3IQYVfqVsYk5C6oYHsB00U79mjyoD
GUF69SSBNxY6BmmdvBekT1NDmzDflt2KxTrkxRLxvAFV5181X2iKkopSSg8WO6Sr
la4GqH0IyysiP+a/xwe5G7Q1zNVW5Gxy7UPPRMb/IenzjerNn5IapmcOrklhM2Oa
VDTAJxXkI+4wnvxdXGg/LkBI/bFNp2hJLJXNXALIumTHcFHXUQ6+p3HOR+bg3wQc
aPPvoBqy7GOgzcMw2EL+IN7cMzvhAkuJebXbo+CqmZKDqHTIg0qT4InpMl3AAbgt
Hlu1fuAKqplRm7z8c6To+GcObsbuasPMZPL2+qG8tBsYTx7JeDXilL4T6TLRwU2H
hXPg6JKMbiXr0kk4t+spNjaV5yFaWF3wtxLFnK58MZdwEn78JtEGyZPGYn43jv+X
hkdQzepf/9C2q2Hqmwme1CWhqSTb5Ymo6yIW/RxOklJpEc988Tp1QPfcUtx/HZmB
rvwtIqMk5qpvt4Weq0sq
=xnpA
-----END PGP SIGNATURE-----
```
