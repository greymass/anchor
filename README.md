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

Current 0.6.1 release downloads:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.1/win-eos-voter-0.6.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.1/mac-eos-voter-0.6.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.1-amd64.deb
16a74ba15c579eb7861e95f8cc7bc62156ffb767f078a25a0b1b81482e99123948d38ced23060166800696365df96ebb53fbdb8ff56d6680f49089a9ae2ac019 *linux-eos-voter-0.6.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.1-arm64.deb
4aa5af457d9a51b110b623c1ba1cc8338048f734c8122793973f342c0ef90a9172415eb81ff4aa7aee63459f77387007ba0d546e8700d62457dcad57c77ee85e *linux-eos-voter-0.6.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.1-armv7l.deb
4304df7cb0282158dab2a364a6b6b944d45259d926238e812f1fb5de605f818304d4c98619973fb0e7c61c9e903dcf07a2bc071e5f7780f2ee40ba7123f7b874 *linux-eos-voter-0.6.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.1-x86_64.AppImage
242ca936dc0da02a3f21f1b9f7febe3a86c2b6c4920ee93f0efae618bd55ea6c3d96de07339d0fa3ac2bcb6e9ce28475fe50667cdb16187f77691bad7c198302 *linux-eos-voter-0.6.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.1.dmg
3dd5110f1348c18767fab178de5cf72649ceaed2d08657fc0905d85578d754e57f413f6a9dd608a05fb402c9e8ac02e9e5b9d3ccb41b0ab37bbcb791d8e5040e *mac-eos-voter-0.6.1.dmg
shasum -b -a 512 mac-eos-voter-0.6.1.zip
a65e5526ae31eac5dda47d3aae1881fcc6686c79a2b76690de1e8561731252f249f6de1020fcaef46a307e1984cc2634e7aeadcb21cc65954b2f8ab0103e84dc *mac-eos-voter-0.6.1.zip
shasum -b -a 512 win-eos-voter-0.6.1.exe
29e20ac9ced730f3cac14e2235a7fd86a43c8d311d601e1a3b50692c8d6dc3e4ef74471c4e43b56146a79caa0743df110cd2bdf8bc20a0cc17b22d84e9c457ad *win-eos-voter-0.6.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb42bwAAoJECyLxnO05hN91VkP/RKYjXbWebd2dPpBibtyHmUo
hS67shdhW8F8r5bxM0CFABLECBFK0K9ybMNCoZyn+BTMSFVtD89LE+ESNriGJ7/m
Zuldc+BF0c4kt0ZaTKOXASwM7wZQDxFaYL2zYrOgvYf03zf3HuvhTJ2/E0hx7t/q
2Iw/mdtkCKsBq3HJg4lAWBlUCaRGW5ssThls/GS0t5hCGzKsHIrEnEJupVQfZfuw
XdC/skQgLriBJaxNSh+XAfJtlHZ6es2r0q7odcwwGJKN+tWIx4JOLb+j5dsEGeH0
YqcKAOENHBxUSCOPSDbKZyKJiHhm2ZdenszFcN9mSGpOLI7TVAcXAIf9JnZl0XUU
vWRH+Wv1LL1zbb87kTtLYxu6ZebVud1p4NKLsX69zoUiRhhIW+cRtNTgd1wCeUnk
brXqB69yJ4VudpDtQp4/94/1XJdKRLSMOKlMsJDUSTg5r/yP9jKIaiY5JTCUlOF3
BII3UlXlpo+74j44lIGojYXqq48aSonL0lhjL2/vQlt5LZFSG4VLifGX6FFXks5J
+/EjgQI954Kxp/ylt9ThpwMFh0lcSJp99UAU52HEclEnKrVrCOWwLQP/syz59Qp9
ISY8yY6VMnaKMZU6wmev8SX1+SlXypSnbpYVMMZczAkqeeOcBaLQ30jx1NGhGDCk
uPz9iMMmX+MCoRNL0HI3
=Rw8R
-----END PGP SIGNATURE-----
```
