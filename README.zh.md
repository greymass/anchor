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

当前版本 0.2.1 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.1/win-eos-voter-0.2.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.1/mac-eos-voter-0.2.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.snap)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.1-i386.deb
e713e624711d2ee3d36a3b8ab9b3bf8ad59be1e4c179c2bb78a3bac5b146b2be32fbf859bfcb5e60ba658e8aca89d026d4856942765e0f44bfe11dcaf0ac33f9 *linux-eos-voter-0.2.1-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.deb
d785502fdf8d31c8b6cea10ef8c64a516621fd92282903fd2cabe4fb0e090f4afcbbf7473ee730e46e6c8dc02c31e850162b2fb4c6ed587f89773bb499238385 *linux-eos-voter-0.2.1-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-arm64.deb
eec1efa387c01a18a7ea6f23936ba22396d67d0706de9d40c171117825d463d216f4d0207ff0902372eb2e46022d5bd588ee214802ba88d64b112847df311777 *linux-eos-voter-0.2.1-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-armv7l.deb
55b97236ac80f1f4565b4d74c33e20d6c35e7fbf8ea12f71c023a1a1a5d99412e0496d95efae61dbfb66a4880f2a09940754d653647608cc0d832de271e2d61e *linux-eos-voter-0.2.1-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.snap
3c2cc744eb4c54be508f95cf89ec4b4c05ba81c3d05e15f7689df5d69fa2b8a607a6abcd5934a2f34202342b5bfa052a545ec252822a292e9c160094424182ad *linux-eos-voter-0.2.1-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.1-x86_64.AppImage
e475bf94f6629e5841b57baab10837c3720bb89270db7e53393464305a76b46c9b87d66b8f57c6caacc78291494d65c0f891b59ac0f099eb9b31946b851fff0b *linux-eos-voter-0.2.1-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.1.zip
5692fe1c8c4860f0dff1a5df444258aefc1959709febcddf025e4387e99aa9554d71c6a9839c9ac15d5e0d9e2e79eaf03265a9060dc20325bb03c3c374fd9783 *mac-eos-voter-0.2.1.zip

shasum -b -a 512 win-eos-voter-0.2.1.exe
a7fa929d14820c5534a2b633146dc223396705c9059130504c450fecd061ad789f0c9338c58946cb0a19dac73045d430e1598c387338390f7c1d589cbd50a475 *win-eos-voter-0.2.1.exe

shasum -b -a 512 mac-eos-voter-0.2.1.dmg
bc3a28ae0354bb677fb5a775f1c4d5d624fae519bad5f49f3d9d70161d2e0c2dd19cef6a24b25ec0e0823bf1aafda7a422a9c2178c3bf784138173818b63d6b6 *mac-eos-voter-0.2.1.dmg
```
