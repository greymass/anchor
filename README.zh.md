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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
834f1409690c338191f9c8a6a2bcee8291d81977897e7e62e9614deaf5642cf44b640ded97b811f61c18e535563e1e5acb69e4de2fe8fe6bbc855467e5f0fd2b *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
c7c6ebcedbda30de98f19ad3cfe5f956a58cefc091a1d9c2d0d5109f913f75f33707a62803e33f9a7630dca2c6b01e1910318a04ad052ea8a55b7dd95277fdad *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
5f7b9fe7bc918f6d244e80610a87d20e40784578c0d5fb82ef782181b5c50d48eb027551874948047362cae89ed8fb6107139f4b9434ec3f7fe39103fe0484c8 *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7ef5a3c6eefbbc0700dfce13f3914010c517d9f6891e94532a97088dc4edfe34ed995339c65d9dfed97299639fef0eefde27e924d9a43832d32a6745f289d042 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
7f587daef9e984ff8f03e3c9d50e570c6d40dfd239d5e3be817607b0658a72cbb219fca07afad8a103b885ccd7259124aada5e0de1ccfacb03e704a0aeb4227d *linux-eos-voter-0.6.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
b08d32b1663f1a2caace8346bcaaf36e51e22fa5c3d181788e899685c815491681bc82cf7173308729a9f24e2ad154ef250d51b2caa629a0405a58c6a4a8daf6 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
cccad2fd292cfe75df904b7fab34d34583686c41de5f2b362d6895547903138bc94c9016fc1c95781eecd0f93217562c282f0e054838c9807367249f6032c79a *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
9fdc0fdbb27273b6248825ae1afd03869f2960ea4287c2619aec9504f8da1faeebd8cabc6a0117697b3a13492f9e08ce2f224be23c3580800d3b12b26adb992e *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
39b19425059abdf24446d5e6c22b7b095d2fddad2c121c028190a71a283ff741d1c1d4f802c9397466fdbdaab4a6a726694af1e8b6b8c3ce401dd7f6134152fc *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb24KnAAoJECyLxnO05hN9zGIP/RTQX8liCmMpV7roUVkJREVL
Ghw19r9CwPuhq1T0MXK/l+GjstM3nxSJKh1CPOty6Rc+LBt/HEEDhYsXVCQQCOZv
6Crnh0xHcJoaz6e2QQ5U4yex2gA2hTb0Hi0pxC190UtXfFWBA/oa2TqSx1q4MGaF
8KYF7mLxnAa3oQJn9NRzbWoVR1xbz9kEByg0GeUoOAoXZ9ALoB7ifH6+oVimfGzR
yVhbl3AhZB/4UcatJQJ/vXrstO4WoHWH30JeAcmyzejCvHMCP82/vNjNSP6/Bo7W
BbvDsl6yo+Drd7XIXlrk/nmzn1tm8c/ycPLXZpHPdK7KLoyUDa0NZVK8E/xKD+Mg
reeghorqaRwXz50ViU4Mv4HPuHAWYCvG91iVEjdBoqsMVLnrNsWPGj7JOsR6Ezv9
zuLADBh7p2FVePhYX7ILS9gJh97XJCVSAbdx5J9TxzftUS01YkSFm12Mf8cosgtt
sV6LQDXBjtnqBdY07Kl9Dt5uPzLyxKbukV0tQeJgE+a8EYUoqwVbmQcTjPm+HLnt
gdnbQ7iOX230C5/th0lRMS9nOyb7/7rtwCQsxlRLrZyxo5jCtZqwAUGTZQxkFwcV
0Gzx7DFMvqpaXvin4mRv7rJbSVlNkX/Kuw7tnxNXzSfjdFOfw0QxLttRKwrsR51i
19c5zb8CG+OEXb0MiEks
=poWJ
-----END PGP SIGNATURE-----
```
