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

Current 0.6.7 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.7/win-eos-voter-0.6.7.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.7/mac-eos-voter-0.6.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.7-amd64.deb
84a1e8a226b13e37022b9c7f83f409a71b75f519c1ab79592cccabe021fa65ba3bade4d126db1cc890150faf81b9d377d29a629c5ae75d9f95d445b7b07ad056 *linux-eos-voter-0.6.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-arm64.deb
4d7a3cec0f4a4418d6bb77dc52316ae90c9e9d0777f212eae376f18a9986ba6645ced7d92701fd9e144889538ac6e4f7ee74e3d9e5552b17fee5b9b367fec4c7 *linux-eos-voter-0.6.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-armv7l.deb
f8c9d41ed0014674d4595c0a8ef5cb6e9366d02f6eaa4112930d1806fd43e644954ea7187eae495cdee6fb78caf9cfd3b816d25fbb11938ea069d1bf46c72f1c *linux-eos-voter-0.6.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.7-x86_64.AppImage
4422275f2b0db0e1dd7a2f533c33dba7e4877c40fc5685af2da252a7de7117dbf2a3a96f3fada65f307c9019f2aaea60e90d8341b6c7a42a2fed8cffd4999746 *linux-eos-voter-0.6.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.7.dmg
5cf11187d3ac8df5ad188b4287d93b9e1feee93a31433d385fff2f139de297ae0ad77c336b1b67c09688eadc58353ca41dd2d1e02eb164358d73ab45fa8031c2 *mac-eos-voter-0.6.7.dmg
shasum -b -a 512 mac-eos-voter-0.6.7.zip
eec19a97cc58472e637efd722ba734e89a82b76d110eaa8e6ac37841ddcfbf6bffc89225f5ad16adc724d0f747b3da1e9f94680926312a01b6f7660ed065da05 *mac-eos-voter-0.6.7.zip
shasum -b -a 512 win-eos-voter-0.6.7.exe
a7e5e605640213114c43cbf38a4ea7438e3f53b3dc9cda9556308fef0d9c816b8cfdf1db012e0ebe51ffd91a49f930351f8b8bed4f68752a63f9d088ee16a465 *win-eos-voter-0.6.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIXOxAAoJECyLxnO05hN9CogQAI/1/HwAly+bTzM321g4FirT
+qfFhh6lpfuwbMiJgTPnLUQdVe2WyfGhF35mAB8qCngIUO3wq69zAxa6duNsJHyl
MvcudxGbpe+JADD7zDqGiY9dw/MVCs21rFPLlBDHu7bytSQ2Pdh6Mp9xVlalZmgH
WFg6xBHLy6w2k+xCRUoqlK2qjoU8wkC5YmuTRuqC9UxlYVwnk1SW3Rhe8nuFISz5
20u/Cfe4bVQgWrU3HUpaL2PyhrfdmOlcxAKnsSlFrZzHjJRkQsgoPC1OG2X9C/zq
GV/8lHjCmZl51n2WVWZtAhmSPjwcbRLfKBLYDmDN7uKu8q4kVLWZ5882cRHYYwID
WY3cXnAAj8GjxNepDUd77kHsVw5iTLQq6+UPtV4ASGr0lVnrVt9/bbELpaqpS3LI
zXCRs0sBcCPU+zGJc1G1dsj7SJW6gmGxtQRYLJjeD2q63roX/bHViECvGJAcCVnY
wevKHTlIuKXfliqaavbNoiebVYBSTpnby0Ts5kb1O2WurnomgKoDYeTyKVopTWaA
jtSCkNrPw9dvShnoV5UeKMjJXnFTgdWQ5V/NX/YvLMvl1jdFl1Ciqb8KZu2h0B/X
MkmB+dvyM+/cR+H93LG/Q0lgItm1KQ5Z/JwQy3W7V25Ive3tIUQnax6N0tsnShci
H9AZyacToVn3M4hBJZlq
=uI8a
-----END PGP SIGNATURE-----
```
