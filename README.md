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

Current 0.7.9 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.9/win-eos-voter-0.7.9.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.9/mac-eos-voter-0.7.9.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.9-amd64.deb
c4580cf4fea96e0ec6e043c0f44834f968da732502809248f2d6e237048fdd4b547872bc3a34e816a054156c8b8a06125ec298f1d7f5f253649f510ccd12b6ad *linux-eos-voter-0.7.9-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-arm64.deb
f9d22567d27dbb788a9e74cab809ce75d18c4c0fe8f2b27decc885978a3e53a17d3ea6b7b097781581a6897e691a3d1606c8e659f1130d0ac822f527c30f74f8 *linux-eos-voter-0.7.9-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-armv7l.deb
f99b22932337dddf68687058479ee3ae7c26acf57b39f33673e9bc97679d90c82460023a8a472032950c384486cb317a9da1a956fd3eb621863b1ae83a577704 *linux-eos-voter-0.7.9-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.9-x86_64.AppImage
cccb80c21cfa9cb134e1708ce1797d094f9c56ed47081b75e15b624e5af96ac7f14883da04c26cf817c2bd7d28a41d4e6c306fdb07abd0ca8dd1d072bc44c815 *linux-eos-voter-0.7.9-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.9.dmg
9f8c2d69075f118627272f8e0df89db0fcaafb59f6bc61441575effa4f2cada48e0e595b6e8d22a3ba1e2c55a7a6985462517b2eee8c4e242207936e1413a02f *mac-eos-voter-0.7.9.dmg
shasum -b -a 512 mac-eos-voter-0.7.9.zip
c4a13a6e9382991aa99a311a888e7c5c86f360694ceb2aee1c0b99c1c8a3dbed2b3a5602ce4ef8a1b8b540129fa9b52c5b7b331ad33525eb7d66678491c8baf6 *mac-eos-voter-0.7.9.zip
shasum -b -a 512 win-eos-voter-0.7.9.exe
a706ced71a10d6e201d28bec8961743ad6045e466c4bac5bf8fa5fd958c494eb132055c6205154f44df157696a80e13dd628e2c40df6356cce064c17eac9b0b9 *win-eos-voter-0.7.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcyjRIAAoJECyLxnO05hN9EWAQAJyYjJjkcwgjQUxpdrlpiLyt
1cSkq26FYuQGsP2AB2hmOLerHI2wdVqziJ8CYOmFYLzXZa71R1xZcDUaUrNILN+J
7Y9nJ/Gwscdes0llVVlewYH+ZBRTd3GbWymIaS7UiL4NlAl0fuEnXm5qvb+HBY4X
zYTsQDYgYkmzH32VRf9c7O+F3oPnKVi+sy7mp22b1bEoa+6TjodmsKYmFXrC4gn2
8NESCP6sPemUZTkhqahcvegUAIdDMVhVy/eBw+grJyZYADAY0CfqGUvHARgT9IuF
r44frw237Rdv0n7GPFHTcBAy6wDi8G1GbjO2cvyQzgc4p8IZaKs865Z/kzK4Sff/
4j9IZfVbxQPNJ0jEaPDGKDvfKIym92ydY/LYsr4Sj09dP/0K4ifINsd9bs9Tm1or
jTkp5AYNd+ghWJ95RMMavBUIOyL4DiIIERf7VwcmZ7T+lPFByLxqA+5mAyp43DR1
ydbK5J3ZyBGYX0MrnznDVjsF+JVv/+LHZXtiRnMROxAXXchEVWBNWWQaEQaVHGpO
48g30SjMYgLt6aRwpHIkzYxzf/cJrxMriFdov4O6CSYYtNHmDtmvYB/Upx/hlvSU
hbHDKTG8OSxU8jlFVcFUBuF0wD7IDWr9uG9JnvDYiVxCX42QUVb66YbSg85JoWo1
C71trwt/RMUTiaAHBnun
=UNws
-----END PGP SIGNATURE-----
```
