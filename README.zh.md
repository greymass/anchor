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

当前版本 0.4.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.0/win-eos-voter-0.4.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.0/mac-eos-voter-0.4.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.deb
7561c25d8931025434233ca10f31d0f63e2e0941870e57518ccb60fafdd42fe56ab6796fb557bfd97d0855d80d8ed3e328c007eecb7aa57d952da672edc5bfbf *linux-eos-voter-0.4.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.snap
db2efc19a06f9d51ba40aaaf06f28f93b9867296a2707adee98dd145871eb3cb57f9d12438f295c09481957b366f9e59346d0e42cf9208c852ca4ced1fbaa2f5 *linux-eos-voter-0.4.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.0-arm64.deb
4c5567a7917e951df14bb7ac9c53afacce8e4d7b93a8ff14024ec4b60651b4eaaae54f8418b25a91c22e6010c555d967bc5f8bfcf33a72822d04ce8b9f0e375d *linux-eos-voter-0.4.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-armv7l.deb
1956e33dd7f4a70c1fa1e008a9f652590a917c399902ad3acd47c4520499808bb5b027f3d14ed797eeda65eed4d6a89d0e8afc3df0eb093e3475eacf3388bf3e *linux-eos-voter-0.4.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.0-i386.deb
a77842c747d4a71f2d073db112e344bcbe2c006acdf02aa43cef2aebc159c418c393ffba7cb5f29a57c0d5e86a9a7b3bebe75c3d3882aabfdef0bab3d98ccdd2 *linux-eos-voter-0.4.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.0-x86_64.AppImage
c81d8ddb03a4c6ab5af8c00b7802dec4ea04dfe6044a9cd28e2c589a1011a33faf94bbe2ac1eecdde896f89dbf9031346687e3eb96fd553060f5eb5f72443778 *linux-eos-voter-0.4.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.0.dmg
82824383e2bae3338880d5f9278abd0dd97b0dbc6c4c640eec602c87c3ced1d2e65267dea66b211334a28f214a2e43c47c40016dc7b58e2cd2e0628a5f837b1a *mac-eos-voter-0.4.0.dmg
shasum -b -a 512 mac-eos-voter-0.4.0.zip
7cffcbeac3b89edc55376e95b014efdf4af25e5471128ecbce7ec4ac7cc0252e6ea61cf76a337536687c2278f939a6c25cf6aaf1d8a04252c26233c627a24729 *mac-eos-voter-0.4.0.zip
shasum -b -a 512 win-eos-voter-0.4.0.exe
2e535c7f0cc93cfba5f40cae5df3d8f294bed08e0dcc48bfe6d6176c667f7586032c19c22d0c8125acc048a87c28ad0a41ca1aaaaa7bf6ff7568e03a5926e1cc *win-eos-voter-0.4.0.exe
```
