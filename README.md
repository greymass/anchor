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

Current 0.6.4 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
7565c92cc47fe587d0d07757abc62a8eada15586c96e55d585bf7689ba80815613095895a54402b1b489fbbb3dab56ace4ec28dcec4be3dfe390555d48ce1f4a *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
03f072ed36916249c1d4e221e6e8791a106946e292d16404064e704be6b75616c097cc15fb9710540c4701123e5faeb9f7afb60e4eef19b13a511b75c3ef641b *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
a14fbdc2c76def46ab6cc47c8612c2927b09091f9d1087877bc422e1e1062741b8f08b671fb74ed3f50c00748f33cb155e3b433929b3ba60f4277be9c49cc26e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
d76dad659929d2311cfdff980ca060aeb93e38be8ae9474f45ae47dcc83a556875671b4b3827bae704a3ddb80152aba76272e37162113c30dd5818129dfde981 *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
7169ce28962a2e4b45c2010b7886f215133e3c3e0f99dc81f674e55a30ab5806d21ba987bd9fcd2612ff668c2d077a3de7b887d7acc9fa7acdd3569c8d865d33 *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
bc9954891f48cb0606e7051cb96b98e5592c8fdfe2bcc6c32411da41c0ca47e971211e2dd5eb601c452f813206fd63135659ae9b2c7b1213065d0d2c5ac960e2 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
a51234b9068e3beca91b89995da754857e7834b4015e5d378d870004511bedaf4c1b75e2c3c52db1e95c5cf8fd35fa1b47d2c27e435919d8b1520a28329ad824 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFGKFAAoJECyLxnO05hN9sZgP/iy0fF52PGjNN8RBwGzRJFy3
1nTmOIIHdW+cJf67gVG9NcTqyqB14CO2aIJRegjbUWQFn42//GkCKhHXyNLiy63k
zXX1sy+hn0zNa5jOzZjCsOrPA/jg4keUMU/LdwNkzAuESUXy5GRzrUAGHScdmrSq
4lTfjBS8h1OPDURMBk375V4V1W+88uSwapbLGXjLfDqMpmPS05mNf+N29w9sOTgI
V+c5tgS2EEKSMoCQoDYvlWsTvcZUaMG/IghyruSi1KYh5CPJ2aXGoj3VZ9GVgply
ePxS/8HEEpzkTPUpn/QxLa0cz1Dpz9pXWdz0Z/+3IAymrY/bkGcDfnbc1nZMwM4Z
xGbHMlJ8Fvr8lc6Vwwe4bLCaq1NnkXnC4eVYNpNNxQvtv9bAjaeUzZ1VXS+BPrft
rD2cu7NKr+xt8QSqUg8jQFh/mP9odhLa2qGSegGfm92SwIye6kzLcb+DsskVd4uJ
T+Y6gqDCaq62tchq7waNzl3PoqFv+wkmgqceJaltacVqElF9vlBU1SlSRt/wO7+h
/ErR3sBRM8KMoJDBlTVolG+teWnR9RmSB79SyyHxSMindYKho+GNyb3G0hJS7USy
8qUD4yJh4+WRkskVu4A7mjxOxNaJIcmjG+bbhTjOIgaaz9VCVBX/GXRlDjuqPWwE
Zyym0JHDsppfgfMh0brG
=TkGu
-----END PGP SIGNATURE-----
```
