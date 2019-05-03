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

当前版本 0.7.8 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
ca6f4fbfaf64b38d85144178e2532c5909f4363ec7074a8b9afff7a15cfe146cbda540e8505055cedaf597bb0e308ff8aee9ec87d24cd381b3c116d4b175319a *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
0a5c4ee4bad59db02f13b4c1d0d147cb2cc8bd2eb83cf0786ac138b807b7b4edc212fd63d08cc54e3a555202fa4646da3cb1c03cf3c9b297199b8362d20a7eb1 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
2144970bbc0cf92728659c797e6a99708c566834f88c810131b04d11a4ef152d3e1a997f00e4ff22a27b02b1f701d96d6058bd1dc9977cdfc2c6a636273aacac *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
fe7344ec93a7e769ce9f89ea96eacc4bea40a32614588cddc21405993307d548919289ddf14a8c1431c276604d84b3a85c2eb98c28f98e1d92bca1b4584e1f6a *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
a1a1756069998822c8f566e420754f1922d81b7223d2e81962de0f1188e1ecb54d0bb4e22ff2574322e26a0338dd2027e2e4106b777687cf33332321032f7d4d *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
5dfb2de40fc5e4ba0d41bc772643457a26b99259e1e2eb60b473882efb17cabcd93efa7f464c8f5ffef3e733aa9cd9b8b0d87ad9ae92ff4b098f797557d58586 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
d4c8f18a5483dcd434b04e8f80f29a0958cc1ed333282c02762a34ba6016ad51fef66a0580ee0203b23d8221588e36d8656c25d2c07a8c112fc492f7b9bfb0db *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcy6fzAAoJECyLxnO05hN9GTwP/3fOe+7jlltTLm6nWqmVTmsV
UaC/Wr6tEuyBR3bJloaTHAl7MghNYfoXEjmZSCO8KPzKYcXNTxSOBFeWQrltIupd
myijc+AGHf91h75dZ7KRg9ts9rFpQTF35Vu/F2eEEk2mIeKrP0f7V2GjAfD79eJJ
0x6OIjwgYvNoOp48ZxPcXpozhYgEnXD2fagIvaM0qOVuIautay/Mig8RYPdFrs9+
AtSrHbcxv/ILSf2UZnjgRfjgtF/5IwC9NMbYsrk+DS1x5nmdmfomOeRk70GyaCcS
FwovKDmA22uxooBYSKhBqwSfIoIty/etaS8rMzH/04A7/gHxk/7vOoPgX9FEVb7Q
WvN4893zubqagHLZUXuB4ExXqwfudLw6FlH49eB3gFXLIPIF88zwRqbfYXTCcyVF
z/nyhs2v4SxRTuTUbTMwE+N+W3tHClhHD46Mg7PMsVqB92qHq7Csgz2VGJJf4Fix
7qH/HvFeqFmSTNaTPR+ahBU637a4dxrSyzLOYgW7QAkVSrNlX2SE7dCshq2GWvOx
p6wiiLI8Ks2I1SmPOWXaXLNQZngjoKdPrar2Isu+WoSUorEq8VuoqDAKOI5v7MiD
vLfewsS/GrCyQaNdMxhA6k0KHlChncUbo50XQ/9IoDW0GvPalY9PSGLWvLznutJW
pjEiVUtm4AH8AbsjSjtx
=o4Wh
-----END PGP SIGNATURE-----
```
