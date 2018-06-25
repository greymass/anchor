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

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.0/win-eos-voter-0.2.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.0/mac-eos-voter-0.2.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.snap)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.0-i386.deb
26fbfb5e23cc19c0cc995a86f6c5060b7f99f7fd6af8b50ca771028245b298f8ddffe59925d73ee65d88b4ff10096488abf5b22ced87a27c6f5bcadc6ff870fc *linux-eos-voter-0.2.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.deb
7eaf225b8267616407af0d494b1c6df2029fa15f85d680ad8a8a3e73c12f7d59b2611298cd4e9c73e2bd103facc4abab7ec15bf2d7bf1f4bf58dab76a3337a5b *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
99591a3391782a213c65bf73e172afe4bec043de3ef41565b4979b583ece9b944087556c5c58693d4ff543e6a07d6e3a1ba8401d0f5b6e555fd6a4410e787364 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
12c6ca7ca66a4d6e8409d6506360632ac3a6eaeaf5f85b22c32cc8f1d960ff2110a1ef9a1518ffca44f2f76ff7ae4e60f226ba2090125c0bb0023ab189e0ed59 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
a1b484aa7c42d93d207a1ba41d744da461ce71e6982d7827096f3b35ed0584712ec5e3765e439ff344ec73482c8cbe18cb6814c3bc0a863991eb62d466dbd9f6 *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
43f6df8c9e187cc02dfcfd6c3ac2e7ea3945ead44a29ad8d8a08585e855ff94b51b2486e76b633bfce1bf5f88e530e0d4896e75136661d66ae7f7a6310c8d9c9 *linux-eos-voter-0.2.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.0.zip
50b34915924e432b99ad79e72e413432599b6e1a4e1ddeb4bd30b20febf08bd86c25bac1f484feb9771abe51f3ffcf9e90ac917417c1a49f41af44ba271d1008 *eos-voter-0.2.0-mac.zip

shasum -b -a 512 win-eos-voter-0.2.0.exe
b8ed0befb7af56de6481235a4e49502b4fd9b97646d0f4003a75260ebb1c4de9a7c67977cde36d24b9c4bc065ef05d75ad6e0c7e912ebbfccdb2f98d899db6e0 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
f01e64267979991a5f5dac6764015d9fb3d821ed6ffd1f8252faa2e1c64dc498e81a50428fb787135d9ca0e8ff0f2d722953057bb41fb0629e0b6dba6ac6a124 *mac-eos-voter-0.2.0.dmg
```
