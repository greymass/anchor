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

当前版本 0.7.6 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.6/win-eos-voter-0.7.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.6/mac-eos-voter-0.7.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.6-amd64.deb
aa135d96052585d818f7c47ef01599aa6d64344292228fe8e027973a2d870e5cc5bba6ec0fb8073ed87d5169e30f893c4a6746c7514458ba3b8832257ca0ba04 *linux-eos-voter-0.7.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-arm64.deb
dcab7bf7c943e848622f9a0ee5f4ee52927b6f055a153b05e203463394ad488a11d9bf29533e6b23b7bfdd0eea61f27ff25a1fc8db50bfe36aa8fea97405cc47 *linux-eos-voter-0.7.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-armv7l.deb
865ef4599f119e25c47ab490f7d2700979cb1397079eef1a52ec59451e1c7a98f3930d45626c533dd624ddffbb57b474a211f2f45563317d5d6fddff7147f534 *linux-eos-voter-0.7.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.6-x86_64.AppImage
405c1e7dbe98bf7e442a51143c3be5cbc0028d179f3417809e7f6bfd178cf6e0a509461264ec469335f46605518fdce59d3f26ab02f4d9c0e80e49abe7b2a743 *linux-eos-voter-0.7.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.6.dmg
5f3d0825530a98285fa0191c2c7a956f7d7ba741d5a3992900be95f9eee5cb4c81aa368567c2ebd4fa1d16e40a9f21a641dfa1ea6388cc569ca8763d9e1f84c0 *mac-eos-voter-0.7.6.dmg
shasum -b -a 512 mac-eos-voter-0.7.6.zip
de65d261a754791da6ec7d0a850e552e3d5a8d828cf837c9fa84a0aa0d05ddde61c59179d4a027122b66783db6351ae427917640f85266287d80e7a5003918ae *mac-eos-voter-0.7.6.zip
shasum -b -a 512 win-eos-voter-0.7.6.exe
bf6e1010371a8d5aed757dd0efb3e1b89d5c0a5a1604c7beb3074de367d1a350e1f2a4cf60ecfb9fade3960174557b062aabb88a498f68034cbeb5a046269d50 *win-eos-voter-0.7.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcpNwAAAoJECyLxnO05hN9awsP/ioJ5zINASlEZj7COiYrMDu+
yGDJUJdMZemcCQpHyvBFcV/SGgbZdVd9MM0yc28k7IESHi6kV3BhspexB0tU7Lsf
+KMLGOd2zlS0On9MnQdnrjJdSfxPvk+sguj9A5/y0nyzF+TgTHFXiz6nSPQJ8RVQ
Y0jXD8sy5ntp7/NJYJD+h4PKkb6CguAyJQ+rcd+dvO0cT0k6WP8pBGlIgRdB+Cm5
4OPss4rImS22OvmEVqgbaSsBS+yqqJ+fI7841J5M6iio5dRK14ynuVHpBj//t24E
wMcwKcfcn9bL3/KghJ0QAEDY0aUM5U0lwnuwutVMfNRWRmFnHV4Uglw1yectP7xN
cDFvBr3aUJg5DwxhnLo0vBua8Lq21QamUc584f94u8QC6YW9kQlMbmLsNAUh4XpU
jS2JELTqn026SsIni6QNlbsB7QrUpcW/k9rpu3mAmk9Hbc/GkkdwuYgTLQlnPuTJ
FvsfJ/yn/dkQw/ZM6QcFGtIBD08XyYiBOfcrY6B4cTC4cVxuK7oep1dmsMUKTO9u
KAocVUwV2XG8IONyNl0uBG3Z/UWcjVTl9BnJkl0zBQVOOJE2Ur7brmnIAs6Bg359
7TCWLtUwfIgMToZz3I0rFiYsuqufPieDbICayLlYdysRB8Ol5xTqt2sH2BDUGpLR
tO63ZSfugUz4R5y4YS4J
=gVCf
-----END PGP SIGNATURE-----
```
