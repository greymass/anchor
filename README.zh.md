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

当前版本 0.7.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.0/win-eos-voter-0.7.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.0/mac-eos-voter-0.7.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.0-amd64.deb
45dedca9809ee0a280cf173785a1e828d70d031fb490dfe15143d724c000d90c5a616e6210d1fe73d9a5a2eb182da90dcb50d687fff8828e606552799738ea5e *linux-eos-voter-0.7.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-arm64.deb
b0c870363b2872d1aada4a087c7b116491c299bd4fea96f05e0d3e81f68e932e9b604dbb6e0073cd511f9c0b7aae03bf9ca281ac4b7a2858c8e64ef386d25dce *linux-eos-voter-0.7.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-armv7l.deb
89ed394b7e4f97c834eb883d4c96ee98516fd3f534973872c1c0ad48e380e2bb2157fbb4081cd9c1ff90cd0eb89f64367ba1091e0a078de8db41f89666aaf39d *linux-eos-voter-0.7.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.0-x86_64.AppImage
ec87d40caac53555643fb615de9674b8edefa8ef71b93c577a26c8b3c83f6273abd88809785c47217d10d96a37695a092d067c420b831c7ab13bb4adcdc001dd *linux-eos-voter-0.7.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.0.dmg
0004b2c1f7f3e4f123ebccc12012b21259d26d01a0a67be9b03216ab2846cb9d885bc0fb1ddc589f153d355290859349a3f181e3796bc069f6f36c42302a9ef0 *mac-eos-voter-0.7.0.dmg
shasum -b -a 512 mac-eos-voter-0.7.0.zip
3ffb82e66029af626f6cd099d4883b3be416fa21c824cb446cf80f58871e4b441b400446da0840462876cb2373c49de16750be07dd1c81c369b3d0070d989eca *mac-eos-voter-0.7.0.zip
shasum -b -a 512 win-eos-voter-0.7.0.exe
463f99128424622665111b9e7d9dbf09c871f3067df31d44343444771e9a9949a06536f46ee9079b46127bb8084a6f80ea2f953ca162012526e22662c2d65353 *win-eos-voter-0.7.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcO/J6AAoJECyLxnO05hN9IyUP/1I+N45d+/71Olmqf4o86c4H
F4MaZgc7rmaFMPemq/6vaGGvHRV1CYLEmE1Y5lFXNtVKR78X3SoEA49Uxi+ArYbN
g6YHwel1PtwksC46nDwicxtFf9XJxab7j0Qt9VkVPzWZDYMIu0SQeWHwDhKHpWyk
b/SfusjR+aubdeYbMw0r7cPMMKuhdy+u7oAhxJMUCcS7eTJZ7D3a7QK6awaJ5X7+
3y7Xy6XcmTULcctA3xjwMq5M/CcxLnTHfI3wNwJnKJb2u5WZFgsj6To1A9QAlcxJ
gklkJ5dvJxdHnHs2ed75oFVzsM7uzNzhJQgbQQpdskKmbJnMHkg6g+1RTIXDps4A
6VnQdib/34SwL2u51WX1T4tFCCWWe9MN54fj78li2iKbK2mQZ6DazJD8TEZ7QxCS
x/umbevTAryTvEzODLecN/PgUsjdSoctpTR8XQsIwR+0i6fNjEj3JN3DovwNzWuS
Lx1n6+Vf+el9DAABdL0ov73ONtc4ojdbXWtfaJJoXusAXOD9md0hwAMkk9c/VeuU
xtT2Rk2pwVKaXf31sxE7lwHI1nfATiMGuAPLUafrH0nmE+HfhnhzHEXqXCjkWgm+
AfJoi0lrOFUegvQN6HI0tnKsulExK0GMTutBVcfHEljTITENmaKAXwLcJciffWTy
r2qlPmomqiwimaxACafo
=XUHV
-----END PGP SIGNATURE-----
```
