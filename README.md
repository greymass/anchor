[![version](https://img.shields.io/github/release/Telos-Foundation/Sqrl/all.svg)](https://github.com/Telos-Foundation/Sqrl/releases)
[![issues](https://img.shields.io/github/issues/Telos-Foundation/Sqrl.svg)](https://github.com/Telos-Foundation/Sqrl/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/Telos-Foundation/Sqrl/total.svg)

[English](https://github.com/Telos-Foundation/Sqrl/blob/master/README.md) - [한글](https://github.com/Telos-Foundation/Sqrl/blob/master/README.kr.md) - [中文](https://github.com/Telos-Foundation/Sqrl/blob/master/README.zh.md) - [日本語](https://github.com/Telos-Foundation/Sqrl/blob/master/README.ja.md) - [Русский](https://github.com/Telos-Foundation/Sqrl/blob/master/README.ru.md)

# Sqrl - TELOS Block Producer Voting & Wallet

`Sqrl` is a limited-functionality release of a light wallet being designed for the TELOS blockchain. This application can be used to connect to a remote TELOS API endpoint to perform producer voting actions and a few basic wallet commands.

[![Sqrl screenshot](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)

### Features

- **Block Producer Voting**: Select which block producers to support and cast your vote. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer TLOS or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your TLOS as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get Sqrl

### Releases

Current 0.5.0 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.0/win-Sqrl-0.5.0.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.0/mac-Sqrl-0.5.0.dmg)
- [Linux (deb)](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.0/linux-Sqrl-0.5.0-amd64.deb)
- [Linux (snap)](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.0/linux-Sqrl-0.5.0-amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/Telos-Foundation/Sqrl/releases](https://github.com/Telos-Foundation/Sqrl/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`Sqrl-***.dmg`) or ZIP (`Sqrl-***-mac.zip`) file.
- **Windows User**: Download the EXE (`Sqrl-***.exe`) file.
- **Linux User**: Download either the SNAP (`Sqrl-***-_amd64.snap`) or DEB (`Sqrl-***-_amd64.deb`) file

### Security: Private Keys

When using `Sqrl`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md](https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
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
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team, and customized by EOS Miami for the [Telos Foundation](https://telosfoundation.io) in an effort to let stakeholders securely manage their TLOS tokens and participate in TELOS’ governance.
