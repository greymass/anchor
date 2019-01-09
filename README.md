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

Current 0.6.7 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.7/win-eos-voter-0.6.7.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.7/mac-eos-voter-0.6.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.7-amd64.deb
f2899ca957d9703ed6b1538e00c71d284762cbc22514b4a871811ad01092c8e3d50a925b237255b4853fdf4029c20a0b9bdbe839e9a41686465770c19e228d2c *linux-eos-voter-0.6.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-arm64.deb
25de79b05c683a6daa0f0f96d63f6974034ce0ccdd169f05c617a96516dc4f5ead2101408bcb60f9133e8e6ca11f467121abc51849e5fccc71a15b1254acbce0 *linux-eos-voter-0.6.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-armv7l.deb
cea54cd8be68cf8069924765a33d23182d74097f0eb3a4ef2fc0519fa06a2f5f33524bc7eb7ae71332a3cb3d98ed4e42b8c3f3c99cd14eec9de38a19db70ba73 *linux-eos-voter-0.6.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.7-x86_64.AppImage
646a208065bead3a44147dc04049e0ca0ea635fdaf8f97de12eda48d24b8371ce17fdf4365c1dce44ba5c18c144a4113321233754049b88fdedc05d12870170d *linux-eos-voter-0.6.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.7.dmg
755b651de8f0c7b160ac54c64178a8de2ea1dfb09e23f5a4c03f431e71a7459719e8c9aa4ca46bbcda93148fc0a7a65101371e20fbbb682cf47608be054fc784 *mac-eos-voter-0.6.7.dmg
shasum -b -a 512 mac-eos-voter-0.6.7.zip
8cff2b208f3fa250823787a319f9b9799b38ee233c7f237891a7a569a7bdc382a8ebaa62af8ede2247e5af71a3d9858db459e88b916278b01553a58cb484939a *mac-eos-voter-0.6.7.zip
shasum -b -a 512 win-eos-voter-0.6.7.exe
f06eee1cc307372219239eda2dfebb6436b8edb1ef8d16db47a9519aa7bd4c2b297f5198825e5702d177674206c53ed032b521783a74210178db8f4357dcf98f *win-eos-voter-0.6.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNnY4AAoJECyLxnO05hN9/ZcP/ivas+Kk4tg2oklVdvSu+jGa
wQUM5HNo+qJMKStImJs1aCGbcXPeTnqakSxUhkgAoinktTskWTl+Ti4thaA5h8Pe
cYg8nhP0G4vnwITjnjMyi5LMRpyXDRFc9q7DA2jxB//ZQkvm3fGb0uZSCSfihpY2
trGGApBjbHCG+Vou/LcVrt/s7KyINOOueiavVCbgA16y9U+1thh+YYddGR4HMTwi
o22FkOw1+y3kA8/1npjsyT92U8pG1ilzGCRAMTUBE5Kndbmv6bdH04IzJmQ8oXvf
5L1vmQpg4BbAMXQT0npgAsxRMMoVmoxcM9UnXrWoROzSC5+5BuKLmrkuh9Moy2I8
I/bsRgy2VyrJwRzMi4aDw4qJNwf4166KSl4jHdPk29CupLDsJrfAXVdogLRSJTKC
nt7qNGSqg2SVL8ramMCp+7z9ioT5nxNwbcdCoWr5KorofzzTJXQ9SGc6Cmt5Oln8
DX5U04+r35vCt8GBdBPDF5Sx2ZRE8td33m0wSabvAZB9va/CXG0O5uFXnn6GklJb
/8rAUb9kfuQPykViy7oky6mwn8WO8bHd6bkaKinoVHCxVfw7ZPCghw8Fz59jkOdl
3TGJnerCfCuEEyzrD+ikBeAs/4toBaK+M8YiabM/5lI+SFwca+aZvUtGngZkjUQg
X+fPa5nLn+vheSCBrMFq
=Ybzo
-----END PGP SIGNATURE-----
```
