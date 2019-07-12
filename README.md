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

Current 0.7.10 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.10/win-eos-voter-0.7.10.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.10/mac-eos-voter-0.7.10.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.10-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
7f420d9a7ada321934df43b09c29b61a8e58128a83cc87905b1affe463f99043b21db69884ac90aeca86560f5623c8db7f0571e52c9e0f51c648f52c6b7e4dee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
fbe79cfdab0da7c977477133f76adf38aa16f79e955ccbbfd72aa96bc56632abe7a7a90e74e1ff59eb0b33196d09353873c2420f55ea3a00cb39ed85a5e973ad *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8F1hAAoJECyLxnO05hN9UrsP/j9D5Hfqrn8qPJYiNagOX3qy
nj3WhJyKzgWFEUBjfLEh0fhmCfESwurylC+QQWhyNa4hhpDWDmWe2bR0XUs9TcUI
MBDWBh5RCU/8qIRROBUGqQRQw6YSU80DNOU/1yQQR0v8f0TOq0QJXNLD9I7WQO8p
P8AzSlNE70MS5crzzn7kCw5vuno28cPtyKJ9jNA+HwM95Hv7dj2fnQCtGm1WI0ON
aoZ2St5nG2oXwvLHL28LwtNCaeVctjaDyxuaASsGwaYaOE+tFOz6VQ8psGGp59p/
Z+LVjyxIgJ3zQu/AflrpmPtrg975j28GB1I+IFH2XVYV/pLoNAKj8+Q5vwNkMRL/
8NnWY53osDnuI/wlgQT0wGSjum4OUWRqOrQdz+TCvqa9Gy2pRgjxwlggszWP0EAL
KqlJlMUG7PUCOPVSsKJW4MhM8AwmHvRby208/ZLQEDfarPbGbLDpt8miQv2ZMoe5
/JhgovTLt4NI+p+7vpbgAJQ4f8YXTFDFuJ9q6C5LXhn+f8kc5Nvtm2HQuEadL6J8
CVKIh0nugoRoBu/1XfahWhmO532OQQe8SmtqS+8wtuxjpqH72xUCTDXZvJ09cMr1
FrWhVRY5TmM4muR1jnR42e9wBUa7aEyRQx7DBqreKNgxBG90j+4s+OWTTQPnYtWv
S1FUBiMIMDIIOjt8xyG3
=uZl4
-----END PGP SIGNATURE-----
```
