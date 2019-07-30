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

Current 0.7.11 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.11/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.11/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
d2b5db8a6d0b4e0963d392c72c400581959766cd5f27fa5032351ae6a95bc487fd30773d361226fdc2dd97e1d39433a54eacad72583d1a125d6b46e03e78ba94 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
3aeea5e196c48f7a7c03669c25f99110cedabfded3df9f97e3318e079ccd216d10f603beb04f840911ddfaacc663d59a47e3539db4edf8616d6bfe4b4b5e83a3 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
a477912c77bb93edefed27a87b58cfa19673d308a68ee649f2e7dab8aa5734644ed51d758908851f0a71e78739547bcab39565136c4893ed150de47a5fab2d47 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
02bba946eb3deb63690387e6233a899c68491e588d7a1b95b62fb6f89210cc39e365bd6d318890363ade85a14f9ed8873dfff42e2d02e29d0fc6e9dcb6e14225 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
5e39d14a25338fc25972f0c89cfc98b4cc682b66fbe48e9888f9158ea2a6bb502de23454d8976014bbc76e26501d7ecfb9ad118e83ae9db75345689a464af7ee *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
ed39a12df4a3fc8ca859371d34ceb86dd7516cb4f2a5290e3e6a2c652ddcacd7a5cd766bbccbea01387d05f46d608f4852c3b784099da063c5cd733f996039fa *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
9e2df61a64b0ce00a13a005da1ce0d6f8526f4ab395465e4898268357be61bab4030875045c4c2b08ba14144500922a55d84cc92f534a0aabbcac2fd9943c9e8 *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdMimDAAoJECyLxnO05hN9PH8P/iKdFecdVwaTwRv/jygRtekg
p38xPNiN5xyQzm6KgW4tg8IHsof2GKD0l0In/IcPiMIm0Zrvqq/StxluJxk06ZJn
b8shvsZD3OHgFtvCVo4ldEisbn5d6G2VqG63nobeg3yofPDeKpR5V/0/9vkhQSos
XOZFhUw958oqU3jkR2dcgDsUZ7gISlu6Cq+jvbFuGuwpaeoKCyxCfA5tY3bUPUsK
C4nPZUl+Xstz4rd5T92R6x1SBTNEUUL6TrPK2R2VhkipMeHwpGALmeGDS2+Nan4D
4AI93h3vNzyutqTXrdm0mJJo3QPQjgnmy6FBew749Ho+km/qEiEwgHtTFNGdSjbz
Ok+J918CJaWpp4Esl/m4Z7BxTR6XlChWVnaurXhxNoeRoIOlLvFGWwg02IlxADBa
Ecz0dJ5cS+AxDHntUQjm0dBh+SSpXYvSdZ0Gx8+ftuS/vBkMc+i+5NDqtYbWGXqD
UG9LfitatUcsrSnsQ4CAdirAmXuZJR3nL3sn3meCRVWNgWi6kNn4voVAFALtjfT0
qkx9se9phO4uXKEbve90/i2UOwXHbLjol80LSkOL8AggzyuQozI+don5JR8cVmxA
F3zGNbc+OMKPoyB9HpFA0PPbG9/L3TBDawdAd6R44cXijWI9sPO07DaVA8dWtZKH
yYi6VxpfyL9HSnMr/4ch
=RUm2
-----END PGP SIGNATURE-----
```
