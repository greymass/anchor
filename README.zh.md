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

当前版本 0.6.8 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.8/win-eos-voter-0.6.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.8/mac-eos-voter-0.6.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.8-amd64.deb
7cec380eadf243789c209c13c5abb75c6056118d6b2e566245a4e7e33dba1572feab6ee4255e0ae353c2b49b85b9dbcb7a95525d4524380bd707497c949c12b5 *linux-eos-voter-0.6.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-arm64.deb
8737c70289e9779e662f069505b2ac05c41df3bd0a5891b3859a530461a6eae016a3419498d60b3e1d56728535106f7c6a8d19283a1f572c5fc34a927857e040 *linux-eos-voter-0.6.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-armv7l.deb
9280b6b880c8b1133f0a7905d9ab9e38ff1a7db4f69bc143a88d17738d33f545568dda6f9b6d31d5beddd62ec248eb787e002050f568d246862311c785356e2b *linux-eos-voter-0.6.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.8-x86_64.AppImage
66666a5b9e9fe0970af50c866e7e065177b27e866a448bfefab73b27cece82a0081279c934bc2ab91b630091fdc7aededd39de7cbca8f578ef5c2332c55b6370 *linux-eos-voter-0.6.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.8.dmg
38469b173548ca7f33ca250812aae74127edc93e45f4411e2230a3967320b409356107ec79be39342505d34eef9eeff9caa30e60d3c9f578e4aa7d936a7ede37 *mac-eos-voter-0.6.8.dmg
shasum -b -a 512 mac-eos-voter-0.6.8.zip
904b4463667cb873f7b89fe2cb606c95a7f39e1a76e1ddede0320f9bba4165bfb1a647c6f2707d34bdf32783c2c61b84711d8240a055c4b97eb1302efb785330 *mac-eos-voter-0.6.8.zip
shasum -b -a 512 win-eos-voter-0.6.8.exe
36b5fe426bd450f7f0d1c57cbe86f80ee47508fd4db483e3abb728a6e51eb6e24652ee4f857845418dac2efde5dbb20892a2ec36507b2d77de7931dbd53ff30e *win-eos-voter-0.6.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNutDAAoJECyLxnO05hN9KeUQAJ2x09eWhlwhp1hGVeqftLR3
riczwU0aChPY4HLSZ4VNaK9Llag60tc1yhz5dVB9+m5nblbB4h4gDFBIBZ30Wh0f
sM8DDFDg3Tou6lxLx2qPKN6PEl4lhoY9h8sxgsd0X88/EkgLY6ihfhID+r55T/nB
tsVIaufadm3rNVAkoixrMfb1hu0FkLrjfXwA1v/h8lU/4u2q2nUd1XaEvqBofoas
4jQPmBB6MdoNTL32eig8Z1N2aItRuzqBnkEOpwGARkSdh2aUhQFp1DCNmyaImEdI
/kc/1Wbxg0mTvb6ld5yOo4lz+LmBDwUkJYntIHWmiaOw24SdeOEAmmM4ew7o+XRh
aeuPuF43Rp+VNqrz0QNa/tdVRRzbLOc0i4/fXYZ3a/dUwHV4JNoLoiYyzpwFexJX
vNFOUGrNYFqM9ikX5+R9E95cF/gJJzV2BtTPD0xwprUluYda15XFlTs+Sc6Hsxq3
JTBcuccHeiwQ/tnJFa9aXc/EEzuuSdP6ehkc5PdFm4a316lTLDOwcyt/tw/5DVvN
wSK60uEFz+HO+mKn3coXQGtoAczMSLnNvGKGBIowDr3EzRVt6gUgnQV9DzVm9x6R
pdATD32QHBYfxVpCW/y72hV/jtSDEniPJRr9wFD2L8IlWNPY2X5MKVDQlrXEXtTX
sEmjPVwH0rkCgWQApRm1
=DXcJ
-----END PGP SIGNATURE-----
```
