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

Current 0.6.2 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
a158c50a65ffa8c34c54aae5ff5d0e730fce6e881f102d558c47ed9b12fe555ba066da9961e817038d66ddd8554bbc339ef10111896af4a67e0159e3ed75f845 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
e5c4dee66f097af7f23b7b1214e4b891e98c8e77dd3a99e60d4ba24f3f086f4b8ca2f6713b1a4af0627d58658411abdfaf36d33b793c6c3cc62de25a73b6fe9a *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
bc0e001d5344d0ea56d7d39a445b5ec9c23d590026eb6c71d287135371a6b5f32146b89505e316cd05e7fc5287a620acd17c0ad2613861c390b705baaa25e19a *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
f03c07c4d10e16baf7ecfb36258da1ac08a62615330a6998bbb028ba5bb27dbccc634690edba0b9fe28957ba81497ec601a6aea0392d16bb65070290824ece2e *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
935ef44a0b62ad123259da5440a2351f3517aa939ab2ff6cb12f895d72aa48b7b67d0503aa20119ec6ef2f9a3f6815efa947bd8344ec93f6ed18ffe6a52f9f19 *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
c00f9dd07f0f7e71efcca7a5c2f81104bc28bd99dbef13bab24f61cd1c774a9874489bae640694442cbcda5f9f54c4310fbefd38b23ad269175a83e834575693 *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
5c9fe446bcbc28e43efbe3066eeab94ddcba3b9ccbdcb49a6157eacb2846ff99673594040fc48e75f68b97cb07b323a59de6b3bd7848d3b29c7e25797ce4f4a1 *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb5K04AAoJECyLxnO05hN9mT0P/1fA+sgntRPGowmhlY6JB2X0
cNLx+HuhAycQNp6k0W1BncwViV/iKAoq3GsZUrZLtCQyaS5cUXGzBBrHy4klboGF
pZSvjmSHpPTEXyiII/Pmdqbhi57uUMwRMHjMqIPrUSz0AnMUxQpksi9SQTxG2NU1
nxSG2QpaNgn9pJTKuUyVfSFB0XdITKkTobaZRlZ6djP9etiV9e7ptxwuxLUVZl1H
SgfxC9uQZKAmvinagNn5RItEoZCcZcCSVcL3Nlhpsrm97uY96ey5js0T4CWTmS4p
RuVnJ8myXJdcWoV8so0ZMD7LXBacr2b0J+MbA/OE/3IwXSxuc0W8xLlj40M36xML
odb99ezaDDEpdTSvIl3iCTIzrK6eMYF90hbVf5xRZyHO5Z1pL1+0UHj31As8wb9g
oxn9jsCP+5MHsYk/8u/Ac5Zv1FDBv1wb6dxdR3v+y8NwZcbL6/lWPQ6sfca9kNWp
0NbLbvttbnGSmorpKbQbegEaUIWZV5lL8HAHWbdxaE5p3RBbbYlr1UjaKyRpX+Ic
hhMkR5P0/KeFlBQ0m18q9vn2Au37Z+HwTKdHVa7ltsyQFiyMoiAed6jpfGQl5Jzt
cR/cBeuV25ByFCXYGjjjZJ5bFG3hXnJA+UjnTTWC66i/i+JkALnB7qpaYWJxgkOl
9SCqa5mn/bI1qY0mNdQS
=6Pzm
-----END PGP SIGNATURE-----
```
