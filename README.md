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
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.9-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.9-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.9-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.9-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.9-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.9.dmg
fb8c673a7a26b4b1c6dc8033409598d0e7e5128cf00948cf298e1aeb67d7e97e48aff8f1825c01c1c8e5c6d20dab9a0d093341ef0f197d6558b244e73247c14c *mac-eos-voter-0.7.9.dmg
shasum -b -a 512 mac-eos-voter-0.7.9.zip
a34872cd499df42640204cef7e34488b5459d5c8cf4cc6fa6f3c3dbdb5f3cb374a490c8f5e54bbda01da83f644f7b328998e15eb6d6e4f8c2fed1c651ad6626e *mac-eos-voter-0.7.9.zip
shasum -b -a 512 win-eos-voter-0.7.9.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8Cg8AAoJECyLxnO05hN9DRAP/ibL7YK4Jg668xUW8yvgK52u
x8OqPjJZeF7qZA27+nBXMk6wSyoeoGtfn0y6PFMD2toaE/omkyj8uX9jjkAIgVhN
Mq9vDNj/eY9dbvXs01GOlKha+l1Q6Jf6NrR9CJ/pEghM/QEpAFC0Xui1OSvvTj1r
HtYm1LVxfhEMKJavTbUBK20EqINpimZxz8YV4fQdY/rNa6vry3vEnW0VA7hwinc1
yKNQ5QqLCQ9tyoFGMOdj0htgFxkOguL+UxcCswsLL6LLGthgRln/IW0PxCSgWtd6
bBQAswQjUrMRRbpAD9MEpgp4NXx0mZkdPldBL9Puywaloovb+x7gsgX1DMycRoJ8
kNH5LCsYVo2jnvbJBn6dRzUruLAuOo+xxr2xr25LIf+U+3FMwl3R6OudjG3BjHeX
rbn6wfUhUF08zEYe6IID8kQcZUrn97MAAIKYsW9T0AIfZM5nPNet5irZm3UGZvEV
aFXxZ8eG32EJMNCNYypnyGPmR1VNVWfYxWakrS7gIpMsjf5Timfd+rtf4oNqNyBY
PLaI2e7qSB094djavYv2BZfDXxLANE8MupooNXD8qPDT1KluRvATobdUbNC5n66u
uew4KWCY3YXW27SU9rmnNVROMHVkffBOCQu26exVOOFMojdw5ybPbEtnsYXbJr6Y
X7V2/u9gwwkMlm4TwI2j
=MMKR
-----END PGP SIGNATURE-----
```
