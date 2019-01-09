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

当前版本 0.6.7 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.7/win-eos-voter-0.6.7.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.7/mac-eos-voter-0.6.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.7-amd64.deb
f2899ca957d9703ed6b1538e00c71d284762cbc22514b4a871811ad01092c8e3d50a925b237255b4853fdf4029c20a0b9bdbe839e9a41686465770c19e228d2c *linux-eos-voter-0.6.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-arm64.deb
25de79b05c683a6daa0f0f96d63f6974034ce0ccdd169f05c617a96516dc4f5ead2101408bcb60f9133e8e6ca11f467121abc51849e5fccc71a15b1254acbce0 *linux-eos-voter-0.6.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-armv7l.deb
cea54cd8be68cf8069924765a33d23182d74097f0eb3a4ef2fc0519fa06a2f5f33524bc7eb7ae71332a3cb3d98ed4e42b8c3f3c99cd14eec9de38a19db70ba73 *linux-eos-voter-0.6.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.7-x86_64.AppImage
646a208065bead3a44147dc04049e0ca0ea635fdaf8f97de12eda48d24b8371ce17fdf4365c1dce44ba5c18c144a4113321233754049b88fdedc05d12870170d *linux-eos-voter-0.6.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.7.dmg
755b651de8f0c7b160ac54c64178a8de2ea1dfb09e23f5a4c03f431e71a7459719e8c9aa4ca46bbcda93148fc0a7a65101371e20fbbb682cf47608be054fc784 *mac-eos-voter-0.6.7.dmg
shasum -b -a 512 mac-eos-voter-0.6.7.zip
8cff2b208f3fa250823787a319f9b9799b38ee233c7f237891a7a569a7bdc382a8ebaa62af8ede2247e5af71a3d9858db459e88b916278b01553a58cb484939a *mac-eos-voter-0.6.7.zip
shasum -b -a 512 win-eos-voter-0.6.7.exe
f06eee1cc307372219239eda2dfebb6436b8edb1ef8d16db47a9519aa7bd4c2b297f5198825e5702d177674206c53ed032b521783a74210178db8f4357dcf98f *win-eos-voter-0.6.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNnY4AAoJECyLxnO05hN9/ZcP/ivas+Kk4tg2oklVdvSu+jGa
wQUM5HNo+qJMKStImJs1aCGbcXPeTnqakSxUhkgAoinktTskWTl+Ti4thaA5h8Pe
cYg8nhP0G4vnwITjnjMyi5LMRpyXDRFc9q7DA2jxB//ZQkvm3fGb0uZSCSfihpY2
trGGApBjbHCG+Vou/LcVrt/s7KyINOOueiavVCbgA16y9U+1thh+YYddGR4HMTwi
o22FkOw1+y3kA8/1npjsyT92U8pG1ilzGCRAMTUBE5Kndbmv6bdH04IzJmQ8oXvf
5L1vmQpg4BbAMXQT0npgAsxRMMoVmoxcM9UnXrWoROzSC5+5BuKLmrkuh9Moy2I8
I/bsRgy2VyrJwRzMi4aDw4qJNwf4166KSl4jHdPk29CupLDsJrfAXVdogLRSJTKC
nt7qNGSqg2SVL8ramMCp+7z9ioT5nxNwbcdCoWr5KorofzzTJXQ9SGc6Cmt5Oln8
DX5U04+r35vCt8GBdBPDF5Sx2ZRE8td33m0wSabvAZB9va/CXG0O5uFXnn6GklJb
/8rAUb9kfuQPykViy7oky6mwn8WO8bHd6bkaKinoVHCxVfw7ZPCghw8Fz59jkOdl
3TGJnerCfCuEEyzrD+ikBeAs/4toBaK+M8YiabM/5lI+SFwca+aZvUtGngZkjUQg
X+fPa5nLn+vheSCBrMFq
=Ybzo
-----END PGP SIGNATURE-----
```
