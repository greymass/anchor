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
feab3703416f6328d809d89e4f62388d407fbaaa975d5103890487d7b11627f901c6878fc7158bac0868d83e6973c90092352c61a834bbb7cd68968191e373e8 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
5e68149c7d1b762bf661ac887a99190d6b9d16731b01a43f4130eb18513a00671557a0796739d0cac2fb42f5749957c4c68d0bb9f700f357ae22fe7aab714d3f *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
b208e4a84dd8657a26460a9cea07d5801a55f45caa1a3b47300cd00d562e0940cb704c69186cf564b099070731e033d2e7d295fa887071e4c63810862e216d2e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
2824c3de0db9cea23b4c02245364c8c9c13e214a5bbb84cb8ac7be3da6cf3839587a9a0114fcda7b84daaccdee0898f8305737c725e8017170a6098c66f2ccda *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
cd16515e50e75513905bab6618f85216f6318ecd697d96771515d88039fa84a80ddbedd55183b69d22abfc56fbc7158e7dfad105ac067c552eaa7a7bed83ae6f *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
29e5721b1400f4895e441ee424490142bc0c5bf6c8629f0a05d649e9d0e5db0254e6fe3ce6a15a341b565a59097c124e7e037564331a5b8b43cf695dc35b229c *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
1d23b03369d6e7980b7fb35a066930e238098303c0fa45df58868aab0bbb9bc0513a84118e7febc5d163d466cedb992f8fe1d015648f1cfde63258123be3e0f7 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFFXEAAoJECyLxnO05hN9EJUP/iOwpyf7yQIbZCNPi2t+YphX
tELmQpGWVCtaBsh8oKnQHd3SmTVIIaJAwY6GgDdHMcOaZcsWySkbJIyB+K+tnkQw
s/S+43Bo5wwGS6vFN5ibpd+dWywpsKTIZxz6HT/Q5+f2VyK+m4fcPF0aSrv0WkVI
kX7VcojR937RCqszJ/uxiiW1PL8GW+JYk7ikkkHoNbVTeyzuJsjK7Kb12W0XSg9U
LFstt69ZVpK7bgGXh8/s3V2wgz2xS4RfHZT2MkUZ8S9zM9AlQK1gAQixHdX2Blvp
UyRmEuLAxZT6uU6L+MZCJQgfNgTnQNtlxgx9NBTsXS/Rnp90jmasulvYdwjFcWqL
CLQ3SfzGjEYHonnUnwIGN4L04sYYLVP3YoJQlDVMT+tIwDHMfSWx5ch/5C4DgSQB
6v//kFeZY1gA9Znrvi7+TApfWroKbSITKoTIRSnU9lRRInq4HA/oDuwPzrbytzGD
hrrh5gi/VJQ5jfhnCjlnAkVCA7fIuqLGc20szlngOIE+PQM/CzN7PWQaxnV0wIk/
nYVFZ/T4tK1gMjmLPTF+4WZbOjAgt6MDrnoUuNwv6bx1LnZiBkPPkSnall9oB1oq
Pnemf79YQjwTwovHq94cZtvJryqnG2REA7a71K+KR05pZW2f5+nVAEecaOZJaSiK
aY9fCRXwjVencsfKq9nN
=CLtH
-----END PGP SIGNATURE-----
```
