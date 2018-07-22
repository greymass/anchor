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
345fe5f90a218fbb2b5d9638a9da56775aec1885a9bf059449f69ec54b54e036caf55becd0c05bf126519e82023f8079a2479deaf091de43fe9e2e33dbe7912d *linux-eos-voter-0.4.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.snap
f6e94469ec9ea4d9e3bcc22d29279722eb4586f5871b74781adcb395dab1c62d15b6ddb5b072cd9c23aad6cc2d0138d27e6bd5efcda27c13eae7f99db5f8dc61 *linux-eos-voter-0.4.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.0-arm64.deb
8ad0d51f4f2019a608093e120cf20814af757fe2d78ac38b7fa169767c3deea94ece99d2cabd8b89e3a6bbd10901a81377c5c8dac22c8f34096df5025b06364a *linux-eos-voter-0.4.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-armv7l.deb
ded0d6db8135ea404e1bda62b62ab4681bb38b9487bd14fdcb7f964c6140b350054bf5c0ce747c07d5ba975ed1952ba1ec588c3505dc7ff5ec2cfaed5c11f004 *linux-eos-voter-0.4.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.0-i386.deb
38259ca723b9104ca19f5006d94d994a1621b48ddfc8d632f835f02ba8faf0bbee23e79eccc7736506b91945710aa5d92f0b539250475c0a557662b1e6dfb009 *linux-eos-voter-0.4.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.0-x86_64.AppImage
80b960ffd41ea249574ec68d63bf3b6293cf8c5179fda7e6b9d39742b6e43f0eb303eb24f2b99361ce1181c4fc03afd43f370cb33a7945baf482d3eb8076d85a *linux-eos-voter-0.4.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.0.dmg
7fb73dea0829fdf070ed8f6e964b95967dac22e683c5707b2df06915663580cc4d741f9ce0b6da3d374f91ddbab7c18c6632b9573e8eadd35c81e25e0e46ca65 *mac-eos-voter-0.4.0.dmg
shasum -b -a 512 mac-eos-voter-0.4.0.zip
76685389d7c6210b536225ef63c7aa42c71d0eb51f2f1e44d178456f3d48ca5e0badc786bc05af50d7d0ecb5069a8aeabdf7f96d8bcf9916b2099a3377392386 *mac-eos-voter-0.4.0.zip
shasum -b -a 512 win-eos-voter-0.4.0.exe
77e3061e01bc6bfd3e62b54a11ff0f7638033ec5f0bd942f10b2359eeed615c1316df3bed1636d60618a7459bc2c5a2ad23cfdf6065ebd01cdf5b01058d8677b *win-eos-voter-0.4.0.exe
```
