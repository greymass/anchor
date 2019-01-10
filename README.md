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

Current 0.6.8 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.8/win-eos-voter-0.6.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.8/mac-eos-voter-0.6.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.8-amd64.deb
7cec380eadf243789c209c13c5abb75c6056118d6b2e566245a4e7e33dba1572feab6ee4255e0ae353c2b49b85b9dbcb7a95525d4524380bd707497c949c12b5 *linux-eos-voter-0.6.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-arm64.deb
8737c70289e9779e662f069505b2ac05c41df3bd0a5891b3859a530461a6eae016a3419498d60b3e1d56728535106f7c6a8d19283a1f572c5fc34a927857e040 *linux-eos-voter-0.6.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-armv7l.deb
9280b6b880c8b1133f0a7905d9ab9e38ff1a7db4f69bc143a88d17738d33f545568dda6f9b6d31d5beddd62ec248eb787e002050f568d246862311c785356e2b *linux-eos-voter-0.6.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.8-x86_64.AppImage
66666a5b9e9fe0970af50c866e7e065177b27e866a448bfefab73b27cece82a0081279c934bc2ab91b630091fdc7aededd39de7cbca8f578ef5c2332c55b6370 *linux-eos-voter-0.6.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.8.dmg
38469b173548ca7f33ca250812aae74127edc93e45f4411e2230a3967320b409356107ec79be39342505d34eef9eeff9caa30e60d3c9f578e4aa7d936a7ede37 *mac-eos-voter-0.6.8.dmg
shasum -b -a 512 mac-eos-voter-0.6.8.zip
904b4463667cb873f7b89fe2cb606c95a7f39e1a76e1ddede0320f9bba4165bfb1a647c6f2707d34bdf32783c2c61b84711d8240a055c4b97eb1302efb785330 *mac-eos-voter-0.6.8.zip
shasum -b -a 512 win-eos-voter-0.6.8.exe
36b5fe426bd450f7f0d1c57cbe86f80ee47508fd4db483e3abb728a6e51eb6e24652ee4f857845418dac2efde5dbb20892a2ec36507b2d77de7931dbd53ff30e *win-eos-voter-0.6.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNutDAAoJECyLxnO05hN9KeUQAJ2x09eWhlwhp1hGVeqftLR3
riczwU0aChPY4HLSZ4VNaK9Llag60tc1yhz5dVB9+m5nblbB4h4gDFBIBZ30Wh0f
sM8DDFDg3Tou6lxLx2qPKN6PEl4lhoY9h8sxgsd0X88/EkgLY6ihfhID+r55T/nB
tsVIaufadm3rNVAkoixrMfb1hu0FkLrjfXwA1v/h8lU/4u2q2nUd1XaEvqBofoas
4jQPmBB6MdoNTL32eig8Z1N2aItRuzqBnkEOpwGARkSdh2aUhQFp1DCNmyaImEdI
/kc/1Wbxg0mTvb6ld5yOo4lz+LmBDwUkJYntIHWmiaOw24SdeOEAmmM4ew7o+XRh
aeuPuF43Rp+VNqrz0QNa/tdVRRzbLOc0i4/fXYZ3a/dUwHV4JNoLoiYyzpwFexJX
vNFOUGrNYFqM9ikX5+R9E95cF/gJJzV2BtTPD0xwprUluYda15XFlTs+Sc6Hsxq3
JTBcuccHeiwQ/tnJFa9aXc/EEzuuSdP6ehkc5PdFm4a316lTLDOwcyt/tw/5DVvN
wSK60uEFz+HO+mKn3coXQGtoAczMSLnNvGKGBIowDr3EzRVt6gUgnQV9DzVm9x6R
pdATD32QHBYfxVpCW/y72hV/jtSDEniPJRr9wFD2L8IlWNPY2X5MKVDQlrXEXtTX
sEmjPVwH0rkCgWQApRm1
=DXcJ
-----END PGP SIGNATURE-----
```
