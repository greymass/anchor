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

当前版本 0.5.1 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.1/win-eos-voter-0.5.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.1/mac-eos-voter-0.5.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.1-amd64.deb
001d9e8b38dafc31bdab360dc758c51e7a978fc80b87ce1e03e55cfd0f99110704ead1add62b1cd4eb550f6da0aed1492ade06c57269d607ac6ace0d1d5cb0fb *linux-eos-voter-0.5.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-amd64.snap
229de9fdab1a3c9e1c660530774522cd6cb7829575f7ec6767dce3c20464c5bd5a61621153ee492c1df7b9756b6e594fdb06b4c9341fa5e18c46480644718bc3 *linux-eos-voter-0.5.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.1-arm64.deb
eec8f67aab3cc0f46a6c3181cd2819a68c83d470a838b11856ae5e4aac43f01063a832986a960f93b84cfdaa619f283b95fff4a021725bb05f6d9c82e3bd1746 *linux-eos-voter-0.5.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-armv7l.deb
a2ca519da2c3559c448eab5a94406e891462d4b9e12c9b74e944f350e5741dc8ef05c653102a439d69cde2804fe37315580c054a68423bf542ec5002622011e3 *linux-eos-voter-0.5.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.1-i386.deb
9ce361225aceff3a65732d607a792b83ffe6d59f78b0b6e2a8d58e479de4299ef32161d10fe09a28b126a9a25010a4ea4ed816c8c400427b3d03eaa3e9e75c22 *linux-eos-voter-0.5.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.1-x86_64.AppImage
a8797a5d838539efc007808c2d3112cc2833b182b22f5aa63bd63a6f09583aaeeb22db153e79156bd73e8ef63a7c176e2b96891e36c05a9ce7b5c3fb0214017e *linux-eos-voter-0.5.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.1.dmg
1e34bf2a0f57a7bdfb9292129cfb03b7aebe0a73c868afc72d23a8ac8896846a96bc4ea17241172c64c4857107cd73b27b08b078983a6ed5659f05d25aa1f97e *mac-eos-voter-0.5.1.dmg
shasum -b -a 512 mac-eos-voter-0.5.1.zip
89640896cb92f9991c2d4cc09a9700d8b7939790460bd40af3093a07b861cc13ecaf4609fa131f700ecc5a8421199006b54863e5641ce4aa613eb57f8915fcb5 *mac-eos-voter-0.5.1.zip
shasum -b -a 512 win-eos-voter-0.5.1.exe
06e24034bd3f0ca36357d289b48ed22b0a707848025ec45adddac126fced5b6b1111fb83b0d5b7c117492c7929bde0a78a786185e943c971dd0667a0538bdd4d *win-eos-voter-0.5.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbfeIlAAoJECyLxnO05hN9IpQP/1LzHhhaV65jGJAYp20j6XX9
yzdl4d2iEbMyPRdN9bs98sV57CVHS6g3delHawXOatogZsOaQKRC8fEiAg77EJAG
3siPqwiIBJ6eYUk9lnUGFaCQcroA07yOfLq1yybg9fVzAKiYe5TCBDlsXPUreGu6
1AiNgE+ajJiX9WNv1NyPHpxTsBtrYbJk5wVw0t/SV8oX4si7OfxiEINMnWxq94ph
CTzmkH36H8Sc5iXkJU4sAyNTtTyOhmj+d/MrbjZMfusvlMRC3Z6yraHvTX5zuyop
6HrlbwA7PBCRnqz6VAoCv7w7b/bWCBcB2Ldrwsf6L3zRm1thsqsnpuLb2hJEZAib
bLshvj0WIfgI6O5wXkC2cx+Wknm+2a9uFQW8kElaXXNZYNreH5y5VjU0FkUVYTa9
Gjl8wPPvKIk6oxlRXu9FjbO66b/3ZfABtB8t28ik74TfgBLIlHlaDzMe6qVr8xrh
6nST5qeSZpooZ+J+KbRl9GVk8Upzg3tPOoJlU6+efJJqwWVl2GMEZFS3NI12wdzW
ICBq/+uRK20TTMoz9K1OI6IaCIOOPigItRQxQbt0aLgJSqswyEmyN83PptxCuaNl
ZzZj8uEVSTPBEuqhyb2dguIv6Ln7VaFuPOmWnOBzB1/3wqZUTi0Mtr+0jxlXrz5T
Q69/2TUDEepbkQD9HBMO
=6SX2
-----END PGP SIGNATURE-----
```
