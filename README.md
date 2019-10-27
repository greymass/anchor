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

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.12/win-eos-voter-0.7.12.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.12/mac-eos-voter-0.7.12.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.12/linux-eos-voter-0.7.12-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.12/linux-eos-voter-0.7.12-amd64.snap)

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
3543bfce0ac2e452ac82be539da1ea35ffecb5cd2802135362570f44a38fa46290fc42d5f80546024d3df0edef1bc90e90c6031452c2c102aa153933d6684de9 *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
1d70270a7f37f2e4caaa3fb2b5df761091dd6c711cb23aefe87965ec790b1cbdc46bc3079548d862e803e3e0e5887da69653b98959c3112aeee9fd4152f3d874 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
2e6f10ac7ba5b5c43d1f16935e62d34c922cdd48f4f31e6bb1d697e2e35cc3473b4e083e4bdcac34273b81aaf7255ec4acc2bb42f9c0cc3dca8b9bf516cc2f74 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
6fb76795a66231a8809acbad2709edf94789e7a0cf36a2fa3a9defc472c7f4d70ec4bb0d9e458d8330fa384b5c15d64c454cb429cf24de9a679dfd89febbf634 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
fc814169319bfdf91b52e2f5ac18115431734552f8c18dbf8f43367113641946b6670dcb7805c1cfd9c37604af5adc0013e4634732d6abc450819e0f7b26dc3b *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
eb6e193ce91e4e1992059067f985595d7ff4da2a50e8c25a1e1cbc3302937fbfcfd7e2b3117f776b690a9247f0392e4035e7f9c78e2c678497e0f308c6154309 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
97edf7aaac9a0265f8ae21d70ce021294ac427342353bb306f1b87cb19b10c1f8dbb50a1b51807587ae4c40dc92fbe06f70053343b93d54b2ec2675569dfef9e *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdQNYzAAoJECyLxnO05hN92H0P/315x1SHKABthYnHbDj70pqe
rkkHFNSfGD0kiAkeAqCh8gPxCcMnP1xqMlM4cMnY2OHwOt0jjmQxcixcIrWZdhmA
7wKTvLa/A2OfinRQ/+EX6K79iSTjbLYYDeuS9ko4eQNLcPFJ+gnEx0bjQZKaVtzs
A8ULSWXpWqOZ4mR9ZH8BkY9RO4zhFEZUzp4kmGGeJmDWKbRq5pGuH7713XKwewAY
ZuClxF5slcRcLvKx2H/IJgfYU4sPK8YhlPX3Kkr3spKJs3pctNyBUxsadmjKZ/1C
gXWKpjIbFOQTcoetYccdJe5fT7vdKZv7Fv7SszCRLAUEMyZxcTW7f6nj46hIKsIs
PWgWegdO6JCN09KC1zfslTv6UpJI6uSb42CPq49EcL1FKsJ2X2B4sA4GLmwmsQSx
DtEaZcOvnC46rCuuhEZx7EXRPcixdIuuJosqv6qn2KKSqU2e9oyLfcPKy0nQ7H+p
DBp+1kbEp5bd/QxSdaGE1ohOH2Tf1JNP+fWSXOiRh5987IC9xFOtl53hv+P/nTlP
KdUo5l2UsjR4qv1TrFUg1s/MeMk+36ZSMkN9zqIG/nyMn2/EwGftqb3xqflm0lu6
fcgm44kM1bx00DdRAseR+Wa8aZ5SR7ALKewvQU6+3br9hWS5lkv9vdpzdA7oWXHl
fcHjrk15VeLqUpVLiFM1
=7eTt
-----END PGP SIGNATURE-----
```
