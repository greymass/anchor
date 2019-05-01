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

当前版本 0.7.7 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.7/win-eos-voter-0.7.7.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.7/mac-eos-voter-0.7.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.7/linux-eos-voter-0.7.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.7/linux-eos-voter-0.7.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.7-amd64.deb
426381e0251a0218d3f07fbaedf6204cd2724e739a2350b811da9e20a75fe8786f65fbb51c0596100faebe1d102d0645316484c4ab18e64b81cf3128c26e9297 *linux-eos-voter-0.7.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.7-arm64.deb
2bf5a90300ebbdc9335282296af90e39e827a8e59d8d509a25272ec5f02e4bfeb151bc76c575ba2a5ddd176ec1c47d8c23211711e335ee9c445758f49669ef39 *linux-eos-voter-0.7.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.7-armv7l.deb
825b71330c2f49da0b1e20be3e62182decab805cb7c48455a16c4ae16b6e075b787cc22a2b2bea43b0a74d2eea0c42c0b95352bcab07ebde65c84a012fc1c643 *linux-eos-voter-0.7.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.7-x86_64.AppImage
e3c0a549204b988e16443c9b04c7e86029c7640091e8c1e9c6e70f6780ce6fb3d436731bcee505831231bd691462de7dfc10d4098e94cd9d3b3dc2b572ac0ad6 *linux-eos-voter-0.7.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.7.dmg
ffbd403ed41efbdd4d9c76d40d620594522c69723e0731bce14a1facdd13742c708bd3524ee7c121961dcf37ff28ea45372283b4a9ac7a910466ac9af8597570 *mac-eos-voter-0.7.7.dmg
shasum -b -a 512 mac-eos-voter-0.7.7.zip
560924b5097411b81742f4b840a5f6f0873ec55bdab820695e4afec6d7dfc4a1fe84d08c1664edc43e47302f6a082f608079978618c65ba334936ed5130f86ba *mac-eos-voter-0.7.7.zip
shasum -b -a 512 win-eos-voter-0.7.7.exe
59c1d612b5a8518659c28fd155ee1e8b7420929c0fc55d64f7e2eec4d9cf17d30af0d0560cb788c6853f48ea88333626286e0a08e11cc5b4383dc4f61b52f83a *win-eos-voter-0.7.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcp9AgAAoJECyLxnO05hN9HsgP/2Ct8rrz21xoBLSSZzisLmUS
SFsuzQGSXMi53izfUWCL/6Ruj/U2Ptm6ShNz49eyxej+UQGlOEZIcomhAocGvH8q
f59xkuFnHWJU1BVBLYUDWF9BQG/wt58VAqC75UnYsm6GI/ksthVJ+2b7PyWTdVyP
3mcwouy5JlEuKVuBN4S/doDoT58vSQAY27fx0E1O7VdVFeZp0VV4Wg8IgBrD4bbx
5Xvt6j4d72IpJRp5p3Jj+EVLvGz3rzAjJWv7aAzCnSHrLaCeR3Chq1/sgkrNQYw7
GSfG8IbitqxM8I7mGO9xkLCPn7/EdoQHXsbHJj+PEtKTlKMHfyKpyFPxlygz+JU0
6Ikqxr7VfpbSh/pBJXxizfnHAHNxEiBB1Nytl17gbjZfjCTfPIvDgAFiDJTvEbqm
uZL/YBAn8rUfOCD72MdDK9aYODR2elS+J8iDl238v/1b7FIxd/bwarWCB0bCdUfT
Nq86nhjo2ROaATdnr4TZZaFeF2KnJ9J9hSbThv0XKZqFBP4rjracSvj5aiL/3AwP
9JwUNfJKvF3ardAP+q1k9fJUhbh4DjpXqUf60Q8k++XzSxxYkpI+gUyhkKWGPQsp
aPjB1n+34N3KVbnA/a5JuQgGftxuQJ27leAHLaPxLaReIUNn6jHmn9wTTWkINWRq
zWN8uuctBk5y6egCWkwQ
=pFla
-----END PGP SIGNATURE-----
```
