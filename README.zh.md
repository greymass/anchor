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

当前版本 0.6.6 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.6/win-eos-voter-0.6.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.6/mac-eos-voter-0.6.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.6-amd64.deb
84a1e8a226b13e37022b9c7f83f409a71b75f519c1ab79592cccabe021fa65ba3bade4d126db1cc890150faf81b9d377d29a629c5ae75d9f95d445b7b07ad056 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
4d7a3cec0f4a4418d6bb77dc52316ae90c9e9d0777f212eae376f18a9986ba6645ced7d92701fd9e144889538ac6e4f7ee74e3d9e5552b17fee5b9b367fec4c7 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
f8c9d41ed0014674d4595c0a8ef5cb6e9366d02f6eaa4112930d1806fd43e644954ea7187eae495cdee6fb78caf9cfd3b816d25fbb11938ea069d1bf46c72f1c *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
4422275f2b0db0e1dd7a2f533c33dba7e4877c40fc5685af2da252a7de7117dbf2a3a96f3fada65f307c9019f2aaea60e90d8341b6c7a42a2fed8cffd4999746 *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
5cf11187d3ac8df5ad188b4287d93b9e1feee93a31433d385fff2f139de297ae0ad77c336b1b67c09688eadc58353ca41dd2d1e02eb164358d73ab45fa8031c2 *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
eec19a97cc58472e637efd722ba734e89a82b76d110eaa8e6ac37841ddcfbf6bffc89225f5ad16adc724d0f747b3da1e9f94680926312a01b6f7660ed065da05 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
a7e5e605640213114c43cbf38a4ea7438e3f53b3dc9cda9556308fef0d9c816b8cfdf1db012e0ebe51ffd91a49f930351f8b8bed4f68752a63f9d088ee16a465 *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIXOxAAoJECyLxnO05hN9CogQAI/1/HwAly+bTzM321g4FirT
+qfFhh6lpfuwbMiJgTPnLUQdVe2WyfGhF35mAB8qCngIUO3wq69zAxa6duNsJHyl
MvcudxGbpe+JADD7zDqGiY9dw/MVCs21rFPLlBDHu7bytSQ2Pdh6Mp9xVlalZmgH
WFg6xBHLy6w2k+xCRUoqlK2qjoU8wkC5YmuTRuqC9UxlYVwnk1SW3Rhe8nuFISz5
20u/Cfe4bVQgWrU3HUpaL2PyhrfdmOlcxAKnsSlFrZzHjJRkQsgoPC1OG2X9C/zq
GV/8lHjCmZl51n2WVWZtAhmSPjwcbRLfKBLYDmDN7uKu8q4kVLWZ5882cRHYYwID
WY3cXnAAj8GjxNepDUd77kHsVw5iTLQq6+UPtV4ASGr0lVnrVt9/bbELpaqpS3LI
zXCRs0sBcCPU+zGJc1G1dsj7SJW6gmGxtQRYLJjeD2q63roX/bHViECvGJAcCVnY
wevKHTlIuKXfliqaavbNoiebVYBSTpnby0Ts5kb1O2WurnomgKoDYeTyKVopTWaA
jtSCkNrPw9dvShnoV5UeKMjJXnFTgdWQ5V/NX/YvLMvl1jdFl1Ciqb8KZu2h0B/X
MkmB+dvyM+/cR+H93LG/Q0lgItm1KQ5Z/JwQy3W7V25Ive3tIUQnax6N0tsnShci
H9AZyacToVn3M4hBJZlq
=uI8a
-----END PGP SIGNATURE-----
```
