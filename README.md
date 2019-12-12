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

Current 0.7.12 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc2/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc2/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc2/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc2/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.12-amd64.deb
db3e39af4aa36711c5c0af4b5e63d5eaad091ca65da5540b40302d29b2a220a47234459557610706c8f4ec6eabec92bb5cd0beda51986bdbfad3d3b74c10009e *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
3ee2ca8f7e5cfc59cd40da84ec55e72732ee147cef35225a5f2d4e7047c3c71d38d7792e45b6423727cc7dc5769ee2bfa7f56e13323678b10641a2c27c780b70 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
ced69a3c32905299849c1b6ff68b282ccfd1d89659bb33f67fb7c16c30ef2af314a865da1f35d2e7c4f6a3e53ad9e6401c61a7225002515e797972b1f93ab190 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
19e03748b6d5e9d42ceddf60855727b37941bcf807d040c5705421ad5e9e11d80118fe5458107ea8316a4f1bd4b44ecca314bf47c3b18bdfb5cc0fc2a241a1a3 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
036f4217729acf50a4065698d5972dff92063653ea969a2c31320fe585ba308aaa7f1ca2143cbae415cea0f0f343d26f20fa5edc5ef9c14a8e1aa02208655461 *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
752debf045e6c0105e80fcf02f1b3218d3c44af4accc4cbd9d24f68937253ecd90161e8be497aa2ff16edaf051230d6fc4ac4df4d3c7b1f2f1c2260b62523275 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
bb36acad70b528d28ad096a53bd41b83cf6963dbc8578dcdc3b3929ae2ca9392003bca1fba46d0bcdca975744a1febdd6edd78cc5d6a9a675466a92ca2b700aa *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdteGYAAoJECyLxnO05hN998wQAJ58csR7u39piEpumRLiX9/Q
pGJ6Kmbq1SrmxvXsDOAUPJT53KWNSuTll526Joq/a/TlR7NEx/fxvVi+cOGnNCmj
HdxLNoaExeY5HCDV1/hc5x+3P0VDF5wIfrN2YHh+de0yNXmr7cr0lgoJlR19dzf2
LzlKd1+8DcLc5JyZ14+Fv7WKeFvWwEZNY4KtRNrEXhqv7wX9b1snKVy5AqxGEHoT
1bVdt8uiiwvDVlTTKEDkc6lDNkaY+V3C41CtQliSqjzbJmfJYbGDuh4xGo+kf2l4
OBSq38jfF23wSzP1JEzipPZHKsxlm0rA3RuXYLWOO9UP1AMR1esUGiQ7Q8+iBebK
SYsju5AYfgpyrgC7C0fop/IZsp0N7sr5Mp+OdjHrkOy6TNNDtVRdj9b2yQuKu6ds
UQe7MpLY/n/PRt2b05xMiIDNOe+Juf4vvWuARXGYec8nm7VI0v/Rf7F+BF0XNvgI
bI0wnlp8YPbkeCRvRv+IbzqhL/sYLBMay2j7C2czxxXnSlWcis3cSUDfFF4obw/g
SRxBag6/Yr0kXYN8vkwpjbkZXBqdL8fVC2RW9RZ1CXzCxyRyyQR/BAJg5xUIKuCz
b+RBC1Lbp0AsfN+NnnEl+QZNnnipz+S6yJFNjE5c1q/rbJSEE/jeUfJhstc80jpk
r41s5ya+FBzxIX3SLUsp
=vZcm
-----END PGP SIGNATURE-----
```
