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
feab3703416f6328d809d89e4f62388d407fbaaa975d5103890487d7b11627f901c6878fc7158bac0868d83e6973c90092352c61a834bbb7cd68968191e373e8 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
5e68149c7d1b762bf661ac887a99190d6b9d16731b01a43f4130eb18513a00671557a0796739d0cac2fb42f5749957c4c68d0bb9f700f357ae22fe7aab714d3f *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
b208e4a84dd8657a26460a9cea07d5801a55f45caa1a3b47300cd00d562e0940cb704c69186cf564b099070731e033d2e7d295fa887071e4c63810862e216d2e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
2824c3de0db9cea23b4c02245364c8c9c13e214a5bbb84cb8ac7be3da6cf3839587a9a0114fcda7b84daaccdee0898f8305737c725e8017170a6098c66f2ccda *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
cd16515e50e75513905bab6618f85216f6318ecd697d96771515d88039fa84a80ddbedd55183b69d22abfc56fbc7158e7dfad105ac067c552eaa7a7bed83ae6f *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
29e5721b1400f4895e441ee424490142bc0c5bf6c8629f0a05d649e9d0e5db0254e6fe3ce6a15a341b565a59097c124e7e037564331a5b8b43cf695dc35b229c *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
1d23b03369d6e7980b7fb35a066930e238098303c0fa45df58868aab0bbb9bc0513a84118e7febc5d163d466cedb992f8fe1d015648f1cfde63258123be3e0f7 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFFXEAAoJECyLxnO05hN9EJUP/iOwpyf7yQIbZCNPi2t+YphX
tELmQpGWVCtaBsh8oKnQHd3SmTVIIaJAwY6GgDdHMcOaZcsWySkbJIyB+K+tnkQw
s/S+43Bo5wwGS6vFN5ibpd+dWywpsKTIZxz6HT/Q5+f2VyK+m4fcPF0aSrv0WkVI
kX7VcojR937RCqszJ/uxiiW1PL8GW+JYk7ikkkHoNbVTeyzuJsjK7Kb12W0XSg9U
LFstt69ZVpK7bgGXh8/s3V2wgz2xS4RfHZT2MkUZ8S9zM9AlQK1gAQixHdX2Blvp
UyRmEuLAxZT6uU6L+MZCJQgfNgTnQNtlxgx9NBTsXS/Rnp90jmasulvYdwjFcWqL
CLQ3SfzGjEYHonnUnwIGN4L04sYYLVP3YoJQlDVMT+tIwDHMfSWx5ch/5C4DgSQB
6v//kFeZY1gA9Znrvi7+TApfWroKbSITKoTIRSnU9lRRInq4HA/oDuwPzrbytzGD
hrrh5gi/VJQ5jfhnCjlnAkVCA7fIuqLGc20szlngOIE+PQM/CzN7PWQaxnV0wIk/
nYVFZ/T4tK1gMjmLPTF+4WZbOjAgt6MDrnoUuNwv6bx1LnZiBkPPkSnall9oB1oq
Pnemf79YQjwTwovHq94cZtvJryqnG2REA7a71K+KR05pZW2f5+nVAEecaOZJaSiK
aY9fCRXwjVencsfKq9nN
=CLtH
-----END PGP SIGNATURE-----
```
