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

Current 0.6.4 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
8094d3daed5c7f2e024f5e9ae6113644d7ab3bbba87a8225ae4ee972c8970ae07f40058272371560ca3eafba20d1dcfd70b16a66688a140c28b485d1cfd30a04 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
e9e517c2a729050e8b998aeaf84818e83cbd94eddecac60d68b011a822ed2d8b8b0b83f4fc9ee95cc3c681fd98ca3275e228d3471132619090ae600b4386bfe7 *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
645a3ef146bfab32e185f4e8412bb4e477434d1770b002c8073b859710fc0d21b448f84a641598a8703d58f5cb9c68841c0642d3b11006b7f2dae35c7cdaac06 *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
0dee015c92303065480fa52b4a50c5afd58dc77b930fe2c50693760917efc1c4d7b9f6d288ec04ddd45e21c7c2735458e9093a5e8b40a7f74983b3901b240f4e *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
ba296668f48ec9f9bb53fdee35be856da00068b7b98bcee0d9d3de4fad73f02d1ad42bc306853a724df22ff148c659673db8135bf633d10add61d3a4167810af *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
6991dc61ab435b389a2903533ab635f835618092d9465f45a35ec904b3f4f41f9a1397059400f5a47cb5a0a3ad67075db93f2a105e648472953833abd6403841 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
4b8adf916b271d76ae402f4a10fc72b3653f4dbd4cd345429cdc16b1981d24641897a843c918c6ae7bbd2ad6651676b199e4a0e752d9037c8af97a95184e3f6c *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFE1DAAoJECyLxnO05hN90SsP/RNQl5VS7r/K1ACmURIPXhZ7
or/gKDdxKJyYIsoZBnV9a1flgCqTw8QY67LPiVdUWZcKNdzfsdrZ29CAtyHG8EyS
YWUvJ7UbjGNoQU2OLAk2714CZuFfOdxM47YVVJxhduZL/d49/H5XcmFTidpXqoVW
7I90UAiVkwPZckqmI8h30wIodtPhia0PiGkr9S3ekD7iUuou4Wxcoisxqb3ZpbXV
uuYoUJrFKJKN2ecNrRoF6yDWEudPislfdt5yHe/+6O3ceJf1Q2Wyul9YybH1oS1M
MShkcmmt9weB/lgHnIXPK9rRKyAq6OW24eOt4xB9DQMEy5P2do9BBdj5ba0gCdhR
qMA24V8vJDw0lAOdOEmeApntwOg4uBmmFX1tKLYruoIzj016ej/4uEXQEH3tNGDk
b76MJb0AmAdmQfHJjWK7V8+WGfhxeuDzzodd1270/xP8ahzmPcX3+vVnl7826/5h
MlvjN6VdUWLIVqItHloPErLa61LjkiZ78BPu89CcCzGbC85PuyZcLpcYywdfzS0M
bPXmT7nvV/Qnyav1GZemQFhbTRx/XTuHema3L45Sls6kJRTeoiOgIZfBjiCpTez8
sYycJ63TEvPlsJdusDU9uffokrV3fafWK9xiB7EoFjzt1Z0TUNCzkbRZVy1mw1tP
zJjiN3L8ZwFMyNgc1JwJ
=ht2L
-----END PGP SIGNATURE-----
```
