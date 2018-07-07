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

当前版本 0.3.0 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.0/win-eos-voter-0.3.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.0/mac-eos-voter-0.3.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.snap)

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

```
shasum -b -a 512 linux-eos-voter-0.3.0-i386.deb
383d2e030ee927c76c54eeb6c6ce13913a0e39cb97a2ba297af15fab45913f96545b2025b986115d01a8ecab14e964749370990789e68ccdb19a6c5210933f5d *linux-eos-voter-0.3.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.deb
1228f22a4edbfe689a30780b9f018bbe1de81e58384350f74039e56d10ec65cca747f7c91971df43d1fe92365fc7f38ebeceafb3b2bee750c267a021564ab6c0 *linux-eos-voter-0.3.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-arm64.deb
fd2786f97971a5a94c1e35ca3a95b6ba8c9d916906ca372e4d705dc7b6cd9f0298921725a6df3e6348cb31efc321bb5578086f8f7171a9af15b6dc0045ae59fd *linux-eos-voter-0.3.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-armv7l.deb
21be6be8e70020b2655bdcadaf399a2440d3e4c9988619d8a9d6c81e16151271ad1d5568452a219d02f2e9ff196e79e349f7ec876be0570e424165e3b0cc3c5d *linux-eos-voter-0.3.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.snap
a8ac848ee23a67ec1749316d1d4fbd81c19525c6a39fc1b22da89676f26d0ceec35689ae3b6feaccec5e6e515466d8b087ede1c057d4b01fb97295faeff80dd4 *linux-eos-voter-0.3.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.3.0-x86_64.AppImage
e55be02a047054de711bf40d3feb238d12485a7f8f4329c4735ce434205f49ff47e95fa0ed32d42a7ee16bb3db7f8f1602530ecb5ef009331af2d91016ae79d8 *linux-eos-voter-0.3.0-x86_64.AppImage

shasum -b -a 512 eos-voter-0.3.0-mac.zip
19e5c689e51c9eb46037f179ef0d93e99b5c02d20d0d8b96171f13082b17253a2a6c53ad759d55807e8546e18f1fe90ace6b84d7ee98e157ccf5e858c1210f4d *eos-voter-0.3.0-mac.zip

shasum -b -a 512 win-eos-voter-0.3.0.exe
ca143a59ceee7b656254a4ee1c0bb3834ab54fd633a87dc3a4d742a3bec56ce0a0ba4ed4384e2c8571d36075acda6ef4cdf47df4e490efe798b8a95345aa1bd8 *win-eos-voter-0.3.0.exe

shasum -b -a 512 mac-eos-voter-0.3.0.dmg
63a962436a6ad63cc7a054d9ca0efa2c0d5c355f5f7b83161d10d1129be234407f46e7a96bcd8bfd107a8b7b05ccb8f0e95457ac38e3b6060985868d4457fdb7 *mac-eos-voter-0.3.0.dmg
```
