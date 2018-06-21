[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md)

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

Current 0.1.7 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.1.7/eos-voter-setup-0.1.7.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.1.7/eos-voter-0.1.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.1.7/eos-voter_0.1.7_amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.1.7/eos-voter_0.1.7_amd64.snap)

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
git clone git@github.com:greymass/eos-voter.git eos-voter
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
git clone git@github.com:greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [Greymass](https://greymass.com) team in an effort to let stakeholders participate in EOS’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 eos-voter\ Setup\ 0.1.7.exe
9799e0fb5398bc4f8ec59a37f08122fd3ba2053066ef7616df85fceaed146c46fc996cfd83b5f13fd5e9f02ade3955f4b773c02cb04cb5a5b19244b91c6ac39c *eos-voter Setup 0.1.7.exe

shasum -b -a 512 eos-voter-0.1.7.dmg
3fcaaa9d42d62e34b044ddc40e0ea3183e8c62bc86cc852668e5924139f1cd4afe62cc6a82e5795d355b417245cad39e606067923feded512cb469bba2f748a1 *eos-voter-0.1.7.dmg

shasum -b -a 512 eos-voter-0.1.7-mac.zip
b06f9e9e9ff07cd1cd1d358004d4f6044fe5e29e07bf3466684d468542effd235ce13478c2a5a20b10b521fa46d9db550192a26e2bc7f01223e159161c0922df *eos-voter-0.1.7-mac.zip

shasum -b -a 512 eos-voter-0.1.7-x86_64.AppImage
742772b314108fa0f1b34aa825c9599859a5092de8a777db88e24dfec09c0dc78676a58482ed461d70bda7a9e30e371160d47632c3cfe4f55572d149ba7131db *eos-voter-0.1.7-x86_64.AppImage

shasum -b -a 512 eos-voter_0.1.7_amd64.deb
6237698738e364aa67820cfcbb3fd7d3e76eff42e5ccc12e7d3e9f9c46cb3d7331be9b2496d8bb2bc04a46466bc25fc68b27699c7ee8f9dd2865ca0b60075fce *eos-voter_0.1.7_amd64.deb

shasum -b -a 512 eos-voter_0.1.7_amd64.snap
fa9c1ab3eb9cf46c76ced8944c340f2e8f640a87da8117eaf9c85bff02e0d0c4093bd22fc52ab74494f48429d73a857b0a922e4ec40189706268aabe985e06a1 *eos-voter_0.1.7_amd64.snap
```
