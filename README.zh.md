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

当前版本 0.7.4 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.4/win-eos-voter-0.7.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.4/mac-eos-voter-0.7.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.4-amd64.deb
ec117530d7a7cd540e1fc649d1c6914817e900a492651765518b1b65624d6ee0dfc907ae9b8ee0fe2087cad66e392a4bcf233c5e113191792cd648d9356bef8e *linux-eos-voter-0.7.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-arm64.deb
5ff0fcea3ae45400fd2179d28b54d8a282c8b36682d013e78a3dea1c21261d48c9a5412e72e4cd51b220fc44adda192958a5ad0f992027eee49c12d7bc5f0759 *linux-eos-voter-0.7.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-armv7l.deb
ed1e61e8ecf846321d8ef5d2df1bdc80e90e4a97544eb7cf9351b4753ee84b75ba420c1d7f106846f7d04138cf41dee67e951387e454b930ebff6ec112914254 *linux-eos-voter-0.7.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.4-x86_64.AppImage
4301bbc3b05d67239fa2d2bd20eb5f83c55ab339ce362ddf3c0e1903ef2eecceb916c1bb713ebcbfe2a45e08a39561f56fe18613dd5d2a8a032f10de35bac86a *linux-eos-voter-0.7.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.4.dmg
3059fddd190ab7e1c727984f8ae6ce676c56c6fca33ee7631396565a8c158a11351edefcbb85dad7bdcd602399337261582d1495e3129450925092586e7923ba *mac-eos-voter-0.7.4.dmg
shasum -b -a 512 mac-eos-voter-0.7.4.zip
1228177f2f15d83e52c029dda3ac86f851b8ca1022ea96f197235c7894b2a8456dfb195bf189303cd766d369fc2d6d84c749faa41f39aaaf032c3fd3857fc07a *mac-eos-voter-0.7.4.zip
shasum -b -a 512 win-eos-voter-0.7.4.exe
3b7b11c18c6377ba804815666197a4964cacb90d19b69a78427013c0940c38d8667aa44a9ed72e421a7103dcb567b9ec5aef7f5f112e76c6a30d22ac99a73040 *win-eos-voter-0.7.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcfCJhAAoJECyLxnO05hN9t/MP/1gGGEMKyQPJmFHsh3u4Sb3/
K6QLT3osrwlh61evgqjXa1whstd1ZaD8GFABPhVIBhYveoygoQSQEfyw2gpcT/dF
7Agg4f6T/vF6OfcfZFUZHN81hQ761G8aZT4mkGXFXG6IJNsHojkM8aeQ6BKMY9uf
HH10HM8L02/KeKUxdDwe38MOvcWPYd3ECCX39Gr7qMmcgz1Hz2HqfI98oH4pxVTy
FrCnsjL3pOVrF9AkCtPvi+FEqgDcmXrkzB7EgSr/O37tn04Tdx7yD44m8evFepkv
N6KKHJda6XW1xar1BWn/FpQf+389XZDtwMdepZP83w8f5UuvD3ADKr8/cVeo3+M1
OzP5WhBHTdbCKLzyg0QUEfME2UHfMTJPBJfC4HjWtbJ5xudyhZa6UtFkiYeDABfM
jq1Xal591ffbkXFVakLfImn5txoM2ib8eQ9efCXje/sKvoKyvS/q6wzNLDZkQ726
akFzBIC3Mvfr1qjrUKXrjzVfq9bKVTEX7uWYgc2jdoskxOESwTaQA9nLtwks2HsY
YwH/CM2TqAZrNlsjRYzRigFZdL1WJV0S+8dlDjZZqMOgYHmv4f7Jb5PXUAKC9qDH
hUSRC3ZDla+OszCKX+nlK9CdNFmkOSlFx0+vr+4XxJtmqrFIzyEVz066fht6W3U1
f5dS4mcxa6gxfr3WLBzh
=OUdW
-----END PGP SIGNATURE-----
```
