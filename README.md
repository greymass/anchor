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

Current 0.1.6 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-setup-0.1.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-0.1.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.snap)

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
git clone git@github.com:greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone git@github.com:greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 eos-voter\ Setup\ 0.1.6.exe
2ebb82264d79407e195b7b40a4ce348b2faf512dbec8de25fe4fd3dea73aa8aaa59f80d89befec0a3a8e1abe412465a9f16dfc5655422ac760a64bca3dfdf452 *eos-voter Setup 0.1.6.exe

shasum -b -a 512 eos-voter-0.1.6.dmg
2ccd96843bdc4d2fa866ce98479e5ef4374c9828077521c25ab3a2bb528b6dd60e890e6787440c5479e57f22aa192fcf9e443997dd519eb442226aded240611e *eos-voter-0.1.6.dmg

shasum -b -a 512 eos-voter-0.1.6-mac.zip
4a99e29669494c2f551f1a03bcd64cf74337b3c3409a1a0d5071d672233e58925b1d9cafc05165d13b1f4f7b942523bf16237aee291663a2e023dbd7ea153045 *eos-voter-0.1.6-mac.zip

shasum -b -a 512 eos-voter-0.1.6-x86_64.AppImage
a2179b9f9ce2f2e3e9dd4c353541eb7b19c52accf87086293ae198203130fff3a5d9d534cf30536ec631562a21a39fe7bd2021599f29402184608d49e4fc1be2 *eos-voter-0.1.6-x86_64.AppImage

shasum -b -a 512 eos-voter_0.1.6_amd64.deb
90b07efe663801c8cac0e4514b770134a67af41af3c07cf43295b806d388db1b620a3f2058e8b995f95cfa76f0eff539c8d3cdef964cfd0456e72fcc3c515473 *eos-voter_0.1.6_amd64.deb

shasum -b -a 512 eos-voter_0.1.6_amd64.snap
a18899000dfff5eee61dce6f6b6e799b028ecc5fc1ff6edbaf67b5dc2e08409500e1563df0aa5743d42adebfc69de59dae569802c80294424c2208bfe8d34c0f *eos-voter_0.1.6_amd64.snap
```
