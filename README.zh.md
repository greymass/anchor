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

当前版本 0.6.4 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
8094d3daed5c7f2e024f5e9ae6113644d7ab3bbba87a8225ae4ee972c8970ae07f40058272371560ca3eafba20d1dcfd70b16a66688a140c28b485d1cfd30a04 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
e9e517c2a729050e8b998aeaf84818e83cbd94eddecac60d68b011a822ed2d8b8b0b83f4fc9ee95cc3c681fd98ca3275e228d3471132619090ae600b4386bfe7 *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
645a3ef146bfab32e185f4e8412bb4e477434d1770b002c8073b859710fc0d21b448f84a641598a8703d58f5cb9c68841c0642d3b11006b7f2dae35c7cdaac06 *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
0dee015c92303065480fa52b4a50c5afd58dc77b930fe2c50693760917efc1c4d7b9f6d288ec04ddd45e21c7c2735458e9093a5e8b40a7f74983b3901b240f4e *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
ba296668f48ec9f9bb53fdee35be856da00068b7b98bcee0d9d3de4fad73f02d1ad42bc306853a724df22ff148c659673db8135bf633d10add61d3a4167810af *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
6991dc61ab435b389a2903533ab635f835618092d9465f45a35ec904b3f4f41f9a1397059400f5a47cb5a0a3ad67075db93f2a105e648472953833abd6403841 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
4b8adf916b271d76ae402f4a10fc72b3653f4dbd4cd345429cdc16b1981d24641897a843c918c6ae7bbd2ad6651676b199e4a0e752d9037c8af97a95184e3f6c *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFE1DAAoJECyLxnO05hN90SsP/RNQl5VS7r/K1ACmURIPXhZ7
or/gKDdxKJyYIsoZBnV9a1flgCqTw8QY67LPiVdUWZcKNdzfsdrZ29CAtyHG8EyS
YWUvJ7UbjGNoQU2OLAk2714CZuFfOdxM47YVVJxhduZL/d49/H5XcmFTidpXqoVW
7I90UAiVkwPZckqmI8h30wIodtPhia0PiGkr9S3ekD7iUuou4Wxcoisxqb3ZpbXV
uuYoUJrFKJKN2ecNrRoF6yDWEudPislfdt5yHe/+6O3ceJf1Q2Wyul9YybH1oS1M
MShkcmmt9weB/lgHnIXPK9rRKyAq6OW24eOt4xB9DQMEy5P2do9BBdj5ba0gCdhR
qMA24V8vJDw0lAOdOEmeApntwOg4uBmmFX1tKLYruoIzj016ej/4uEXQEH3tNGDk
b76MJb0AmAdmQfHJjWK7V8+WGfhxeuDzzodd1270/xP8ahzmPcX3+vVnl7826/5h
MlvjN6VdUWLIVqItHloPErLa61LjkiZ78BPu89CcCzGbC85PuyZcLpcYywdfzS0M
bPXmT7nvV/Qnyav1GZemQFhbTRx/XTuHema3L45Sls6kJRTeoiOgIZfBjiCpTez8
sYycJ63TEvPlsJdusDU9uffokrV3fafWK9xiB7EoFjzt1Z0TUNCzkbRZVy1mw1tP
zJjiN3L8ZwFMyNgc1JwJ
=ht2L
-----END PGP SIGNATURE-----
```
