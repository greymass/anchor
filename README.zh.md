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

当前版本 0.3.3 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.3/win-eos-voter-0.3.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.3/mac-eos-voter-0.3.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.deb
715b3d4a446bab2e1d9278b6783d911509bd87f31c905b556ba94f98830dce9c920d6663eb1ca588fbcc8f0b6646a75d6ab0daad1edfe23672dcbb2bc45ab5fc *linux-eos-voter-0.3.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.snap
ba3e60950dd9d87a46e35179d178eecb08ed6f2f46829c04cee4f8f61a04be65ec6e367b340a8d81060e96ff30ede7769bb38a993022aa13bfa823a421537147 *linux-eos-voter-0.3.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.3-arm64.deb
056cff9e11066d6cb7ec97cda586daa572c3d71e62f76603055fe2ffc477417051b3b6c4c573b08fa01551cb1294d025e1818fd40de94bb1eefd971259a5c9e3 *linux-eos-voter-0.3.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-armv7l.deb
e6c7bc7e2b958c8a85c5db568ab8fc409d7c324eff5136dc2e98e3caa761b74ff69a188b42c47fcb7da3b867e276e4962e8f6b3734bb1db9f0c48a5f42ab7d66 *linux-eos-voter-0.3.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.3-i386.deb
92b908f5906553877856640de7eb39256f4451f38f7cdd1178443fe302cad9272a325974b5a5e14df5074018a4c6a525e896cabefffaf4e3e5850726f599dfad *linux-eos-voter-0.3.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.3-x86_64.AppImage
9e46b5a1753ade0d26cfc7f17829ea476cebbc32596ce4637e827e41f245c6c1914952926606c58b27e4d27f99465914c7c88686e8e85c154ce68db9bfac0f4a *linux-eos-voter-0.3.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.3.dmg
0f8e1e8e69291c0686bd95fa25846aaa5f0fa8a4bf193cece54d1ac09aa51acd3bfc7f1eda2485992b9df083bb03b4e2cac62ef71f798f8646a8f3c499ca36c9 *mac-eos-voter-0.3.3.dmg
shasum -b -a 512 mac-eos-voter-0.3.3.zip
23877286bd0f98d8747d23fe49521ccd52963ba49d6b24283083a61ca591ab6a015190184641f35d04cb5d8d8fd45210c5861d7709b95d6492d79c7b8d5ba216 *mac-eos-voter-0.3.3.zip
shasum -b -a 512 win-eos-voter-0.3.3.exe
7c919e9f7d600abd57113544a4b13d7153e2fce95795093f7e57fcd6e37e802e6a429d2e69a78ab9860127524fc70802e785a428deac3eab79b09b4b12ae08ed *win-eos-voter-0.3.3.exe
```
