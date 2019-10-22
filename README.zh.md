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

当前版本 0.7.12 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.12-amd64.deb
db3e39af4aa36711c5c0af4b5e63d5eaad091ca65da5540b40302d29b2a220a47234459557610706c8f4ec6eabec92bb5cd0beda51986bdbfad3d3b74c10009e *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
3ee2ca8f7e5cfc59cd40da84ec55e72732ee147cef35225a5f2d4e7047c3c71d38d7792e45b6423727cc7dc5769ee2bfa7f56e13323678b10641a2c27c780b70 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
ced69a3c32905299849c1b6ff68b282ccfd1d89659bb33f67fb7c16c30ef2af314a865da1f35d2e7c4f6a3e53ad9e6401c61a7225002515e797972b1f93ab190 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
19e03748b6d5e9d42ceddf60855727b37941bcf807d040c5705421ad5e9e11d80118fe5458107ea8316a4f1bd4b44ecca314bf47c3b18bdfb5cc0fc2a241a1a3 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
036f4217729acf50a4065698d5972dff92063653ea969a2c31320fe585ba308aaa7f1ca2143cbae415cea0f0f343d26f20fa5edc5ef9c14a8e1aa02208655461 *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
752debf045e6c0105e80fcf02f1b3218d3c44af4accc4cbd9d24f68937253ecd90161e8be497aa2ff16edaf051230d6fc4ac4df4d3c7b1f2f1c2260b62523275 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
bb36acad70b528d28ad096a53bd41b83cf6963dbc8578dcdc3b3929ae2ca9392003bca1fba46d0bcdca975744a1febdd6edd78cc5d6a9a675466a92ca2b700aa *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdteGYAAoJECyLxnO05hN998wQAJ58csR7u39piEpumRLiX9/Q
pGJ6Kmbq1SrmxvXsDOAUPJT53KWNSuTll526Joq/a/TlR7NEx/fxvVi+cOGnNCmj
HdxLNoaExeY5HCDV1/hc5x+3P0VDF5wIfrN2YHh+de0yNXmr7cr0lgoJlR19dzf2
LzlKd1+8DcLc5JyZ14+Fv7WKeFvWwEZNY4KtRNrEXhqv7wX9b1snKVy5AqxGEHoT
1bVdt8uiiwvDVlTTKEDkc6lDNkaY+V3C41CtQliSqjzbJmfJYbGDuh4xGo+kf2l4
OBSq38jfF23wSzP1JEzipPZHKsxlm0rA3RuXYLWOO9UP1AMR1esUGiQ7Q8+iBebK
SYsju5AYfgpyrgC7C0fop/IZsp0N7sr5Mp+OdjHrkOy6TNNDtVRdj9b2yQuKu6ds
UQe7MpLY/n/PRt2b05xMiIDNOe+Juf4vvWuARXGYec8nm7VI0v/Rf7F+BF0XNvgI
bI0wnlp8YPbkeCRvRv+IbzqhL/sYLBMay2j7C2czxxXnSlWcis3cSUDfFF4obw/g
SRxBag6/Yr0kXYN8vkwpjbkZXBqdL8fVC2RW9RZ1CXzCxyRyyQR/BAJg5xUIKuCz
b+RBC1Lbp0AsfN+NnnEl+QZNnnipz+S6yJFNjE5c1q/rbJSEE/jeUfJhstc80jpk
r41s5ya+FBzxIX3SLUsp
=vZcm
-----END PGP SIGNATURE-----
```
