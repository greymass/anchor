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

当前版本 0.7.2 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.2/win-eos-voter-0.7.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.2/mac-eos-voter-0.7.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.2-amd64.deb
15861e901a0165256c6c5465f00a50c86f098d0d62b54b6e71d681cea61fb9c3f1823acc534761f330d0b63592af2a900c5f541301e6fe52a407219bffde6e4f *linux-eos-voter-0.7.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-arm64.deb
180aacf9a3d14149e845be2c757b08ac4aabebe20146e0795afb57b996f16da53cd147c5780e3569b67190b7daf9b5d28070c039f89220ab17178d6cbe7123f1 *linux-eos-voter-0.7.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-armv7l.deb
98eca71ffec54a25482ff761735bb459c7c86937922080c3cb3da211b22f21a3ede3bfc5cdbbc3c311c57a5e4e42d2a7fa47dc63a95e4f66022a9b78484fdb92 *linux-eos-voter-0.7.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.2-x86_64.AppImage
95a869d47d0f9da9fc6c38a865023b8f390e9b2dd0b845196ad07d2d393f97b3cc2aeee84e837fe5a8114a5bc48b580768dc0d2a00b6f6773c04290660f0e939 *linux-eos-voter-0.7.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.2.dmg
4a15a343d1c48e967ef885ed132698adce416648138ab02a697d97c15ea242d652280d0c7d9605ff0c8da62a9878dac6b2b11cd61b04e26642a6560c42c83017 *mac-eos-voter-0.7.2.dmg
shasum -b -a 512 mac-eos-voter-0.7.2.zip
fc39b8bc81300010f724f492def4b662fa4b19a53835eb54ae794d87e5243b8b29e8419617809744e537c3cd350e71e978e27c9bf6afc6a56739f6169b68cbe2 *mac-eos-voter-0.7.2.zip
shasum -b -a 512 win-eos-voter-0.7.2.exe
a51861b9c346c8b27f7d1ff30b19713bcb1e03e839c013c76bf4e2c16d4c0ef96f377a848f0fb896f5f34b9ceee4ca3f5011628b2880a8a6f0e29a2e609edc45 *win-eos-voter-0.7.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcPRQqAAoJECyLxnO05hN939EP/jApAWSxQ4uU8itZYzp7AcoZ
47Rxy/PSexOX+xYSzI88yiKBtbja8nL4zeDMg20mHNzg/oPTpci6BGqrHC8EP6kj
NC6L5/JZ8fO+27J+6/gsjYyFboRFjeklj1lHCjAtZkDp5oRLQNamUoNgWEV63eDM
8UfERE1Lax+tqPCkSxqXY5QENY+SgKox19JYSoBkR7pDC35du9Dn7t/CTQnYItwa
4c2pC5WLI+17WPfUmhn7kopcp7vmpSqy7gCgiHEAa2k3rOwuE9UXoM+EXiNNNNx+
vY0k4+r8KVmnhKlWxHVAysS0UYRe0bo7WcveIhT8nJ0ltyFZsdwboWDdnxJm85Rd
cdlOIxpHY+awXYQEM/sX21nhAckg3v6KDsfkDJlIzjYuAL5qjxrEZ1OsRtROjCA3
Lksy63RAcuzVeJQYg6RrDcHfx2X/JzNEbon1yp1n7DYt5FljC7qfYz4rgi/Jfjbb
/W04y4zt4rZ2e1qd1CARYfc3A/mkK4iiUf5xbR3p5HuY00mm335FLSo/JAoAyODf
OtyORVfRhkA/VZtSSDfbkFFa+lycs57eUoHXu9QReVxTZPQ0j++o1PT4CFx0Jote
TUkHxD8y9+z/QBra5iTnqozv83bGh3+HK3RFysRv0EE9Q1blQg2PZ04Q4JFBTi46
MsudY7AswJPMk7QFO4LM
=UzbA
-----END PGP SIGNATURE-----
```
