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

Current 0.6.0 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.0/win-eos-voter-0.6.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.0/mac-eos-voter-0.6.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
d4ef6a69f5e5c5bfacbd96f0009552a37ededa18663c7c002af3d19e22dda48a46f030c7294e91b6d6fbc3dfcf75b202a693563a97a944881001c01711b6d3ef *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
7722e90db10bd53984b9eb7e00ede8595bbab9e0ffbc72d0acf4e8ff79e6e771a64c3fe4e2514bc8d59bb34256e4c0072beb633fa713720507fcd62b7c2924b1 *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
577ba5d04fed39cd5425af8718e065fb712d9bf62854811beec233053ff5c2d1a66ad2baf50e079fb22cbd2aa0bb0929b513e7f44258ca986a71f340619eff3b *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7b7b5687b3c3f8fae4049cd4dee1b0b28a6018fb98422cee7d3501a3f0e949e5de0d0b98ef48d303731bd94a603a1a7cfdd717df2a3a4f35ad8b94bb83ee4426 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
shasum: linux-eos-voter-0.6.0-i386.deb:
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
fdd898c8e6a97857b72709bf01e21e74b77ee5dacf63972e7473a19296940a28c34ae2abc33d14c4b411159a58acd913e7304eafa483ff7c49303e7fd344e190 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
d5f38d3bfbe8a02010b2f1a633f21bc08af68b020ad747c0cc2f8a92ea4160ba80537061a9ca643b7ed6e8970a2f9369be0fd531d390940e1d4b0afc6ec6c0ac *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
16ca3f7e145348c4aa35fa0f581ff25a6e794d645e6d0028bcfd16a0dc628c1501951fcc7f27578a17b1e3aee190617c47f78f616123af4a813f12b600f72c48 *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
3fea6e514faa56eb3c2abca1d31bf857b652f0dd29a42a260d8af814f14443494368149f4cd1d4adaac4b43465f53e1ce4b845a2b95a4e99aa9a800ea7565e67 *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2MQgAAoJECyLxnO05hN9OzgP/AiDx9Rt5V7F4bBlvN4LEHVG
y2XOnxodtPDyD3dPInn+bFnWpqIajjxSbhFwvnjokFmuuGKLtuY0oAKz1Xiravox
h5+Is8E67HgGia3scnL8qMpax6UXX9v56rQfGGUEPHUqXCRmbMhusEkP1jSCvsjQ
BICVnEWyGi4afXR05pAZFckqg+bQhbjvnimMH9UKZh5zFOcXW6HA4lgSKGRkcXC+
YwA3oRnGPetnDNhU9oPQuzmtFGe59HrU3cIEDer4rwzxo+e0dYor//7yWjZihYfR
ZmnS1Q4h47U3XkLRWbQBOmRZKgPAX/4Kv8bKRWearR7H1UQIRIeKuRhlg61gzxTW
Ee2oGs0F+waKbVXS2UDoVk94DUvOoGu4/PPUM/KIhYRMYuB39/pO6sxYWtmo+GEU
39PqrlSnCTr7YKe2xuOZNUQpI5CgcXJd+HphkEpbHsh8S+/Gv2m7QS9IGy00DOCV
R7sMRaXKEorFiwt1L2JHrB6HWElzH/zmDullH82T/E0q6wq+xi66Vlyj9OAoCUfU
NGRHZxftulaTX5zOxnRJvlzsRluTYHvt7Bzz+U4N0b0SZrHLlb7ul/LkPw9OWn3k
9YiFq6QYbXHc0NKLMgc9j3S14AYzEZTxEzcJUAm1dxI0jYPCc0M4UIv3ViRK4PhB
CvdJUdD65R2Q8sunVnB7
=SEwk
-----END PGP SIGNATURE-----
```
