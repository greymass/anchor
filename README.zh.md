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

当前版本 0.7.11 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.11/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.11/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
d2b5db8a6d0b4e0963d392c72c400581959766cd5f27fa5032351ae6a95bc487fd30773d361226fdc2dd97e1d39433a54eacad72583d1a125d6b46e03e78ba94 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
3aeea5e196c48f7a7c03669c25f99110cedabfded3df9f97e3318e079ccd216d10f603beb04f840911ddfaacc663d59a47e3539db4edf8616d6bfe4b4b5e83a3 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
a477912c77bb93edefed27a87b58cfa19673d308a68ee649f2e7dab8aa5734644ed51d758908851f0a71e78739547bcab39565136c4893ed150de47a5fab2d47 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
02bba946eb3deb63690387e6233a899c68491e588d7a1b95b62fb6f89210cc39e365bd6d318890363ade85a14f9ed8873dfff42e2d02e29d0fc6e9dcb6e14225 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
5e39d14a25338fc25972f0c89cfc98b4cc682b66fbe48e9888f9158ea2a6bb502de23454d8976014bbc76e26501d7ecfb9ad118e83ae9db75345689a464af7ee *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
ed39a12df4a3fc8ca859371d34ceb86dd7516cb4f2a5290e3e6a2c652ddcacd7a5cd766bbccbea01387d05f46d608f4852c3b784099da063c5cd733f996039fa *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
9e2df61a64b0ce00a13a005da1ce0d6f8526f4ab395465e4898268357be61bab4030875045c4c2b08ba14144500922a55d84cc92f534a0aabbcac2fd9943c9e8 *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdMimDAAoJECyLxnO05hN9PH8P/iKdFecdVwaTwRv/jygRtekg
p38xPNiN5xyQzm6KgW4tg8IHsof2GKD0l0In/IcPiMIm0Zrvqq/StxluJxk06ZJn
b8shvsZD3OHgFtvCVo4ldEisbn5d6G2VqG63nobeg3yofPDeKpR5V/0/9vkhQSos
XOZFhUw958oqU3jkR2dcgDsUZ7gISlu6Cq+jvbFuGuwpaeoKCyxCfA5tY3bUPUsK
C4nPZUl+Xstz4rd5T92R6x1SBTNEUUL6TrPK2R2VhkipMeHwpGALmeGDS2+Nan4D
4AI93h3vNzyutqTXrdm0mJJo3QPQjgnmy6FBew749Ho+km/qEiEwgHtTFNGdSjbz
Ok+J918CJaWpp4Esl/m4Z7BxTR6XlChWVnaurXhxNoeRoIOlLvFGWwg02IlxADBa
Ecz0dJ5cS+AxDHntUQjm0dBh+SSpXYvSdZ0Gx8+ftuS/vBkMc+i+5NDqtYbWGXqD
UG9LfitatUcsrSnsQ4CAdirAmXuZJR3nL3sn3meCRVWNgWi6kNn4voVAFALtjfT0
qkx9se9phO4uXKEbve90/i2UOwXHbLjol80LSkOL8AggzyuQozI+don5JR8cVmxA
F3zGNbc+OMKPoyB9HpFA0PPbG9/L3TBDawdAd6R44cXijWI9sPO07DaVA8dWtZKH
yYi6VxpfyL9HSnMr/4ch
=RUm2
-----END PGP SIGNATURE-----
```
