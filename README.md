[![version](https://img.shields.io/github/release/Telos-Foundation/Sqrl/all.svg)](https://github.com/Telos-Foundation/Sqrl/releases)
[![issues](https://img.shields.io/github/issues/Telos-Foundation/Sqrl.svg)](https://github.com/Telos-Foundation/Sqrl/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/Telos-Foundation/Sqrl/total.svg)

[English](https://github.com/Telos-Foundation/Sqrl/blob/master/README.md)

[![Sqrl screenshot](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/app/renderer/assets/images/sqrl.png)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/app/renderer/assets/images/sqrl.png)

# Sqrl - TELOS Block Producer Voting & Wallet

`Sqrl` is a fully functional release of a light wallet being designed for the TELOS blockchain, and supports any EOSIO blockchain. This application can be used to connect to a remote EOSIO API endpoint to perform producer voting actions and common wallet commands.

[![Sqrl screenshot](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)](https://raw.githubusercontent.com/Telos-Foundation/Sqrl/master/Sqrl.png)

### Features

- **New User Account Creation**: Sqrl provides a simple wizard that allows new users to create their first TELOS account on their own.
- **Works Across Chains**: Sqrl is the only wallet that can be used to manage any EOSIO blockchain in a single interface, such as TELOS or EOS Mainnet.
- **New TLOS Key Generation**: You can use Sqrl to generate new TLOS public and private key pairs.
- **Block Producer/Proxy Voting**: Select which block producers to support and cast your vote. You can also register/unregister your account as a Proxy. Please note that the block producer voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer TLOS or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your TLOS as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for block producers.
- **Buy/Sell RAM**: Use your TLOS tokens to buy or sell RAM at the then market price. RAM allows you to reserve or release storage space on the TELOS blockchain.
- **Create Accounts**: Sqrl allows you to create new user accounts in TELOS and allocate RAM, Bandwidth or CPU.
- **Simple Contact Management**: You can create a contact database for the TELOS accounts you interact with frequently, which simplifies the process of sending / receiving of TLOS on the network.
- **Interact w/ Smart Contracts**: If you would like to interact with smart contracts directly, Sqrl allows you to lookup contracts and call methods defined in the contract's abi.
- **Local Wallet**: Set a password while importing your private key to create a local wallet. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the wallet.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get Sqrl

### Releases

Current 0.5.3 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.3/win-Sqrl-0.5.3.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/0.5.3/mac-Sqrl-0.5.3.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/0.5.3.tar.gz)

The latest release will always be available on the releases page of this repository:

[https://github.com/Telos-Foundation/Sqrl/releases](https://github.com/Telos-Foundation/Sqrl/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download the DMG (`Sqrl-***.dmg`) file.
- **Windows User**: Download the EXE (`Sqrl-***.exe`) file.
- **Linux User**: Download the Source (`***-.tar.gz`) file.

### Security: Private Keys

When using `Sqrl`, all transactions are signed within the application and your key is never transmitted. If a local wallet password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md](https://github.com/Telos-Foundation/Sqrl/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
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
git clone https://github.com/Telos-Foundation/Sqrl.git Sqrl
cd Sqrl
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [EOS Miami](https://eos.miami) team for the [Telos Foundation](https://telosfoundation.io) in an effort to let stakeholders securely manage their EOSIO-based tokens (TLOS, EOS, etc) and participate in the governance of any EOSIO chains.

`Sqrl` naming credit goes to [Douglas Horn at Goodblock](https://goodblock.io/).

`SqrlJs` + `styling` support provided by [Amplified Telos](https://amplified.software/) development team.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [eosmiami on keybase](https://keybase.io/eosmiami)

```-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-Sqrl-0.5.3-amd64.deb
shasum: linux-Sqrl-0.5.3-amd64.deb: 
shasum -b -a 512 linux-Sqrl-0.5.3-amd64.snap
shasum: linux-Sqrl-0.5.3-amd64.snap: 
shasum -b -a 512 linux-Sqrl-0.5.3-arm64.deb
shasum: linux-Sqrl-0.5.3-arm64.deb: 
shasum -b -a 512 linux-Sqrl-0.5.3-armv7l.deb
shasum: linux-Sqrl-0.5.3-armv7l.deb: 
shasum -b -a 512 linux-Sqrl-0.5.3-i386.deb
shasum: linux-Sqrl-0.5.3-i386.deb: 
shasum -b -a 512 linux-Sqrl-0.5.3-x86_64.AppImage
shasum: linux-Sqrl-0.5.3-x86_64.AppImage: 
shasum -b -a 512 mac-Sqrl-0.5.3.dmg
4fdbd9542da85351378b3b03cc7266315d151440e2acb3c321e8e9c467a4f1e0e7653fb6be92dd795c78a7f2c31ec5de85a55555d1f35ec19c8f4379d6361cf5 *mac-Sqrl-0.5.3.dmg
shasum -b -a 512 mac-Sqrl-0.5.3.zip
8f1a06de6807c0616e1dd9abdcede2deb5862548c0a2ade4aa9023bde8d0e6667634a85ecf36e2a5cafa8a255665e5350f1d27abec708d5aa3c857b37ca03864 *mac-Sqrl-0.5.3.zip
shasum -b -a 512 win-Sqrl-0.5.3.exe
585dec9c69d7cae1c3fe14c23e49ff2be1b13c9b73bb83af4f6e74e33d4246231c1c55be88c28e0c12ac2a0944a81166a6891150f076d4b1718c5ca9ce9754e0 *win-Sqrl-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2Ls9AAoJEDT4ke1a0TzT+wcQAJa+Vs+5nAryZZTNzCORQKLE
icXErjGoQhJBZqhFgJcKH/aGoQg5KUfKqT92cgwmkVJHTgtp+boFwxOJXog1iHFS
JNM19wSfZ7kKCltMYmWrv4uQXs3Vpya6je/5KJ+mItMToZNjpVXKzRfz8J6rjx2J
Mu2M3qo71pilUcYQbKUsArcyP+G6Qj01ETuUwl151TKqm9bJcS8cWkFx7M681a+3
I3f4zzAkgas8+7oaGJ7JIhPR47X7obOr1kEBvzuZ9EkiBqYt4iSjb/3+ZZrX9L5P
BxvdW1Q6auYge1Shd7galZwIKJP8uc7zwkgj3VzFCAVZLPSX3NjafYVUYK0w7k8q
YVDyk5KFrEc/2luJ3LvjFviRmDHWqboLyjwWzx9T2P2QbZh7/5SlOD9St8/borFC
GCFgvNNtzC8OAburGVLkT5+Tao3BFNzpX3bFyOgTtxCmk1XitKoakAWO1i2fVpXz
B2wIBvLymMvjFnIG4MowAss5ZpSJnPmiWsf61tecoNV8ulgbF3dx2SGx01Idb2XX
vv8A/5fWw/OYhIMK7tcHu8RIpTg2kNuIrtWwhdNfHsny+gZS4M7872HQinhOTnW+
h/M1MGJaJ67pDYMtsBEtXf1hjBwUKukRttDGuKi1sNxhaXgHPnAD9qqBSajGgOVW
5MlGMrNCim9lWpEQkEps
=cpzZ
-----END PGP SIGNATURE-----
```