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

Current 0.3.0 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.0/win-eos-voter-0.3.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.0/mac-eos-voter-0.3.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.snap)

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
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 linux-eos-voter-0.3.0-i386.deb
383d2e030ee927c76c54eeb6c6ce13913a0e39cb97a2ba297af15fab45913f96545b2025b986115d01a8ecab14e964749370990789e68ccdb19a6c5210933f5d *linux-eos-voter-0.3.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.deb
1228f22a4edbfe689a30780b9f018bbe1de81e58384350f74039e56d10ec65cca747f7c91971df43d1fe92365fc7f38ebeceafb3b2bee750c267a021564ab6c0 *linux-eos-voter-0.3.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-arm64.deb
fd2786f97971a5a94c1e35ca3a95b6ba8c9d916906ca372e4d705dc7b6cd9f0298921725a6df3e6348cb31efc321bb5578086f8f7171a9af15b6dc0045ae59fd *linux-eos-voter-0.3.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-armv7l.deb
21be6be8e70020b2655bdcadaf399a2440d3e4c9988619d8a9d6c81e16151271ad1d5568452a219d02f2e9ff196e79e349f7ec876be0570e424165e3b0cc3c5d *linux-eos-voter-0.3.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.snap
a8ac848ee23a67ec1749316d1d4fbd81c19525c6a39fc1b22da89676f26d0ceec35689ae3b6feaccec5e6e515466d8b087ede1c057d4b01fb97295faeff80dd4 *linux-eos-voter-0.3.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.3.0-x86_64.AppImage
e55be02a047054de711bf40d3feb238d12485a7f8f4329c4735ce434205f49ff47e95fa0ed32d42a7ee16bb3db7f8f1602530ecb5ef009331af2d91016ae79d8 *linux-eos-voter-0.3.0-x86_64.AppImage

shasum -b -a 512 eos-voter-0.3.0-mac.zip
19e5c689e51c9eb46037f179ef0d93e99b5c02d20d0d8b96171f13082b17253a2a6c53ad759d55807e8546e18f1fe90ace6b84d7ee98e157ccf5e858c1210f4d *eos-voter-0.3.0-mac.zip

shasum -b -a 512 win-eos-voter-0.3.0.exe
ca143a59ceee7b656254a4ee1c0bb3834ab54fd633a87dc3a4d742a3bec56ce0a0ba4ed4384e2c8571d36075acda6ef4cdf47df4e490efe798b8a95345aa1bd8 *win-eos-voter-0.3.0.exe

shasum -b -a 512 mac-eos-voter-0.3.0.dmg
63a962436a6ad63cc7a054d9ca0efa2c0d5c355f5f7b83161d10d1129be234407f46e7a96bcd8bfd107a8b7b05ccb8f0e95457ac38e3b6060985868d4457fdb7 *mac-eos-voter-0.3.0.dmg
```
