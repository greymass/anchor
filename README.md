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

Current 0.5.2 release downloads:

- [Windows Installer](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.2/win-Sqrl-0.5.2.exe)
- [macOS Package](https://github.com/Telos-Foundation/Sqrl/releases/download/v0.5.2/mac-Sqrl-0.5.2.dmg)
- [Linux (src)](https://github.com/Telos-Foundation/Sqrl/archive/v0.5.2.tar.gz)

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

The development of this application is being led by members of the [Greymass](https://greymass.com) team, and customized by EOS Miami for the [Telos Foundation](https://telosfoundation.io) in an effort to let stakeholders securely manage their TLOS tokens and participate in TELOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [eosmiami on keybase](https://keybase.io/eosmiami)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.2-amd64.deb
001d9e8b38dafc31bdab360dc758c51e7a978fc80b87ce1e03e55cfd0f99110704ead1add62b1cd4eb550f6da0aed1492ade06c57269d607ac6ace0d1d5cb0fb *linux-eos-voter-0.5.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-amd64.snap
229de9fdab1a3c9e1c660530774522cd6cb7829575f7ec6767dce3c20464c5bd5a61621153ee492c1df7b9756b6e594fdb06b4c9341fa5e18c46480644718bc3 *linux-eos-voter-0.5.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.2-arm64.deb
eec8f67aab3cc0f46a6c3181cd2819a68c83d470a838b11856ae5e4aac43f01063a832986a960f93b84cfdaa619f283b95fff4a021725bb05f6d9c82e3bd1746 *linux-eos-voter-0.5.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-armv7l.deb
a2ca519da2c3559c448eab5a94406e891462d4b9e12c9b74e944f350e5741dc8ef05c653102a439d69cde2804fe37315580c054a68423bf542ec5002622011e3 *linux-eos-voter-0.5.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.2-i386.deb
9ce361225aceff3a65732d607a792b83ffe6d59f78b0b6e2a8d58e479de4299ef32161d10fe09a28b126a9a25010a4ea4ed816c8c400427b3d03eaa3e9e75c22 *linux-eos-voter-0.5.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.2-x86_64.AppImage
a8797a5d838539efc007808c2d3112cc2833b182b22f5aa63bd63a6f09583aaeeb22db153e79156bd73e8ef63a7c176e2b96891e36c05a9ce7b5c3fb0214017e *linux-eos-voter-0.5.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.2.dmg
1e34bf2a0f57a7bdfb9292129cfb03b7aebe0a73c868afc72d23a8ac8896846a96bc4ea17241172c64c4857107cd73b27b08b078983a6ed5659f05d25aa1f97e *mac-eos-voter-0.5.2.dmg
shasum -b -a 512 mac-eos-voter-0.5.2.zip
89640896cb92f9991c2d4cc09a9700d8b7939790460bd40af3093a07b861cc13ecaf4609fa131f700ecc5a8421199006b54863e5641ce4aa613eb57f8915fcb5 *mac-eos-voter-0.5.2.zip
shasum -b -a 512 win-eos-voter-0.5.2.exe
06e24034bd3f0ca36357d289b48ed22b0a707848025ec45adddac126fced5b6b1111fb83b0d5b7c117492c7929bde0a78a786185e943c971dd0667a0538bdd4d *win-eos-voter-0.5.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbfeIlAAoJECyLxnO05hN9IpQP/1LzHhhaV65jGJAYp20j6XX9
yzdl4d2iEbMyPRdN9bs98sV57CVHS6g3delHawXOatogZsOaQKRC8fEiAg77EJAG
3siPqwiIBJ6eYUk9lnUGFaCQcroA07yOfLq1yybg9fVzAKiYe5TCBDlsXPUreGu6
1AiNgE+ajJiX9WNv1NyPHpxTsBtrYbJk5wVw0t/SV8oX4si7OfxiEINMnWxq94ph
CTzmkH36H8Sc5iXkJU4sAyNTtTyOhmj+d/MrbjZMfusvlMRC3Z6yraHvTX5zuyop
6HrlbwA7PBCRnqz6VAoCv7w7b/bWCBcB2Ldrwsf6L3zRm1thsqsnpuLb2hJEZAib
bLshvj0WIfgI6O5wXkC2cx+Wknm+2a9uFQW8kElaXXNZYNreH5y5VjU0FkUVYTa9
Gjl8wPPvKIk6oxlRXu9FjbO66b/3ZfABtB8t28ik74TfgBLIlHlaDzMe6qVr8xrh
6nST5qeSZpooZ+J+KbRl9GVk8Upzg3tPOoJlU6+efJJqwWVl2GMEZFS3NI12wdzW
ICBq/+uRK20TTMoz9K1OI6IaCIOOPigItRQxQbt0aLgJSqswyEmyN83PptxCuaNl
ZzZj8uEVSTPBEuqhyb2dguIv6Ln7VaFuPOmWnOBzB1/3wqZUTi0Mtr+0jxlXrz5T
Q69/2TUDEepbkQD9HBMO
=6SX2
-----END PGP SIGNATURE-----
```
