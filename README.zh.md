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

当前版本 0.7.2 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.2/win-eos-voter-0.7.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.2/mac-eos-voter-0.7.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.snap)

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
npm install
cd app
npm install
cd ..
```

然后:

- MacOS: `yarn package-mac`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`

编译的文件将在根项目目录下的`releases`文件夹中。

### 调试模式运行

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
npm run dev
```

### 声明

该应用由[Greymass](https://greymass.com)团队领导开发，用于帮助EOS持有人参与EOS的治理。

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.7.2-amd64.deb
3d0358e1fe63e5739218f748f2436b8f8754e9442dff8e3a7a0081a8ecabd41ab276bdf6cf0246344fc7f635cdc72cf0f2a583c2c392afb8a6eb14d4f087bde4 *linux-eos-voter-0.7.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-arm64.deb
8968ba9f9c5ad2d61da1bf6bc4624317a9accf93d9988143f1871259a1f25bb11115a457334da894393d8d859505f54359518fd7a2b9ab985105d63ec589af64 *linux-eos-voter-0.7.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-armv7l.deb
b8eb83776671b0b5df6bdb2aed74ee12e5922d00c6012fbcc7d0eb9da32ff9eddc672eaecfc6a5dd7074d190e18d94b6cf0db324a5e1fb8c974fdd12e036132f *linux-eos-voter-0.7.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.2-x86_64.AppImage
b9242ba351b839994b3d0aeeb5c937cf2ef624c859c24aea07ae3c8d5a42530dc984c7c50f71963bc8227be101a278c83f070b5044af9d9a2bc9e456e0c92ff7 *linux-eos-voter-0.7.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.2.dmg
91005c6409de1468a948f63638caa21b6323342debf1a71262d56d6efa7a7bf1ad9bb920c680649a304c9a9d57e87f6376f82b0574e51c51f44393fdd440b95b *mac-eos-voter-0.7.2.dmg
shasum -b -a 512 mac-eos-voter-0.7.2.zip
cca60b96d8fc41eddd22d421f353bc9929499245fe62fb42de4f8baf21e9445635ddeebf305908f82876b6de04aa7d8cc818e0b654833fcfcd0e78c9c1273314 *mac-eos-voter-0.7.2.zip
shasum -b -a 512 win-eos-voter-0.7.2.exe
f7f9b00c82ae668979a4f4ad9bc8d76f59a0e5a102154cc170e4c0d6433ae3f6e21c996c112f57e95e90574195e3d879684f32280595486862dc794c215f8742 *win-eos-voter-0.7.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcUMZtAAoJECyLxnO05hN907MQAJ+tDGrVaSjHWSyRxP31hRLF
v3E/FIYV8IKMGgnMfayXe/9TKKCMZ/hDS6qglD4azOIWDGztcaI+pVpQ2DL7CL7I
QRKVxxUREvZh5GPUmWsHdFgnbWAL0fWXd8M6YGRRilcKnIAr0ylAV9/YJifr/DWi
8+/OnWCwuSlz1IIiq2XfkBn5uvDOa5HuK5X3IQYVfqVsYk5C6oYHsB00U79mjyoD
GUF69SSBNxY6BmmdvBekT1NDmzDflt2KxTrkxRLxvAFV5181X2iKkopSSg8WO6Sr
la4GqH0IyysiP+a/xwe5G7Q1zNVW5Gxy7UPPRMb/IenzjerNn5IapmcOrklhM2Oa
VDTAJxXkI+4wnvxdXGg/LkBI/bFNp2hJLJXNXALIumTHcFHXUQ6+p3HOR+bg3wQc
aPPvoBqy7GOgzcMw2EL+IN7cMzvhAkuJebXbo+CqmZKDqHTIg0qT4InpMl3AAbgt
Hlu1fuAKqplRm7z8c6To+GcObsbuasPMZPL2+qG8tBsYTx7JeDXilL4T6TLRwU2H
hXPg6JKMbiXr0kk4t+spNjaV5yFaWF3wtxLFnK58MZdwEn78JtEGyZPGYn43jv+X
hkdQzepf/9C2q2Hqmwme1CWhqSTb5Ymo6yIW/RxOklJpEc988Tp1QPfcUtx/HZmB
rvwtIqMk5qpvt4Weq0sq
=xnpA
-----END PGP SIGNATURE-----
```
