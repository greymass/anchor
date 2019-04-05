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

Current 0.7.6 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.6/win-eos-voter-0.7.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.6/mac-eos-voter-0.7.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.6-amd64.deb
426381e0251a0218d3f07fbaedf6204cd2724e739a2350b811da9e20a75fe8786f65fbb51c0596100faebe1d102d0645316484c4ab18e64b81cf3128c26e9297 *linux-eos-voter-0.7.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-arm64.deb
2bf5a90300ebbdc9335282296af90e39e827a8e59d8d509a25272ec5f02e4bfeb151bc76c575ba2a5ddd176ec1c47d8c23211711e335ee9c445758f49669ef39 *linux-eos-voter-0.7.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-armv7l.deb
825b71330c2f49da0b1e20be3e62182decab805cb7c48455a16c4ae16b6e075b787cc22a2b2bea43b0a74d2eea0c42c0b95352bcab07ebde65c84a012fc1c643 *linux-eos-voter-0.7.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.6-x86_64.AppImage
e3c0a549204b988e16443c9b04c7e86029c7640091e8c1e9c6e70f6780ce6fb3d436731bcee505831231bd691462de7dfc10d4098e94cd9d3b3dc2b572ac0ad6 *linux-eos-voter-0.7.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.6.dmg
ffbd403ed41efbdd4d9c76d40d620594522c69723e0731bce14a1facdd13742c708bd3524ee7c121961dcf37ff28ea45372283b4a9ac7a910466ac9af8597570 *mac-eos-voter-0.7.6.dmg
shasum -b -a 512 mac-eos-voter-0.7.6.zip
560924b5097411b81742f4b840a5f6f0873ec55bdab820695e4afec6d7dfc4a1fe84d08c1664edc43e47302f6a082f608079978618c65ba334936ed5130f86ba *mac-eos-voter-0.7.6.zip
shasum -b -a 512 win-eos-voter-0.7.6.exe
59c1d612b5a8518659c28fd155ee1e8b7420929c0fc55d64f7e2eec4d9cf17d30af0d0560cb788c6853f48ea88333626286e0a08e11cc5b4383dc4f61b52f83a *win-eos-voter-0.7.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcp9AgAAoJECyLxnO05hN9HsgP/2Ct8rrz21xoBLSSZzisLmUS
SFsuzQGSXMi53izfUWCL/6Ruj/U2Ptm6ShNz49eyxej+UQGlOEZIcomhAocGvH8q
f59xkuFnHWJU1BVBLYUDWF9BQG/wt58VAqC75UnYsm6GI/ksthVJ+2b7PyWTdVyP
3mcwouy5JlEuKVuBN4S/doDoT58vSQAY27fx0E1O7VdVFeZp0VV4Wg8IgBrD4bbx
5Xvt6j4d72IpJRp5p3Jj+EVLvGz3rzAjJWv7aAzCnSHrLaCeR3Chq1/sgkrNQYw7
GSfG8IbitqxM8I7mGO9xkLCPn7/EdoQHXsbHJj+PEtKTlKMHfyKpyFPxlygz+JU0
6Ikqxr7VfpbSh/pBJXxizfnHAHNxEiBB1Nytl17gbjZfjCTfPIvDgAFiDJTvEbqm
uZL/YBAn8rUfOCD72MdDK9aYODR2elS+J8iDl238v/1b7FIxd/bwarWCB0bCdUfT
Nq86nhjo2ROaATdnr4TZZaFeF2KnJ9J9hSbThv0XKZqFBP4rjracSvj5aiL/3AwP
9JwUNfJKvF3ardAP+q1k9fJUhbh4DjpXqUf60Q8k++XzSxxYkpI+gUyhkKWGPQsp
aPjB1n+34N3KVbnA/a5JuQgGftxuQJ27leAHLaPxLaReIUNn6jHmn9wTTWkINWRq
zWN8uuctBk5y6egCWkwQ
=pFla
-----END PGP SIGNATURE-----
```
