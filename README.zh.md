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

当前版本 0.6.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.0/win-eos-voter-0.6.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.0/mac-eos-voter-0.6.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)

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
yarn install
```

然后:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

编译的文件将在根项目目录下的`releases`文件夹中。

### 调试模式运行

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### 声明

该应用由[Greymass](https://greymass.com)团队领导开发，用于帮助EOS持有人参与EOS的治理。

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
3acbaba16be8f9f3159933aea50e5ffe39e4c9daa8a2ce820b3424f5e630093ea80b74ba78b8f50d6e1a96cb650fc2c619b24e7d4f3eb3685353d9d2b1507dbe *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
166697e3cbb2a7d1a2d0b04a90876d4cf22d0f08596dda4f0998dff8f6f9f965084d72ef247f776936fc0d483e49845f38596eb0ba3b899c19ef499985bb48d1 *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
3d63b30b288f8e4fc65455dab6c3d9c64d2806eeae25b023f50d8e0704eb3d9f40668a53972569b22dc24e63d7f78ab01128e7dff5c04a290d2088a749866c9c *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
768c5e525efa87d02f541156ae50adfdb1d26c4b6a50fb5e1a70e29d5fdba71abe4eb550feb5f83dee4ba6c29e50ef47b235359a1db49871dbaa0c1e9f426369 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
78ccc6118607a8c548ece91316111a40cb1493268cb806dc4c82298002156461d4dfd5f48e540e1270d3c1efe8a4acd0cd0b7853c961465d76bdc3f264b4c96d *linux-eos-voter-0.6.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
56fb53f17a6e1d2582a26b4ec9567a31ff886f76d64468a575de118c54c63cd72e38797a6d62212a3bc006d06f317fd8fa8e3bab55946737949ae7a963deb757 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
e375ba191a7aec80b850d44d4127efe4ec3921b39770f7345867e2328cc0e637078499c374386a3909ea2d47f00c2ce7e6c3f557da9641e7af9752cf615de761 *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
69c47c2641ceaa1530108637692cd714efffbbbe15b2835bd07611a94808e7f4c036d142cb02699839be285980e3db5402e49585167924d2ef5d3c0ad8ed2c54 *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
445c20134561e8191dba778b71a4688c7c1fdc0b39148c839d68aa1ccb6b0b1f82226365590ae50378fcb416019de3d69677253a5404db55d3aef465d7ee7e11 *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovcmAAoJECyLxnO05hN95C4P/3PYiF/AY4BnVUmGVNw6ADQu
W6bOFaNGBtKm7a1mhiBraNrfWmYtVbpW356iqZU6ERFQ7pFMu3v8ri7NDNUJFG1r
cZMgxnDyPccRa4bl000ayCfOpbLh3hnV9nKMFCCDLw3vdr9pQlHUkasWNoZym870
uXBQQqlb3yegwk/0eNhu1e5veLlrXe/6Q+NmEQ0XoS17dUYYwUKWTgHvnj3A/n/O
HjX3MBsGEvxxkGzgWJwgWze/u32HuGbL+0wiKfVmpZ2QvHnJbybuH0c3vmqi9eCU
HkraI5HxfJb/Wl0wJCUVwZZ7LfsL1AmlIv3Y5bC/J7l97Xwtz54enV6sdUFBo2vJ
n59/j0rI391mKgbXX+NyL1wL0oaZgogv+3BmmxF3g1M/1uTNVUyElKAHiOfOkAss
IxXdW/FANfEj6CiO7lLrs5W/GlubQM3QqhUX2NOZg2zFPIHZ6DcpWrbICEJgCApF
U3Bfy1hlQdWZ7cxmsFvTUU1fs0ldkR+F/ceV/bxLGoHOi1iUJi9ybhzyKezvV6uV
fxLu9nLk0gZsgKFoTQrwjwe355BqKjDlvukCm0ivVc1mZ7c8nyX6mQwkCQputE2b
wXo9PtXFvQCFjDw3Setd1InIDPlocwqJtp5+CfEgpAXdO2+Q5Ss3dNr4YX71tXIe
c7BMQi4jsvkWBkruLqzj
=rC29
-----END PGP SIGNATURE-----
```
