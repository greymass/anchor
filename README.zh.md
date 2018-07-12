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

当前版本 0.3.2 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.2/win-eos-voter-0.3.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.2/mac-eos-voter-0.3.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)

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

```
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.deb
8022c1206e5a38b3d4f538cbf15a90fc1818c43e3cc0f58c7c73f9dc85e7cd12df20526a298611704d56d8a7429a7bcccc80aac5aba086729cd04f804f51a773 *linux-eos-voter-0.3.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.snap
bce76409ca941d368e7d865d3f6e893ff996e097c7e42a9dd159cb167bab68b8769b9d313b38633e89e1d6dcec180db49f67d8321a9e7a90be21b38958534430 *linux-eos-voter-0.3.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.2-arm64.deb
53e0f2a9c1fe5ff50ec3f8635c5f86aa611840292c1b902379354d6974f2636755059654d2305af43e968f2df90be75bd801125465d40307e3d851dc43a38c7d *linux-eos-voter-0.3.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-armv7l.deb
3c547be55efffc83aed3bb91fe6ffd8dab5b0b7460ed5608ac683c0aea4f3257028158eaa4e5db55bdff4d2e97dd0f277104540f5e2e36741db6f4384e27d90b *linux-eos-voter-0.3.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.2-i386.deb
845eb1acc6f5ac9300feeaaec82eb22dc2a4952ee7c7bda772cfee905b6480a5e2974c4be53853441351f33a83960b590aa16c8baaeb346df5ae79e1a177a67f *linux-eos-voter-0.3.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.2-x86_64.AppImage
e224d3618512d2e893e5ddc8cdb0f0e9082e33a8092a817c0ed79b89e2b6979b403c62ed0df012cd8bc13f4cb7dff31e162e09903073d0f4e14833f086106125 *linux-eos-voter-0.3.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.2.dmg
af8b152368a26c01447024fe2f52ec77e3da7c19d0a501cf274769eb7c59760f5fd48c77e95a812e5d15ebcba5e132061ec8ce37fe4893da75a4cdae76650716 *mac-eos-voter-0.3.2.dmg
shasum -b -a 512 mac-eos-voter-0.3.2.zip
7a30cf1390e1f1fa51f0a5cd0ef93f6c0978de3966d3bd5c24c2c66dff9dc00d6d7c3f6434a65c37789c6d86a661877da5388e22470b44327303502b3b62a573 *mac-eos-voter-0.3.2.zip
shasum -b -a 512 win-eos-voter-0.3.2.exe
d8c6b16a787302a83448ce294c66690573b235b5ebbd7afa9b168ed49f9090918030f6c2d161bc3217bf138f10969bb441385a6190e67f730feee8109ccbfa71 *win-eos-voter-0.3.2.exe
```
