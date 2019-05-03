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

Current 0.7.8 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
ca6f4fbfaf64b38d85144178e2532c5909f4363ec7074a8b9afff7a15cfe146cbda540e8505055cedaf597bb0e308ff8aee9ec87d24cd381b3c116d4b175319a *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
0a5c4ee4bad59db02f13b4c1d0d147cb2cc8bd2eb83cf0786ac138b807b7b4edc212fd63d08cc54e3a555202fa4646da3cb1c03cf3c9b297199b8362d20a7eb1 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
2144970bbc0cf92728659c797e6a99708c566834f88c810131b04d11a4ef152d3e1a997f00e4ff22a27b02b1f701d96d6058bd1dc9977cdfc2c6a636273aacac *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
fe7344ec93a7e769ce9f89ea96eacc4bea40a32614588cddc21405993307d548919289ddf14a8c1431c276604d84b3a85c2eb98c28f98e1d92bca1b4584e1f6a *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
a1a1756069998822c8f566e420754f1922d81b7223d2e81962de0f1188e1ecb54d0bb4e22ff2574322e26a0338dd2027e2e4106b777687cf33332321032f7d4d *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
5dfb2de40fc5e4ba0d41bc772643457a26b99259e1e2eb60b473882efb17cabcd93efa7f464c8f5ffef3e733aa9cd9b8b0d87ad9ae92ff4b098f797557d58586 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
d4c8f18a5483dcd434b04e8f80f29a0958cc1ed333282c02762a34ba6016ad51fef66a0580ee0203b23d8221588e36d8656c25d2c07a8c112fc492f7b9bfb0db *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcy6fzAAoJECyLxnO05hN9GTwP/3fOe+7jlltTLm6nWqmVTmsV
UaC/Wr6tEuyBR3bJloaTHAl7MghNYfoXEjmZSCO8KPzKYcXNTxSOBFeWQrltIupd
myijc+AGHf91h75dZ7KRg9ts9rFpQTF35Vu/F2eEEk2mIeKrP0f7V2GjAfD79eJJ
0x6OIjwgYvNoOp48ZxPcXpozhYgEnXD2fagIvaM0qOVuIautay/Mig8RYPdFrs9+
AtSrHbcxv/ILSf2UZnjgRfjgtF/5IwC9NMbYsrk+DS1x5nmdmfomOeRk70GyaCcS
FwovKDmA22uxooBYSKhBqwSfIoIty/etaS8rMzH/04A7/gHxk/7vOoPgX9FEVb7Q
WvN4893zubqagHLZUXuB4ExXqwfudLw6FlH49eB3gFXLIPIF88zwRqbfYXTCcyVF
z/nyhs2v4SxRTuTUbTMwE+N+W3tHClhHD46Mg7PMsVqB92qHq7Csgz2VGJJf4Fix
7qH/HvFeqFmSTNaTPR+ahBU637a4dxrSyzLOYgW7QAkVSrNlX2SE7dCshq2GWvOx
p6wiiLI8Ks2I1SmPOWXaXLNQZngjoKdPrar2Isu+WoSUorEq8VuoqDAKOI5v7MiD
vLfewsS/GrCyQaNdMxhA6k0KHlChncUbo50XQ/9IoDW0GvPalY9PSGLWvLznutJW
pjEiVUtm4AH8AbsjSjtx
=o4Wh
-----END PGP SIGNATURE-----
```
