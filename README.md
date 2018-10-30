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

-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-Sqrl-0.5.2-amd64.deb
e52c0e67e13d2d8bf683df978bb2852e2568605bc6d449efd4510293f36f69071c3a3102763926b71941b7078e03f5b3d0fa9ac94bd48378351819a18d565f9b *linux-Sqrl-0.5.2-amd64.deb
shasum -b -a 512 linux-Sqrl-0.5.2-amd64.snap
de215785c4bd10707d8f32a4af15062e14c2490c66e16471ca4fbdcdd615ec696ba6e1d41241c6fcf85fa27b8b5b98dabbe24cab50ab22990d7f7abef20cd593 *linux-Sqrl-0.5.2-amd64.snap
shasum -b -a 512 linux-Sqrl-0.5.2-arm64.deb
b175d098178056ce60002d421bf6268ad3294444580306bb60fc8fffb2c64b6ae1825f5a847dbff74b700424255cf298c997bc2c4129980577b07185f9079266 *linux-Sqrl-0.5.2-arm64.deb
shasum -b -a 512 linux-Sqrl-0.5.2-armv7l.deb
560d4e1d3fcbf050fdcaf039c3df6ff4db0d24a7f1abfd9d54016a19a154168b333ff6882bd9a2e65fdd3b9eb03e8161d439a3d7185f48574accd7227e9dd44d *linux-Sqrl-0.5.2-armv7l.deb
shasum -b -a 512 linux-Sqrl-0.5.2-i386.deb
28f5c285f326d8c346cb247412d2e3b0149755b791eff0c616e9e6d923a17502ca44b0e14ef9b243c8f0cce72d76bfb0894b9c4b65f893632d0fa71beb518c49 *linux-Sqrl-0.5.2-i386.deb
shasum -b -a 512 linux-Sqrl-0.5.2-x86_64.AppImage
1bf31254974893d3a66e4f93dce9e005e789c0f4c318129071695a659e27c54704924059f34262d866d98dd0e1b65c3f4349be07af14a3b15a8742463b1adc16 *linux-Sqrl-0.5.2-x86_64.AppImage
shasum -b -a 512 mac-Sqrl-0.5.2.dmg
6d51a65e4784ad6951f58940038f56b65f4116c0efecbb6ba37df6158e2d24340dd5ddb46a0f726a21d5080d34ffca56e5084680d7d41b3ddf1473ec8815bd64 *mac-Sqrl-0.5.2.dmg
shasum -b -a 512 mac-Sqrl-0.5.2.zip
a78c26eebc5fa87517deb6282e4aefc0ba181c86af84253944b7a00c767098f5411dfb2a2bde42098d6aaf58aa0fb5fa9c88377555cef3fb86faa98f6518d242 *mac-Sqrl-0.5.2.zip
shasum -b -a 512 win-Sqrl-0.5.2.exe
6f32aeed2867230abc51d328ca22c8b56465268d21db43c5f5f09084fd0f93648bea8cf22d1140f6c2292b937a284088a9f56cbeda0d4e1db34a7c8897d3b7bd *win-Sqrl-0.5.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbx7mMAAoJEDT4ke1a0TzTLnQQAKwE69CKlVj8I4N4ZYXBpYVF
qPzxuHqdf7WjrPNFnpDCf0jv7UUttgtrsIH+8g02H84PCd0e/ex1DthHRQV1WORb
rNWOuhaIrpreHl1fQlWqlEDE/sWr6BjT5yMoFH0QazYWMd7YqoURqmfqX7CibIpn
u8KHUdk+aqukAiB9jdkx7J4/eKbUbkHXqIYRCy0i3BYDUovqkG6mk8//Ci8BrdPX
Xy00s8HTpEUKiWCYqpfnijH00Lts8PWb6SVtDZUy91e54K/bAFDYH3lSdDUuh9//
Fiz83yJ1QY40+7cng/hU/u7ttjlS9e/RuFSnkQWeIMCvtfCJh19UK5Xy1VdSLYP3
kPrs2Lnie123SHL+FkqEorCAIK2BQoAimN5ACWiIomY/cElA/OOZHL/2rSIekJlG
1ziPIwu3935lUEpkJ469W+9sLYztLm6IZnrIS2LOi9quhoP8AaL3pAnZwg4rMUic
G+LprMfrKKNrl8ZL/5rz79DdAiwjaLwAYEa0Nn4E9v0muhyv7kWIOBGlXxOiaFTU
DXLITLERf/ZvyH73RYaYpw6KLeC4gecWW1Yo/z3mTnQ9UTtOOnEoPCTrNjuKSqye
s7g1TR6JxoHrlj9CVnCuJS7YKRKrJG42MVT9xDLWPPbIX/z0tpDajn5Lh+RwiR53
f2LqkSWbrEvXtMK0fHv9
=P8i7
-----END PGP SIGNATURE-----
