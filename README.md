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

Current 0.6.5 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.5/win-eos-voter-0.6.5.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.5/mac-eos-voter-0.6.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.5-amd64.deb
81dac8eb51d9b75877ef8111eb1b1593e9ce3ec83f9d329425a0b06975bc55dcab8de82db37aa45a70d32372dd87e20c560a815783dd58a195c497be0aa0f089 *linux-eos-voter-0.6.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-arm64.deb
d2db3977c1afde2856285527a71e3dcefb7faa84e04ccd583dd82b328fbc078e1fd3321b1f9c8ad18196c558bc46565193f3826b600491954b09e91d2c785421 *linux-eos-voter-0.6.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-armv7l.deb
2554d854da5aff4c60403e08b28f6624a5f275ac604641c557a4ae004f0c028f9e2a63ebf431dd04aecaec99588a83f2cab828b6017ea47a89bfa14febef4a08 *linux-eos-voter-0.6.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.5-x86_64.AppImage
1983a8f9080f18e11872c57e1814ce158701ff9c425cedf04ef38582f067eb18000034c04d1a46a16cee11cba9eb5fa2704f996ea1bbe4ad1c47b4046fa8b76e *linux-eos-voter-0.6.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.5.dmg
40f61b42c29cff4f391ea7ade53ef92aa8a9152f011ed69af6ca5a39947246b9d71a510df78ed1775f59e07b9b8f5afd4374d74017523eabe4d4041eb86d887f *mac-eos-voter-0.6.5.dmg
shasum -b -a 512 mac-eos-voter-0.6.5.zip
32c1c3d3d978c891db588e7c9c04c3f3e30d06e7362c88dd90608373e1988142cfa28c6f361b2c27f0fb53a705ae2f8871d57a03da15da651895ec1c44da2a66 *mac-eos-voter-0.6.5.zip
shasum -b -a 512 win-eos-voter-0.6.5.exe
720f6e3493923032098656cd391bf7cbf0ac26e0f585d68707f02c1660a0b6576dbf02646f2fafa8b7173a81a9f3d6480bbfdcde3e14184aab22b791aeab079e *win-eos-voter-0.6.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcHZfBAAoJECyLxnO05hN9TqUP/RiFhoduhUNspmBMaygUHB44
YIw1x92wn91TaN3PUnKmQe957edtLfkwY704BLcj3t9hbrtqJV+2yqpntolw7hOU
Wpo+loSdcgJlUh3fFNiQH+SNniXvIvGOCpzd4IBNPhPjMQQ2bgQC4YOdBZindodi
uPoPQMNsmg2/B/ZagiZzxg48u2Z2gw/S7P7MskAAZqR0nFDu/W6/Vk1XY8fXOtgc
4V3oa4vSyl7680z2K+mcPtPGb+k2RmIl+6vOfWnZtGStBBsMOFHf/wwcLRYO74S4
Y3clIVGadNeJ1+IUZXuvjobBMVMyylmNff50NUE/mBaf64DMxhTFi9ahnuWDNXzR
7pSp9aK8fgKeC3BQXb7ak7zpORB5DhC1ZwGvZmdyEWexiicLKVWwW8CcxI0yh61/
39RYSip3DtI10lVWX3LeopTTVwRgLxXPlPbUYd/dSdhSkOjSkvmamXn6/wjmipHt
DI3X1zKT6CHk8HKNp8Soab4GEJGk/BkK7lh7d5pHzRrmg8hgbLCDLpUCPP0WrK2b
glRk6DCMcNoP6TAXNMQWwve5RKNlJgRiW+5gGMi+AJbUht0LUFtF7+sXO7zF1HYd
zbyvruxLgrONe4xAjCfK9CDW/Zyu4XjXRalIIKiA2KlSX5XNUXojylkub2jwroAE
M8iF6RPLTWb4hFKtc2vu
=M6IG
-----END PGP SIGNATURE-----
```
