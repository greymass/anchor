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

当前版本 0.7.9 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.9/win-eos-voter-0.7.9.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.9/mac-eos-voter-0.7.9.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.9-amd64.deb
c4580cf4fea96e0ec6e043c0f44834f968da732502809248f2d6e237048fdd4b547872bc3a34e816a054156c8b8a06125ec298f1d7f5f253649f510ccd12b6ad *linux-eos-voter-0.7.9-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-arm64.deb
f9d22567d27dbb788a9e74cab809ce75d18c4c0fe8f2b27decc885978a3e53a17d3ea6b7b097781581a6897e691a3d1606c8e659f1130d0ac822f527c30f74f8 *linux-eos-voter-0.7.9-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-armv7l.deb
f99b22932337dddf68687058479ee3ae7c26acf57b39f33673e9bc97679d90c82460023a8a472032950c384486cb317a9da1a956fd3eb621863b1ae83a577704 *linux-eos-voter-0.7.9-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.9-x86_64.AppImage
cccb80c21cfa9cb134e1708ce1797d094f9c56ed47081b75e15b624e5af96ac7f14883da04c26cf817c2bd7d28a41d4e6c306fdb07abd0ca8dd1d072bc44c815 *linux-eos-voter-0.7.9-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.9.dmg
9f8c2d69075f118627272f8e0df89db0fcaafb59f6bc61441575effa4f2cada48e0e595b6e8d22a3ba1e2c55a7a6985462517b2eee8c4e242207936e1413a02f *mac-eos-voter-0.7.9.dmg
shasum -b -a 512 mac-eos-voter-0.7.9.zip
c4a13a6e9382991aa99a311a888e7c5c86f360694ceb2aee1c0b99c1c8a3dbed2b3a5602ce4ef8a1b8b540129fa9b52c5b7b331ad33525eb7d66678491c8baf6 *mac-eos-voter-0.7.9.zip
shasum -b -a 512 win-eos-voter-0.7.9.exe
a706ced71a10d6e201d28bec8961743ad6045e466c4bac5bf8fa5fd958c494eb132055c6205154f44df157696a80e13dd628e2c40df6356cce064c17eac9b0b9 *win-eos-voter-0.7.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcy6fzAAoJECyLxnO05hN9GTwP/3fOe+7jlltTLm6nWqmVTmsV
UaC/Wr6tEuyBR3bJloaTHAl7MghNYfoXEjmZSCO8KPzKYcXNTxSOBFeWQrltIupd
myijc+AGHf91h75dZ7KRg9ts9rFpQTF35Vu/F2eEEk2mIeKrP0f7V2GjAfD79eJJ
0x6OIjwgYvNoOp48ZxPcXpozhYgEnXD2fagIvaM0qOVuIautay/Mig8RYPdFrs9+
AtSrHbcxv/ILSf2UZnjgRfjgtF/5IwC9NMbYsrk+DS1x5nmdmfomOeRk70GyaCcS
FwovKDmA22uxooBYSKhBqwSfIoIty/etaS8rMzH/04A7/gHxk/7vOoPgX9FEVb7Q
WvN4893zubqagHLZUXuB4ExXqwfudLw6FlH49eB3gFXLIPIF88zwRqbfYXTCcyVF
z/nyhs2v4SxRTuTUbTMwE+N+W3tHClhHD46Mg7PMsVqB92qHq7Csgz2VGJJf4Fix
7qH/HvFeqFmSTNaTPR+ahBU637a4dxrSyzLOYgW7QAkVSrNlX2SE7dCshq2GWvOx
p6wiiLI8Ks2I1SmPOWXaXLNQZngjoKdPrar2Isu+WoSUorEq8VuoqDAKOI5v7MiD
vLfewsS/GrCyQaNdMxhA6k0KHlChncUbo50XQ/9IoDW0GvPalY9PSGLWvLznutJW
pjEiVUtm4AH8AbsjSjtx
=o4Wh
-----END PGP SIGNATURE-----
```
