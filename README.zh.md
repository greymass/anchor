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

当前版本 0.4.1 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.1/win-eos-voter-0.4.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.1/mac-eos-voter-0.4.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.deb
a767a8a85de0a7b2e7cada4ea9c80ee5610117c8eb9b09b09305671577474a238b5ead10ed9cb32a132fc7ceadf935de4176822788ed4da88fdf015635663aab *linux-eos-voter-0.4.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.snap
1a14c2cfa69500f8534eed13a449835c153424b2a02337e3d7d0d13d1c88d50e4d10d20e2c78ab967653b4896848f3fc47fea4aef2a084076a028313a43bc2fb *linux-eos-voter-0.4.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.1-arm64.deb
7f20c47f724e71ae1c7b4bf130170b33803bfdf83e124bc9f7fd6ab21e5071c7a48a7e5447218cae1e6cd45f32303a314f2c47c32b9b9d2baf61bdb8677cb015 *linux-eos-voter-0.4.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-armv7l.deb
389cf80e3e28e71bfcbd5b8850736b27722edb4063dfc6a450ae9f8a1240d7fd5e39fd13b4cdc6f3f4087e512df98e9e73b1c900e00495cf5608f4b1655ffe09 *linux-eos-voter-0.4.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.1-i386.deb
91c0697bb0b50af607517690c2423f0c07f997eaf4f488800eb7abdb68e26d1c2b36c5c1622c1afaaba150701e864899a250b79679602b729ff8f48859762bb5 *linux-eos-voter-0.4.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.1-x86_64.AppImage
cec2f578ddbb01508327b2c5dab4ee476c8ba141d8a7cc10c5fef3da1bcf83d6e9922588882baa06f00c4e49792c1b166eba14a3658733d8eb1b85aa7539f716 *linux-eos-voter-0.4.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.1.dmg
efdf141a65a65424783f394e712338e57b653e6322d7e08039fe796755211f4d8cde27fa9a0a120abbc338dd360f882f4388dd3022ab94831fea10c09f78e433 *mac-eos-voter-0.4.1.dmg
shasum -b -a 512 mac-eos-voter-0.4.1.zip
ed5a7e73a6f6b6e2716fbb8396713cd3184e17e640bc8b51a4b141b7f50e478b23d26374aed78670fc1d5bf4d5e4bcabc803dedb7679e83c02a5cc004910e603 *mac-eos-voter-0.4.1.zip
shasum -b -a 512 win-eos-voter-0.4.1.exe
6cac7e0cf78e02e10a91fc008cbef02dc4f51e013493d412f1bd412d732371ead7bd770979b890df8f09312ab53003c04787bc7beb1a5fb6ef61551333d74852 *win-eos-voter-0.4.1.exe
```
