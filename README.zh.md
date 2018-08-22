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
59cab9caed4ccbfac9b4cdb943e464c710e4012e0e6132a74a1c537bbe581e9d383183bf02aef026834753067a48ce04fb0341175fe2ffeaf67d0be9eac0b481 *linux-eos-voter-0.5.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-amd64.snap
3b58c7eea6bbce47a437c15d8694c65937cbf3bf13b16d674d64eedd8e74d0e02e7d2e5f52094cbff93e97da1be53599104ce7c12cc81d0f2e93cc2411598e0e *linux-eos-voter-0.5.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.1-arm64.deb
deaeef2212769808d486cea2cda6a2453be8e0b422a7779c83a74106a3362b5912fc01be44df07f5a74da0023c304eeace188592f4dfdd38f8f7d980b55516bf *linux-eos-voter-0.5.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-armv7l.deb
555ef8da0202e508665c95be300b723e2e5e0678d3e6e2a32336e6d80665341a618c30688a40db6bf1eabc7496f0b10780ff4b16888736520c5755a4556bf2d7 *linux-eos-voter-0.5.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.1-i386.deb
e3e3d38bc4f8b98484d412f4bcb22fd3e453f50ec79e85a33005295d7891ecfc4db06c81054ddc6843a399bec727917808629e42acd3277fe2ce835d0a880bc4 *linux-eos-voter-0.5.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.1-x86_64.AppImage
e3412b0016b7e90f4a8293b0068788fe656edb652202bce0c150d9e658c8c77f182585bdbd10b995d31c495d818c65ab7140230c1766db44f688d25013f6e50c *linux-eos-voter-0.5.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.1.dmg
8207d0197a3890707e3e545e105314e26b809d741ad60fced73f23e69f30b0548adc1a5ac8cc1c6b65d5d1f93e812dd2f9b8be40495c4c7df788a2d36050e838 *mac-eos-voter-0.5.1.dmg
shasum -b -a 512 mac-eos-voter-0.5.1.zip
e71c5e0d2312ea8b8ed175b26f43410f171742b2a7060fcaf5478dd9cda861cd1d67d06600b266c517b11118a5bbcaaa8ce470bb2d6bfbe118c0836ef88506e2 *mac-eos-voter-0.5.1.zip
shasum -b -a 512 win-eos-voter-0.5.1.exe
3a41ffd33e4acf94ea391c0ab3006c928eb2840b5c2187d8eb703bd66ae6c782fe39abeccb959638a7c7ea895e13f5c7277bab85cbf574b54249488694c571e5 *win-eos-voter-0.5.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbdhs1AAoJECyLxnO05hN9PQgP/1U0pJl8Z3JqokIHL2qeyt23
9a+bXHl9lwXlqyCdLfN3AMJay5+k1VmMeENG9mqcrTIZ/cS7bVDUMzL/B1nuV0NL
ioAeMCD59CYO/lUenY+ap0W72VDr5nZ+DotxBm1q9NMROh7FZNzRTMlD2s6VUQr3
iYs1K54l/3frK20xHVtnjv791xSPoVxoDTc6tlm4Nph7KRr1PD6Lwsc79yh8lTHm
u5G4xEYkyJp5i2yaFU6XOi51hP8rb0AskL2/KtSZWXIlKf+D6r/3Y5l3y6O2y3F4
rCO0k27IrkjNfo8AxLRVYtRJHhv6RjN5eiJucll2EadAnAiTrlTxcMVqqM6OUv3G
bczcXJwYiBx6Cc87WdQEBDA17zKklWEmtM+8OtqE81BjZbHSiOjqm5LCJduc/Xmy
inCL1iry8NsJ0XeoxVE3Wpfne7319Ujc6BebxmQQrx/4xXQIcaLjOil7eDC3c4PI
u/1Rdy41WpPrmitJffce8b6jAK+eC4g5SC3Jbb69Mz5CMFz11g0tj/ItqvNTumTF
p5Yereg772hWAte+DRQxpmL3K48MaoCO+5/TjC4D4rb6oMZgtsNnqRs3cIBetbVg
25RglmbZj3lH+p2kWZPRtId/x1Ch3VAt7vrQvU1eFuLf2WqNtAZfoAyCHTnkM2b8
5C5cKNJi2ktMY+iUdmOs
=mEQD
-----END PGP SIGNATURE-----
```
