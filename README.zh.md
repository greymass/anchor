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
81dac8eb51d9b75877ef8111eb1b1593e9ce3ec83f9d329425a0b06975bc55dcab8de82db37aa45a70d32372dd87e20c560a815783dd58a195c497be0aa0f089 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
d2db3977c1afde2856285527a71e3dcefb7faa84e04ccd583dd82b328fbc078e1fd3321b1f9c8ad18196c558bc46565193f3826b600491954b09e91d2c785421 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
2554d854da5aff4c60403e08b28f6624a5f275ac604641c557a4ae004f0c028f9e2a63ebf431dd04aecaec99588a83f2cab828b6017ea47a89bfa14febef4a08 *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
1983a8f9080f18e11872c57e1814ce158701ff9c425cedf04ef38582f067eb18000034c04d1a46a16cee11cba9eb5fa2704f996ea1bbe4ad1c47b4046fa8b76e *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
40f61b42c29cff4f391ea7ade53ef92aa8a9152f011ed69af6ca5a39947246b9d71a510df78ed1775f59e07b9b8f5afd4374d74017523eabe4d4041eb86d887f *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
32c1c3d3d978c891db588e7c9c04c3f3e30d06e7362c88dd90608373e1988142cfa28c6f361b2c27f0fb53a705ae2f8871d57a03da15da651895ec1c44da2a66 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
720f6e3493923032098656cd391bf7cbf0ac26e0f585d68707f02c1660a0b6576dbf02646f2fafa8b7173a81a9f3d6480bbfdcde3e14184aab22b791aeab079e *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcHZfBAAoJECyLxnO05hN9TqUP/RiFhoduhUNspmBMaygUHB44
YIw1x92wn91TaN3PUnKmQe957edtLfkwY704BLcj3t9hbrtqJV+2yqpntolw7hOU
Wpo+loSdcgJlUh3fFNiQH+SNniXvIvGOCpzd4IBNPhPjMQQ2bgQC4YOdBZindodi
uPoPQMNsmg2/B/ZagiZzxg48u2Z2gw/S7P7MskAAZqR0nFDu/W6/Vk1XY8fXOtgc
4V3oa4vSyl7680z2K+mcPtPGb+k2RmIl+6vOfWnZtGStBBsMOFHf/wwcLRYO74S4
Y3clIVGadNeJ1+IUZXuvjobBMVMyylmNff50NUE/mBaf64DMxhTFi9ahnuWDNXzR
7pSp9aK8fgKeC3BQXb7ak7zpORB5DhC1ZwGvZmdyEWexiicLKVWwW8CcxI0yh61/
39RYSip3DtI10lVWX3LeopTTVwRgLxXPlPbUYd/dSdhSkOjSkvmamXn6/wjmipHt
DI3X1zKT6CHk8HKNp8Soab4GEJGk/BkK7lh7d5pHzRrmg8hgbLCDLpUCPP0WrK2b
glRk6DCMcNoP6TAXNMQWwve5RKNlJgRiW+5gGMi+AJbUht0LUFtF7+sXO7zF1HYd
zbyvruxLgrONe4xAjCfK9CDW/Zyu4XjXRalIIKiA2KlSX5XNUXojylkub2jwroAE
M8iF6RPLTWb4hFKtc2vu
=M6IG
-----END PGP SIGNATURE-----
```
