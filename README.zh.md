[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md)

# eos-voter - EOS 超级节点投票器 & 钱包

`eos-voter` 是一款为EOS区块链设计的轻量级钱包的有限功能版本。此程序用于连接到远程EOS API节点来执行超级节点投票操作和一些基本钱包命令。

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### 功能

- **超级节点投票**: 选择你支持的EOS超级节点并进行投票。请注意节点投票UI不是一个学术工具，它是一个简洁的界面，提供了一种安全的投票方式。
- **代币发送**: 将EOS或任何其他代币发送给其他用户或交易所。
- **CPU/带宽抵押**: 将你的EOS抵押作为带宽或CPU。这赋予了你使用网络资源的权利，同时也转换成了你给超级节点投票的权重。
- **本地钱包**: 为你导入私钥生成的钱包创建一个密码。你的私钥将使用此密码进行本地加密。每次解锁钱包时，都需要此密码。
- **临时使用**: 如果你不想讲私钥存储在该应用内，只要选择不设置密码就可以。当程序退出时，你的私钥将被忘记。

## 获取 eos-voter

### 发布

当前版本 0.6.2 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

最新的版本将在此REPO的发布页面中找到：

[https://github.com/greymass/eos-voter/releases](https://github.com/greymass/eos-voter/releases)

以下用来决定你需要下载哪一个版本, 如果你是...

- **MacOS 用户**: 下载 DMG (`eos-voter-***.dmg`) 或 ZIP (`eos-voter-***-mac.zip`) 文件。
- **Windows 用户**: 下载 EXE (`eos-voter-***.exe`) 文件。
- **Linux 用户**: 下载 SNAP (`eos-voter-***-_amd64.snap`) 或 DEB (`eos-voter-***-_amd64.deb`) 文件。

### 安全性: 私钥

当使用`eos-voter`时, 所有的交易都在程序内进行签名，你的私钥从来没有被发送。 如果你设置了本地钱包的密码, 该应用程序将使用AES-256对私钥进行加密保存以供将来使用。 当前密码和私钥的加密模式可以从[这里找到](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86)。

### 节点

我们在程序中内置了以下REPO中提供的公共节点:

[https://github.com/greymass/eos-voter/blob/master/nodes.md](https://github.com/greymass/eos-voter/blob/master/nodes.md)

该节点列表将被实时更新，并在程序初始化时被调用。

### 亲自编译

如果你想自己编译该程序，请确保你本地已经安装了nodejs/npm/yarn。

**注意**: 如果你是在Windows环境下编译Electron应用，你还应做如下操作:

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
cd app
npm install
cd ..
```

然后:

- MacOS: `yarn package-mac`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`

编译的文件将在根项目目录下的`releases`文件夹中。

### 调试模式运行

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
npm run dev
```

### 声明

该应用由[Greymass](https://greymass.com)团队领导开发，用于帮助EOS持有人参与EOS的治理。

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
a158c50a65ffa8c34c54aae5ff5d0e730fce6e881f102d558c47ed9b12fe555ba066da9961e817038d66ddd8554bbc339ef10111896af4a67e0159e3ed75f845 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
e5c4dee66f097af7f23b7b1214e4b891e98c8e77dd3a99e60d4ba24f3f086f4b8ca2f6713b1a4af0627d58658411abdfaf36d33b793c6c3cc62de25a73b6fe9a *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
bc0e001d5344d0ea56d7d39a445b5ec9c23d590026eb6c71d287135371a6b5f32146b89505e316cd05e7fc5287a620acd17c0ad2613861c390b705baaa25e19a *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
f03c07c4d10e16baf7ecfb36258da1ac08a62615330a6998bbb028ba5bb27dbccc634690edba0b9fe28957ba81497ec601a6aea0392d16bb65070290824ece2e *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
935ef44a0b62ad123259da5440a2351f3517aa939ab2ff6cb12f895d72aa48b7b67d0503aa20119ec6ef2f9a3f6815efa947bd8344ec93f6ed18ffe6a52f9f19 *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
c00f9dd07f0f7e71efcca7a5c2f81104bc28bd99dbef13bab24f61cd1c774a9874489bae640694442cbcda5f9f54c4310fbefd38b23ad269175a83e834575693 *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
5c9fe446bcbc28e43efbe3066eeab94ddcba3b9ccbdcb49a6157eacb2846ff99673594040fc48e75f68b97cb07b323a59de6b3bd7848d3b29c7e25797ce4f4a1 *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb5K04AAoJECyLxnO05hN9mT0P/1fA+sgntRPGowmhlY6JB2X0
cNLx+HuhAycQNp6k0W1BncwViV/iKAoq3GsZUrZLtCQyaS5cUXGzBBrHy4klboGF
pZSvjmSHpPTEXyiII/Pmdqbhi57uUMwRMHjMqIPrUSz0AnMUxQpksi9SQTxG2NU1
nxSG2QpaNgn9pJTKuUyVfSFB0XdITKkTobaZRlZ6djP9etiV9e7ptxwuxLUVZl1H
SgfxC9uQZKAmvinagNn5RItEoZCcZcCSVcL3Nlhpsrm97uY96ey5js0T4CWTmS4p
RuVnJ8myXJdcWoV8so0ZMD7LXBacr2b0J+MbA/OE/3IwXSxuc0W8xLlj40M36xML
odb99ezaDDEpdTSvIl3iCTIzrK6eMYF90hbVf5xRZyHO5Z1pL1+0UHj31As8wb9g
oxn9jsCP+5MHsYk/8u/Ac5Zv1FDBv1wb6dxdR3v+y8NwZcbL6/lWPQ6sfca9kNWp
0NbLbvttbnGSmorpKbQbegEaUIWZV5lL8HAHWbdxaE5p3RBbbYlr1UjaKyRpX+Ic
hhMkR5P0/KeFlBQ0m18q9vn2Au37Z+HwTKdHVa7ltsyQFiyMoiAed6jpfGQl5Jzt
cR/cBeuV25ByFCXYGjjjZJ5bFG3hXnJA+UjnTTWC66i/i+JkALnB7qpaYWJxgkOl
9SCqa5mn/bI1qY0mNdQS
=6Pzm
-----END PGP SIGNATURE-----
```
