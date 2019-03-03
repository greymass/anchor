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

Current 0.7.4 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.4/win-eos-voter-0.7.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.4/mac-eos-voter-0.7.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.4-amd64.deb
bea81fe2e68cda5609a9e322fc54d44d774c3f0204dcbe874bb0a021d8d408db2ba375aeab984e5cc44886a66608168f6889b57f1dffce6cc266f3edc1c83d92 *linux-eos-voter-0.7.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-arm64.deb
ebc6cc2b876cc1e37e47aeb5472cf51f6a58d8299dc0cd491423c7de6a31b8cb179198ac50e4a3601c48ae87b366fddb1a89e1c7eae57c7428dfc01b60550989 *linux-eos-voter-0.7.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-armv7l.deb
d3d39e6aa3fbb0aab564ebbb4a9da21d34bda928e5b42eb6fbba62fcf3fba678710aeade713125b24b8294f3f68f236f3c32cda53e0f251135f3bd329bf236de *linux-eos-voter-0.7.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.4-x86_64.AppImage
771a355b2a87c8078a10ee6bded05a87a892c47f7e2e8483ad889a70b6b81300a257c07ff99551c3bad99dc5b7e83eaa90d55fc07ab5ae5fcbd3cdf0ce0349e2 *linux-eos-voter-0.7.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.4.dmg
6dcde6ffcec4d249768e2e5c3b954123c6f4e034e9098785f66343e2277de2533697050b9aaec684a33c2ea7c40d60fca104f86bf6809ec4cc4c41d2bfac3272 *mac-eos-voter-0.7.4.dmg
shasum -b -a 512 mac-eos-voter-0.7.4.zip
df15d10696995558e39dd919cf86b019678d7defd6bb778b36787330d35ab32ec21aa0cb4d922f3fa0fa09b98f315d1b99713e63d3251423861f783178d2a158 *mac-eos-voter-0.7.4.zip
shasum -b -a 512 win-eos-voter-0.7.4.exe
04c58dc9c238e9c0535a9347dcabc3364966a0d1473e98a2e13434cf3199fca0491f51b9a945ea2326c8ae203b04f533d730f9aa904168dcfea5b365a2c24a4d *win-eos-voter-0.7.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcdvV8AAoJECyLxnO05hN9oYQP/1KSQ2orKzFu7GQy7pLUxxaF
XGBixNm0dqwgaD9UABr2wx0uWW0zAaeZXy5AUNt6I6EdKNFT/R608vG/dFOqVd84
qJpFs5ZDFEu/8/4zSJdznINWf8HurETmySI/QcbaypysLrx3JO5igF4Omr/YD0Lx
++stIuw+Xxv3UM08PpQm3QQQ8xWwv4mVcVdJeOh61QGXoN9w/uf0rX4TuULLNAex
qcW86alypYEak4ubf8+5gz8bvOSFqETnd/Z1mD4wrVYZdBKLRXFswj5iwS3hHJcj
9o/njv6lugDY4RqczkeTRQLJNIvE84NurkhHK2uVSHHBdWEy6wn4oajuCkfDKy7e
odtJthGzZjefGlSU/h4gXbP5rLPJ6dsEhPXFzsIxWDzuxaAwqzpIdnaFDxVB18oj
dlH9hG3OEbyZXmrpsBVN9J3tULESP8rKUHVwvlBjcmtnnnGr33zA0Q8CEuEqT71r
rZuZSp8FdepQOzzOk/oDEvlq2IlDVdsim0Ka0UC7e/tI2NikjAXrMFdI0SVArWU1
ZP3an36DAoxX1VB8AeMU5NxuzfURKgs+ZvRWnv7HokZG0FFTdp+JPtqcu/qGGfXa
gcEHQ9NyQRgKQty3IdL55m8ubw3zke3vxgDdKo3V7w+DaXzUo6kBB9hk5izGT+0+
v5p5a9nKvG7CDLyJLXNx
=fmUA
-----END PGP SIGNATURE-----
```
