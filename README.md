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

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-Sqrl-0.5.3-amd64.deb
00db23dca4cd557e3393b9f0c3b616a18c61801a9fd80ba89b779e97902e25dff64ad8324886a1afbc4087aa5ada9b53b00e611530a4736e8e510c58a8bbc7af *linux-Sqrl-0.5.3-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.3-amd64.snap
48dcfb99c10f48a17a6d5e4d0c8ecc0ca20ae6a0bb1573c2d64c9ea534c040d5eba0c072c7f29b58acf93327bb46a4fadb41f3fc7abf52a7642363ee9edb43cb *linux-Sqrl-0.5.3-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.3-arm64.deb
d8a090426d8251a23a062ee72d84f170f9393c1a8d6b54f3dd328f87eebdbb221bfd064bf7714e11dc015015c7324ad4126afd35e47f939e28b7f4fd4865b4b7 *linux-Sqrl-0.5.3-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.3-armv7l.deb
599aea0e1c05ae849a0a8c223d9ba4f15ccf13d61695543c8e1a55732886bedfd2a38954f145b400659a7e9e331575b4ad958463c00fd8525bcb4f1f8fbdfa1a *linux-Sqrl-0.5.3-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.3-i386.deb
d440abf1f2fea4cf3a897ec0151f25325b1382a4e47af66804a89f3d74f12eb9218b8e75c6cd45f8ccad7a4445caaea220718476346f434cc2c3bacc72cce113 *linux-Sqrl-0.5.3-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.3-x86_64.AppImage
caaff9e514270e7c3f049b6994ed62d832a8e8e8624e6e63ebec8daaab5e222af5ec29d5064f1cdb8366e55fe10e2fb7641ca2ab2afbccc5d80e1b08e5bcf60d *linux-Sqrl-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.3.dmg
0c9facc6c209920b505f4cb0c89852782eed4514ef83f141fb422b21d8397bbd9a25de6e13938ba47714034577c3aa5bd39b92a44a26732c16fba70ffdda8786 *mac-Sqrl-0.5.3.dmg
shasum -b -a 512 mac-Sqrl-0.5.3.zip
22faa23648bd4ccc3252d8ba20267dc7dc1b9ef8c2a8926b25ed3812df49f57e279d7b0efb319e89fb87c437cd78023d67e5188bf385315514b6e509e9d36872 *mac-Sqrl-0.5.3.zip
shasum -b -a 512 win-Sqrl-0.5.3.exe
8af2b3ebdcd60783cddb8a5048e3cd4ee001ee9f3da521a16de81b62605674f373a646df657bed242451d6a511ebf8b0cbf82f20497138a24ab396f998f602cf *win-Sqrl-0.5.3.exe

-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2L1UAAoJEDT4ke1a0TzTI6kQAJ1CRs2umFPRJGMPiQ/A0eNj
zBNbxf84Y6m7DwjMufswR+cRfweD63PcSPYDRgMQoN4fj03NXylwrB3VSsQ9TSUy
Wq9irAUfSQe3KQZq5OlZqbZVRjPVq+bkGsHvvQF92B69lAraebWoXNbuCmRRwdcL
NvhUWuc+JMJxbvC4Sd0wB4RBhptTqrGj686cvoo/CZa9pb7p9dFt4PYQZU1XfJh/
E3PgMPjlTRPEv6e2eLeArijcJQqxS42s5kENSMqtUBiTBw7/dXUftXYYJlue98Ti
SrNa0kmUKKT+YCOnPrbskZpfiup8M9Zv7hM02YFvJvMIQRJuAq8/diCHMmMYF72G
o0qH1aJrkaicAOSfrHKLxtl24fazN2S6pqbbr35TyOYGJmcKo86XupbJtVBOOwUD
zCjmx+o7OgSrDcP+mFvT5Cq+85sGJMsfrMLZLPIZjar+3AXG6kbsmtlUx9lQPL76
RGxkCvc/svMRdhKI+qqcjqnT8ML4SyvelypBXIIbj28haf2QGDhrII0tX/8otB0B
JVgPsS5pfvwSG0QvxHFg/PyPmXPm5291hbkvNV4u5AGfP+VIAOGK/s494KW9tlJl
7CiLBXUYALu465OzfpUapZwN4zmi9bVGo7VvI+UFzPwv94KI07UiirpAkFXjy1NM
ge3j53b/NUCIbfLyQCqF
=fH8B
-----END PGP SIGNATURE-----
```