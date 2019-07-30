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
3543bfce0ac2e452ac82be539da1ea35ffecb5cd2802135362570f44a38fa46290fc42d5f80546024d3df0edef1bc90e90c6031452c2c102aa153933d6684de9 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
1d70270a7f37f2e4caaa3fb2b5df761091dd6c711cb23aefe87965ec790b1cbdc46bc3079548d862e803e3e0e5887da69653b98959c3112aeee9fd4152f3d874 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
2e6f10ac7ba5b5c43d1f16935e62d34c922cdd48f4f31e6bb1d697e2e35cc3473b4e083e4bdcac34273b81aaf7255ec4acc2bb42f9c0cc3dca8b9bf516cc2f74 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
6fb76795a66231a8809acbad2709edf94789e7a0cf36a2fa3a9defc472c7f4d70ec4bb0d9e458d8330fa384b5c15d64c454cb429cf24de9a679dfd89febbf634 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
fc814169319bfdf91b52e2f5ac18115431734552f8c18dbf8f43367113641946b6670dcb7805c1cfd9c37604af5adc0013e4634732d6abc450819e0f7b26dc3b *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
eb6e193ce91e4e1992059067f985595d7ff4da2a50e8c25a1e1cbc3302937fbfcfd7e2b3117f776b690a9247f0392e4035e7f9c78e2c678497e0f308c6154309 *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
97edf7aaac9a0265f8ae21d70ce021294ac427342353bb306f1b87cb19b10c1f8dbb50a1b51807587ae4c40dc92fbe06f70053343b93d54b2ec2675569dfef9e *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdQNYzAAoJECyLxnO05hN92H0P/315x1SHKABthYnHbDj70pqe
rkkHFNSfGD0kiAkeAqCh8gPxCcMnP1xqMlM4cMnY2OHwOt0jjmQxcixcIrWZdhmA
7wKTvLa/A2OfinRQ/+EX6K79iSTjbLYYDeuS9ko4eQNLcPFJ+gnEx0bjQZKaVtzs
A8ULSWXpWqOZ4mR9ZH8BkY9RO4zhFEZUzp4kmGGeJmDWKbRq5pGuH7713XKwewAY
ZuClxF5slcRcLvKx2H/IJgfYU4sPK8YhlPX3Kkr3spKJs3pctNyBUxsadmjKZ/1C
gXWKpjIbFOQTcoetYccdJe5fT7vdKZv7Fv7SszCRLAUEMyZxcTW7f6nj46hIKsIs
PWgWegdO6JCN09KC1zfslTv6UpJI6uSb42CPq49EcL1FKsJ2X2B4sA4GLmwmsQSx
DtEaZcOvnC46rCuuhEZx7EXRPcixdIuuJosqv6qn2KKSqU2e9oyLfcPKy0nQ7H+p
DBp+1kbEp5bd/QxSdaGE1ohOH2Tf1JNP+fWSXOiRh5987IC9xFOtl53hv+P/nTlP
KdUo5l2UsjR4qv1TrFUg1s/MeMk+36ZSMkN9zqIG/nyMn2/EwGftqb3xqflm0lu6
fcgm44kM1bx00DdRAseR+Wa8aZ5SR7ALKewvQU6+3br9hWS5lkv9vdpzdA7oWXHl
fcHjrk15VeLqUpVLiFM1
=7eTt
-----END PGP SIGNATURE-----
```
