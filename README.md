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

Current 0.7.5 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.5/win-eos-voter-0.7.5.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.5/mac-eos-voter-0.7.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.5-amd64.deb
aa135d96052585d818f7c47ef01599aa6d64344292228fe8e027973a2d870e5cc5bba6ec0fb8073ed87d5169e30f893c4a6746c7514458ba3b8832257ca0ba04 *linux-eos-voter-0.7.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-arm64.deb
dcab7bf7c943e848622f9a0ee5f4ee52927b6f055a153b05e203463394ad488a11d9bf29533e6b23b7bfdd0eea61f27ff25a1fc8db50bfe36aa8fea97405cc47 *linux-eos-voter-0.7.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-armv7l.deb
865ef4599f119e25c47ab490f7d2700979cb1397079eef1a52ec59451e1c7a98f3930d45626c533dd624ddffbb57b474a211f2f45563317d5d6fddff7147f534 *linux-eos-voter-0.7.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.5-x86_64.AppImage
405c1e7dbe98bf7e442a51143c3be5cbc0028d179f3417809e7f6bfd178cf6e0a509461264ec469335f46605518fdce59d3f26ab02f4d9c0e80e49abe7b2a743 *linux-eos-voter-0.7.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.5.dmg
5f3d0825530a98285fa0191c2c7a956f7d7ba741d5a3992900be95f9eee5cb4c81aa368567c2ebd4fa1d16e40a9f21a641dfa1ea6388cc569ca8763d9e1f84c0 *mac-eos-voter-0.7.5.dmg
shasum -b -a 512 mac-eos-voter-0.7.5.zip
de65d261a754791da6ec7d0a850e552e3d5a8d828cf837c9fa84a0aa0d05ddde61c59179d4a027122b66783db6351ae427917640f85266287d80e7a5003918ae *mac-eos-voter-0.7.5.zip
shasum -b -a 512 win-eos-voter-0.7.5.exe
bf6e1010371a8d5aed757dd0efb3e1b89d5c0a5a1604c7beb3074de367d1a350e1f2a4cf60ecfb9fade3960174557b062aabb88a498f68034cbeb5a046269d50 *win-eos-voter-0.7.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcpNwAAAoJECyLxnO05hN9awsP/ioJ5zINASlEZj7COiYrMDu+
yGDJUJdMZemcCQpHyvBFcV/SGgbZdVd9MM0yc28k7IESHi6kV3BhspexB0tU7Lsf
+KMLGOd2zlS0On9MnQdnrjJdSfxPvk+sguj9A5/y0nyzF+TgTHFXiz6nSPQJ8RVQ
Y0jXD8sy5ntp7/NJYJD+h4PKkb6CguAyJQ+rcd+dvO0cT0k6WP8pBGlIgRdB+Cm5
4OPss4rImS22OvmEVqgbaSsBS+yqqJ+fI7841J5M6iio5dRK14ynuVHpBj//t24E
wMcwKcfcn9bL3/KghJ0QAEDY0aUM5U0lwnuwutVMfNRWRmFnHV4Uglw1yectP7xN
cDFvBr3aUJg5DwxhnLo0vBua8Lq21QamUc584f94u8QC6YW9kQlMbmLsNAUh4XpU
jS2JELTqn026SsIni6QNlbsB7QrUpcW/k9rpu3mAmk9Hbc/GkkdwuYgTLQlnPuTJ
FvsfJ/yn/dkQw/ZM6QcFGtIBD08XyYiBOfcrY6B4cTC4cVxuK7oep1dmsMUKTO9u
KAocVUwV2XG8IONyNl0uBG3Z/UWcjVTl9BnJkl0zBQVOOJE2Ur7brmnIAs6Bg359
7TCWLtUwfIgMToZz3I0rFiYsuqufPieDbICayLlYdysRB8Ol5xTqt2sH2BDUGpLR
tO63ZSfugUz4R5y4YS4J
=gVCf
-----END PGP SIGNATURE-----
```
