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
c14f41e5b2101cccdaa00067a4662c9ce297b4fbd6660f1e4af7ace7ad05e12a1112466b3dc948e77f34178b3c9cdcf7f2678886811f533bb9cafcb20e82b3d0 *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
7ee1e7f44a44315ba433acc7bcbffce083ae8f3e2f2710c61d84097c527be54d529e144b5219c41fcc3d3bd914d31a9d12dcabb224766d547ae5087a6f2c56e2 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
3cca96d529c21b804902e5103aff8572fba2348e6f7aa7f0719a0c2c69da9b1db49b7d2ede3260cf6e12275acfa7711778094b104a760a66ce8975dfc4613e24 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
b5d42aceaf8097604559ca7974eabcc6ab5c975ccf951a79c1e4774de1582636e9853ad29efd171e7091888097c8a5e09668857aaddfaa1a368ddaeacf805daa *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
302ed576e0f6c776e7dbdc1003f14da4f1db8b78d5e5b8db51efdfa90c922411eb6d6693e247aa900b03bc34a70479cae5d7fa9523267ea0f03beab92beb4a02 *linux-eos-voter-0.2.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.0.zip
50b34915924e432b99ad79e72e413432599b6e1a4e1ddeb4bd30b20febf08bd86c25bac1f484feb9771abe51f3ffcf9e90ac917417c1a49f41af44ba271d1008 *mac-eos-voter-0.2.0.zip

shasum -b -a 512 win-eos-voter-0.2.0.exe
b8ed0befb7af56de6481235a4e49502b4fd9b97646d0f4003a75260ebb1c4de9a7c67977cde36d24b9c4bc065ef05d75ad6e0c7e912ebbfccdb2f98d899db6e0 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
f01e64267979991a5f5dac6764015d9fb3d821ed6ffd1f8252faa2e1c64dc498e81a50428fb787135d9ca0e8ff0f2d722953057bb41fb0629e0b6dba6ac6a124 *mac-eos-voter-0.2.0.dmg
```
