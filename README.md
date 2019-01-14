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

Current 0.7.0 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.0/win-eos-voter-0.7.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.0/mac-eos-voter-0.7.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.0-amd64.deb
45dedca9809ee0a280cf173785a1e828d70d031fb490dfe15143d724c000d90c5a616e6210d1fe73d9a5a2eb182da90dcb50d687fff8828e606552799738ea5e *linux-eos-voter-0.7.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-arm64.deb
b0c870363b2872d1aada4a087c7b116491c299bd4fea96f05e0d3e81f68e932e9b604dbb6e0073cd511f9c0b7aae03bf9ca281ac4b7a2858c8e64ef386d25dce *linux-eos-voter-0.7.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-armv7l.deb
89ed394b7e4f97c834eb883d4c96ee98516fd3f534973872c1c0ad48e380e2bb2157fbb4081cd9c1ff90cd0eb89f64367ba1091e0a078de8db41f89666aaf39d *linux-eos-voter-0.7.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.0-x86_64.AppImage
ec87d40caac53555643fb615de9674b8edefa8ef71b93c577a26c8b3c83f6273abd88809785c47217d10d96a37695a092d067c420b831c7ab13bb4adcdc001dd *linux-eos-voter-0.7.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.0.dmg
0004b2c1f7f3e4f123ebccc12012b21259d26d01a0a67be9b03216ab2846cb9d885bc0fb1ddc589f153d355290859349a3f181e3796bc069f6f36c42302a9ef0 *mac-eos-voter-0.7.0.dmg
shasum -b -a 512 mac-eos-voter-0.7.0.zip
3ffb82e66029af626f6cd099d4883b3be416fa21c824cb446cf80f58871e4b441b400446da0840462876cb2373c49de16750be07dd1c81c369b3d0070d989eca *mac-eos-voter-0.7.0.zip
shasum -b -a 512 win-eos-voter-0.7.0.exe
463f99128424622665111b9e7d9dbf09c871f3067df31d44343444771e9a9949a06536f46ee9079b46127bb8084a6f80ea2f953ca162012526e22662c2d65353 *win-eos-voter-0.7.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcO/J6AAoJECyLxnO05hN9IyUP/1I+N45d+/71Olmqf4o86c4H
F4MaZgc7rmaFMPemq/6vaGGvHRV1CYLEmE1Y5lFXNtVKR78X3SoEA49Uxi+ArYbN
g6YHwel1PtwksC46nDwicxtFf9XJxab7j0Qt9VkVPzWZDYMIu0SQeWHwDhKHpWyk
b/SfusjR+aubdeYbMw0r7cPMMKuhdy+u7oAhxJMUCcS7eTJZ7D3a7QK6awaJ5X7+
3y7Xy6XcmTULcctA3xjwMq5M/CcxLnTHfI3wNwJnKJb2u5WZFgsj6To1A9QAlcxJ
gklkJ5dvJxdHnHs2ed75oFVzsM7uzNzhJQgbQQpdskKmbJnMHkg6g+1RTIXDps4A
6VnQdib/34SwL2u51WX1T4tFCCWWe9MN54fj78li2iKbK2mQZ6DazJD8TEZ7QxCS
x/umbevTAryTvEzODLecN/PgUsjdSoctpTR8XQsIwR+0i6fNjEj3JN3DovwNzWuS
Lx1n6+Vf+el9DAABdL0ov73ONtc4ojdbXWtfaJJoXusAXOD9md0hwAMkk9c/VeuU
xtT2Rk2pwVKaXf31sxE7lwHI1nfATiMGuAPLUafrH0nmE+HfhnhzHEXqXCjkWgm+
AfJoi0lrOFUegvQN6HI0tnKsulExK0GMTutBVcfHEljTITENmaKAXwLcJciffWTy
r2qlPmomqiwimaxACafo
=XUHV
-----END PGP SIGNATURE-----
```
