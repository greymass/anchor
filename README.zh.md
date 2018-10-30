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

当前版本 0.6.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.0/win-eos-voter-0.6.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.0/mac-eos-voter-0.6.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
d4ef6a69f5e5c5bfacbd96f0009552a37ededa18663c7c002af3d19e22dda48a46f030c7294e91b6d6fbc3dfcf75b202a693563a97a944881001c01711b6d3ef *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
7722e90db10bd53984b9eb7e00ede8595bbab9e0ffbc72d0acf4e8ff79e6e771a64c3fe4e2514bc8d59bb34256e4c0072beb633fa713720507fcd62b7c2924b1 *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
577ba5d04fed39cd5425af8718e065fb712d9bf62854811beec233053ff5c2d1a66ad2baf50e079fb22cbd2aa0bb0929b513e7f44258ca986a71f340619eff3b *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7b7b5687b3c3f8fae4049cd4dee1b0b28a6018fb98422cee7d3501a3f0e949e5de0d0b98ef48d303731bd94a603a1a7cfdd717df2a3a4f35ad8b94bb83ee4426 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
shasum: linux-eos-voter-0.6.0-i386.deb:
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
fdd898c8e6a97857b72709bf01e21e74b77ee5dacf63972e7473a19296940a28c34ae2abc33d14c4b411159a58acd913e7304eafa483ff7c49303e7fd344e190 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
d5f38d3bfbe8a02010b2f1a633f21bc08af68b020ad747c0cc2f8a92ea4160ba80537061a9ca643b7ed6e8970a2f9369be0fd531d390940e1d4b0afc6ec6c0ac *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
16ca3f7e145348c4aa35fa0f581ff25a6e794d645e6d0028bcfd16a0dc628c1501951fcc7f27578a17b1e3aee190617c47f78f616123af4a813f12b600f72c48 *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
3fea6e514faa56eb3c2abca1d31bf857b652f0dd29a42a260d8af814f14443494368149f4cd1d4adaac4b43465f53e1ce4b845a2b95a4e99aa9a800ea7565e67 *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2MQgAAoJECyLxnO05hN9OzgP/AiDx9Rt5V7F4bBlvN4LEHVG
y2XOnxodtPDyD3dPInn+bFnWpqIajjxSbhFwvnjokFmuuGKLtuY0oAKz1Xiravox
h5+Is8E67HgGia3scnL8qMpax6UXX9v56rQfGGUEPHUqXCRmbMhusEkP1jSCvsjQ
BICVnEWyGi4afXR05pAZFckqg+bQhbjvnimMH9UKZh5zFOcXW6HA4lgSKGRkcXC+
YwA3oRnGPetnDNhU9oPQuzmtFGe59HrU3cIEDer4rwzxo+e0dYor//7yWjZihYfR
ZmnS1Q4h47U3XkLRWbQBOmRZKgPAX/4Kv8bKRWearR7H1UQIRIeKuRhlg61gzxTW
Ee2oGs0F+waKbVXS2UDoVk94DUvOoGu4/PPUM/KIhYRMYuB39/pO6sxYWtmo+GEU
39PqrlSnCTr7YKe2xuOZNUQpI5CgcXJd+HphkEpbHsh8S+/Gv2m7QS9IGy00DOCV
R7sMRaXKEorFiwt1L2JHrB6HWElzH/zmDullH82T/E0q6wq+xi66Vlyj9OAoCUfU
NGRHZxftulaTX5zOxnRJvlzsRluTYHvt7Bzz+U4N0b0SZrHLlb7ul/LkPw9OWn3k
9YiFq6QYbXHc0NKLMgc9j3S14AYzEZTxEzcJUAm1dxI0jYPCc0M4UIv3ViRK4PhB
CvdJUdD65R2Q8sunVnB7
=SEwk
-----END PGP SIGNATURE-----
```
