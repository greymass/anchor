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

当前版本 0.7.9 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.9/win-eos-voter-0.7.9.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.9/mac-eos-voter-0.7.9.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.9-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.9-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.9-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.9-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.9-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.9-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.9.dmg
fb8c673a7a26b4b1c6dc8033409598d0e7e5128cf00948cf298e1aeb67d7e97e48aff8f1825c01c1c8e5c6d20dab9a0d093341ef0f197d6558b244e73247c14c *mac-eos-voter-0.7.9.dmg
shasum -b -a 512 mac-eos-voter-0.7.9.zip
a34872cd499df42640204cef7e34488b5459d5c8cf4cc6fa6f3c3dbdb5f3cb374a490c8f5e54bbda01da83f644f7b328998e15eb6d6e4f8c2fed1c651ad6626e *mac-eos-voter-0.7.9.zip
shasum -b -a 512 win-eos-voter-0.7.9.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8Cg8AAoJECyLxnO05hN9DRAP/ibL7YK4Jg668xUW8yvgK52u
x8OqPjJZeF7qZA27+nBXMk6wSyoeoGtfn0y6PFMD2toaE/omkyj8uX9jjkAIgVhN
Mq9vDNj/eY9dbvXs01GOlKha+l1Q6Jf6NrR9CJ/pEghM/QEpAFC0Xui1OSvvTj1r
HtYm1LVxfhEMKJavTbUBK20EqINpimZxz8YV4fQdY/rNa6vry3vEnW0VA7hwinc1
yKNQ5QqLCQ9tyoFGMOdj0htgFxkOguL+UxcCswsLL6LLGthgRln/IW0PxCSgWtd6
bBQAswQjUrMRRbpAD9MEpgp4NXx0mZkdPldBL9Puywaloovb+x7gsgX1DMycRoJ8
kNH5LCsYVo2jnvbJBn6dRzUruLAuOo+xxr2xr25LIf+U+3FMwl3R6OudjG3BjHeX
rbn6wfUhUF08zEYe6IID8kQcZUrn97MAAIKYsW9T0AIfZM5nPNet5irZm3UGZvEV
aFXxZ8eG32EJMNCNYypnyGPmR1VNVWfYxWakrS7gIpMsjf5Timfd+rtf4oNqNyBY
PLaI2e7qSB094djavYv2BZfDXxLANE8MupooNXD8qPDT1KluRvATobdUbNC5n66u
uew4KWCY3YXW27SU9rmnNVROMHVkffBOCQu26exVOOFMojdw5ybPbEtnsYXbJr6Y
X7V2/u9gwwkMlm4TwI2j
=MMKR
-----END PGP SIGNATURE-----
```
