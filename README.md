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

Current 0.7.1 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.1/win-eos-voter-0.7.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.1/mac-eos-voter-0.7.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.1/linux-eos-voter-0.7.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.1/linux-eos-voter-0.7.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.1-amd64.deb
15861e901a0165256c6c5465f00a50c86f098d0d62b54b6e71d681cea61fb9c3f1823acc534761f330d0b63592af2a900c5f541301e6fe52a407219bffde6e4f *linux-eos-voter-0.7.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.1-arm64.deb
180aacf9a3d14149e845be2c757b08ac4aabebe20146e0795afb57b996f16da53cd147c5780e3569b67190b7daf9b5d28070c039f89220ab17178d6cbe7123f1 *linux-eos-voter-0.7.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.1-armv7l.deb
98eca71ffec54a25482ff761735bb459c7c86937922080c3cb3da211b22f21a3ede3bfc5cdbbc3c311c57a5e4e42d2a7fa47dc63a95e4f66022a9b78484fdb92 *linux-eos-voter-0.7.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.1-x86_64.AppImage
95a869d47d0f9da9fc6c38a865023b8f390e9b2dd0b845196ad07d2d393f97b3cc2aeee84e837fe5a8114a5bc48b580768dc0d2a00b6f6773c04290660f0e939 *linux-eos-voter-0.7.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.1.dmg
4a15a343d1c48e967ef885ed132698adce416648138ab02a697d97c15ea242d652280d0c7d9605ff0c8da62a9878dac6b2b11cd61b04e26642a6560c42c83017 *mac-eos-voter-0.7.1.dmg
shasum -b -a 512 mac-eos-voter-0.7.1.zip
fc39b8bc81300010f724f492def4b662fa4b19a53835eb54ae794d87e5243b8b29e8419617809744e537c3cd350e71e978e27c9bf6afc6a56739f6169b68cbe2 *mac-eos-voter-0.7.1.zip
shasum -b -a 512 win-eos-voter-0.7.1.exe
a51861b9c346c8b27f7d1ff30b19713bcb1e03e839c013c76bf4e2c16d4c0ef96f377a848f0fb896f5f34b9ceee4ca3f5011628b2880a8a6f0e29a2e609edc45 *win-eos-voter-0.7.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcPRQqAAoJECyLxnO05hN939EP/jApAWSxQ4uU8itZYzp7AcoZ
47Rxy/PSexOX+xYSzI88yiKBtbja8nL4zeDMg20mHNzg/oPTpci6BGqrHC8EP6kj
NC6L5/JZ8fO+27J+6/gsjYyFboRFjeklj1lHCjAtZkDp5oRLQNamUoNgWEV63eDM
8UfERE1Lax+tqPCkSxqXY5QENY+SgKox19JYSoBkR7pDC35du9Dn7t/CTQnYItwa
4c2pC5WLI+17WPfUmhn7kopcp7vmpSqy7gCgiHEAa2k3rOwuE9UXoM+EXiNNNNx+
vY0k4+r8KVmnhKlWxHVAysS0UYRe0bo7WcveIhT8nJ0ltyFZsdwboWDdnxJm85Rd
cdlOIxpHY+awXYQEM/sX21nhAckg3v6KDsfkDJlIzjYuAL5qjxrEZ1OsRtROjCA3
Lksy63RAcuzVeJQYg6RrDcHfx2X/JzNEbon1yp1n7DYt5FljC7qfYz4rgi/Jfjbb
/W04y4zt4rZ2e1qd1CARYfc3A/mkK4iiUf5xbR3p5HuY00mm335FLSo/JAoAyODf
OtyORVfRhkA/VZtSSDfbkFFa+lycs57eUoHXu9QReVxTZPQ0j++o1PT4CFx0Jote
TUkHxD8y9+z/QBra5iTnqozv83bGh3+HK3RFysRv0EE9Q1blQg2PZ04Q4JFBTi46
MsudY7AswJPMk7QFO4LM
=UzbA
-----END PGP SIGNATURE-----
```
