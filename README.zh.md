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

当前版本 0.6.5 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.5/win-eos-voter-0.6.5.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.5/mac-eos-voter-0.6.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.5-amd64.deb
7565c92cc47fe587d0d07757abc62a8eada15586c96e55d585bf7689ba80815613095895a54402b1b489fbbb3dab56ace4ec28dcec4be3dfe390555d48ce1f4a *linux-eos-voter-0.6.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-arm64.deb
03f072ed36916249c1d4e221e6e8791a106946e292d16404064e704be6b75616c097cc15fb9710540c4701123e5faeb9f7afb60e4eef19b13a511b75c3ef641b *linux-eos-voter-0.6.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-armv7l.deb
a14fbdc2c76def46ab6cc47c8612c2927b09091f9d1087877bc422e1e1062741b8f08b671fb74ed3f50c00748f33cb155e3b433929b3ba60f4277be9c49cc26e *linux-eos-voter-0.6.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.5-x86_64.AppImage
d76dad659929d2311cfdff980ca060aeb93e38be8ae9474f45ae47dcc83a556875671b4b3827bae704a3ddb80152aba76272e37162113c30dd5818129dfde981 *linux-eos-voter-0.6.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.5.dmg
7169ce28962a2e4b45c2010b7886f215133e3c3e0f99dc81f674e55a30ab5806d21ba987bd9fcd2612ff668c2d077a3de7b887d7acc9fa7acdd3569c8d865d33 *mac-eos-voter-0.6.5.dmg
shasum -b -a 512 mac-eos-voter-0.6.5.zip
bc9954891f48cb0606e7051cb96b98e5592c8fdfe2bcc6c32411da41c0ca47e971211e2dd5eb601c452f813206fd63135659ae9b2c7b1213065d0d2c5ac960e2 *mac-eos-voter-0.6.5.zip
shasum -b -a 512 win-eos-voter-0.6.5.exe
a51234b9068e3beca91b89995da754857e7834b4015e5d378d870004511bedaf4c1b75e2c3c52db1e95c5cf8fd35fa1b47d2c27e435919d8b1520a28329ad824 *win-eos-voter-0.6.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFGKFAAoJECyLxnO05hN9sZgP/iy0fF52PGjNN8RBwGzRJFy3
1nTmOIIHdW+cJf67gVG9NcTqyqB14CO2aIJRegjbUWQFn42//GkCKhHXyNLiy63k
zXX1sy+hn0zNa5jOzZjCsOrPA/jg4keUMU/LdwNkzAuESUXy5GRzrUAGHScdmrSq
4lTfjBS8h1OPDURMBk375V4V1W+88uSwapbLGXjLfDqMpmPS05mNf+N29w9sOTgI
V+c5tgS2EEKSMoCQoDYvlWsTvcZUaMG/IghyruSi1KYh5CPJ2aXGoj3VZ9GVgply
ePxS/8HEEpzkTPUpn/QxLa0cz1Dpz9pXWdz0Z/+3IAymrY/bkGcDfnbc1nZMwM4Z
xGbHMlJ8Fvr8lc6Vwwe4bLCaq1NnkXnC4eVYNpNNxQvtv9bAjaeUzZ1VXS+BPrft
rD2cu7NKr+xt8QSqUg8jQFh/mP9odhLa2qGSegGfm92SwIye6kzLcb+DsskVd4uJ
T+Y6gqDCaq62tchq7waNzl3PoqFv+wkmgqceJaltacVqElF9vlBU1SlSRt/wO7+h
/ErR3sBRM8KMoJDBlTVolG+teWnR9RmSB79SyyHxSMindYKho+GNyb3G0hJS7USy
8qUD4yJh4+WRkskVu4A7mjxOxNaJIcmjG+bbhTjOIgaaz9VCVBX/GXRlDjuqPWwE
Zyym0JHDsppfgfMh0brG
=TkGu
-----END PGP SIGNATURE-----
```
