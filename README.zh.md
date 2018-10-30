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

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
e55fc9fb53d0e8bd25f4e972a5fd8563086af50b6d6386b6597e9fbf39bfa7704d43f1778f236fe5e56b548eb7ce8a01ebd16884e787d68661475057636ec55e *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
02ba35cd83b00d13f3417c2ec7e4de1beae4f12f86cf156131683a067faa44b54c859e76f8aa6d57c245fc1d21437e347c1e1be077d2a319329967a67db23b30 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
bfe806be8914feee01c319d107249f02f755e93b5ae270ed32ef25ae69d48bfb04379d65329ac5209baf2ff082c98c17de668d7f735826fdd6177550d50b4431 *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
fe3ee24882e1ceb68e44536785d6d2cf1b2290a20bf1d721ffa3e36de46e7bae89de43e3bc29b2762b81abc1d1a0b68d0f494d6532305aa9433aebbadfaddba9 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
7feffaeb0b6c1439b6be3a3ca6589eecf318cde40d1ac6bf16dbaefa52ef3b45b3a46ed1f5e0274922c119e32915855b533f85a71ca03474a826030269a44108 *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
8a73895f0709880de8b9b61693a28ed9813978001b6be7a63e599f52c091003f5bda7c7c69191270e4f25c2ec4b3d2cc22d49b777d206353bd4095b505b32bb6 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
272104b0bd785137c399426dae6d3a555501f7fdcd2625114522d1230346639467e6ca803207f7af976a32a4d66277d202528eb1329a31a877b1dc79dac45eda *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
1f8a6d4c294b29a291427a71939e6d31ee5474927f644776a008af806e1a2221c98ca97fba924a6b6c6d1bdc9290a56011a6cc00ea23d9c8ff5557319bd67584 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
83cbbd44bd5bc54f41b12b2ac2948fdbf21d0932cb4e845e6d3ff5adc02fb1e039763b3a3a08e9cdf556c8e234af492bc9178897699b6012017200c798fc2e98 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovsMAAoJECyLxnO05hN9BVwP/AxPWZjzf6cMz+ryLAf7G98A
9kTnXYmI0I41+hrFaS+icPQokrAPadVLixq4vlzVV9/I4NDYM5AJr1rpx6ERGg2E
eBUMhXu49WXdSjjocfWSqCBO86ZABUai++J4Lv/AKe58xTvyoId5MxyI7azmKY7A
RT7myUCSGRqIX50bpkMa+1DbfZ8TpnymUnOqqpRjVi15RJ8DQUpDGQEK/Et2MIse
8VlqYJ3A3cbZvyaZEQBMa8EhA09AzFopFSCu2CBuTLx3/eGUtkW8/r9eenWWiZUb
/H+ktu1A95ejBENVFwTIHoOCEdgyh7Ipy0PqZqJegAfbPAO0wLda+0F4eePUqm6/
5PE72dy92zh5DPzVpTgEvfcbJIG+V0SLtlWnchaob2nA4TSaJMWMKuA55aM5OVAy
YBEePBzZzn8MDQ7G2aig7lUweE48aJk/h+y90yW0eA58XEhwrhXzsE1+QHY6pnSz
Da2Zt2eD1paB87Sj0o86vmVFdT1FJHMdsIP62S2TEkNT0QyIMOVPR3AO/51dUi2h
nohLutKJqIHWo1klLRWQ7ywfU5uA4OZT27iuTvXNs5s9fh1aN2nZ8/pwI7kTxFt0
8d9YMayUcjspE5BXdLKBu1eMmOHqiyF76yRtvoezXwv8EuSN15S0tMEv78LDR4N8
Nje+JUP0wUL0+9Vnm27v
=HGmk
-----END PGP SIGNATURE-----
```
