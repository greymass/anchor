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

当前版本 0.2.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter-setup-0.2.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter-0.2.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter_0.2.0_amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter_0.2.0_amd64.snap)

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
shasum -b -a 512 win-eos-voter-0.2.0.exe
17ca2291eee83c1fb70079331aebeca3b38057a03d6c3b7af02ea06a8f0a77fde85422cc35d4353715e8e64ff55499cfe400c83bfa3aab212691c8b352430cb9 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
289bb18db0f5c3dba3f37eaa925f12fc1714a976ccfd8ee6ea48a3d008d68244e77b2375622d7557f2aab74557a64e11a6d33057e363674908b74ce232c4d4cd *mac-eos-voter-0.2.0.dmg

shasum -b -a 512 mac-eos-voter-0.2.0.zip
4b40859ba865ce4c8e69d8a0d8e845c19329e2017f5e1b537e3e6a23e0b6eed74aa1806603f018037edab784e45ad707ffbf00e1e4145c74f7a41d55d5bf5ec4 *mac-eos-voter-0.2.0.zip

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.deb
3d3f0d62a515c57a11a9e540501f8cfd6197d4c6a65260fb950bd94251da032edc7461088c84f92651b528afbba50e508e4dfd7f60d8e1ad7cd31e726b99d189 *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
25360a91eebe696958c04afa18f582a45625f8b71d1e950b6c752271b04213ab361107a845075d7e3c182154c48b976eb5591a5cde9d4dc32dc41d594cfa00e4 *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
6d69e7c36f6ae51bb00ddc2741ae54f0e3351dc68eba2f6559bf31a07de3f87b5c63060cae187fe2993ffcc9e24365036234a0ddb741474c83cbde581690e7e9 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
4d47e44a373949b12d882483a99033243f1847ed48a978b77cdb49e7a564cc9f711f960cc0e04939777867377b997926226c1b52bbfa143c2412cc2bb9a84746 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-i386.deb
3d206506eff3d0b9497a3d44a11357741028aedc041ca9e363aa33c34818b46d61464a540e6d2ecd4bac354ce3d04e52256805531b620dc7ab552a9b6b628366 *linux-eos-voter-0.2.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
4f894eb0d905e1a3522ee5daf3dba67858e12c7c7e37815f90138ad788d5cd69b57f2acbffbf57ffa35fd5b8efd0c4e6294b47dd336674b65d0c703cb617c3ea *linux-eos-voter-0.2.0-x86_64.AppImage
```
