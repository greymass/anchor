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

当前版本 0.6.2 可供下载:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
16a74ba15c579eb7861e95f8cc7bc62156ffb767f078a25a0b1b81482e99123948d38ced23060166800696365df96ebb53fbdb8ff56d6680f49089a9ae2ac019 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
4aa5af457d9a51b110b623c1ba1cc8338048f734c8122793973f342c0ef90a9172415eb81ff4aa7aee63459f77387007ba0d546e8700d62457dcad57c77ee85e *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
4304df7cb0282158dab2a364a6b6b944d45259d926238e812f1fb5de605f818304d4c98619973fb0e7c61c9e903dcf07a2bc071e5f7780f2ee40ba7123f7b874 *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
242ca936dc0da02a3f21f1b9f7febe3a86c2b6c4920ee93f0efae618bd55ea6c3d96de07339d0fa3ac2bcb6e9ce28475fe50667cdb16187f77691bad7c198302 *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
3dd5110f1348c18767fab178de5cf72649ceaed2d08657fc0905d85578d754e57f413f6a9dd608a05fb402c9e8ac02e9e5b9d3ccb41b0ab37bbcb791d8e5040e *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
a65e5526ae31eac5dda47d3aae1881fcc6686c79a2b76690de1e8561731252f249f6de1020fcaef46a307e1984cc2634e7aeadcb21cc65954b2f8ab0103e84dc *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
29e20ac9ced730f3cac14e2235a7fd86a43c8d311d601e1a3b50692c8d6dc3e4ef74471c4e43b56146a79caa0743df110cd2bdf8bc20a0cc17b22d84e9c457ad *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb42bwAAoJECyLxnO05hN91VkP/RKYjXbWebd2dPpBibtyHmUo
hS67shdhW8F8r5bxM0CFABLECBFK0K9ybMNCoZyn+BTMSFVtD89LE+ESNriGJ7/m
Zuldc+BF0c4kt0ZaTKOXASwM7wZQDxFaYL2zYrOgvYf03zf3HuvhTJ2/E0hx7t/q
2Iw/mdtkCKsBq3HJg4lAWBlUCaRGW5ssThls/GS0t5hCGzKsHIrEnEJupVQfZfuw
XdC/skQgLriBJaxNSh+XAfJtlHZ6es2r0q7odcwwGJKN+tWIx4JOLb+j5dsEGeH0
YqcKAOENHBxUSCOPSDbKZyKJiHhm2ZdenszFcN9mSGpOLI7TVAcXAIf9JnZl0XUU
vWRH+Wv1LL1zbb87kTtLYxu6ZebVud1p4NKLsX69zoUiRhhIW+cRtNTgd1wCeUnk
brXqB69yJ4VudpDtQp4/94/1XJdKRLSMOKlMsJDUSTg5r/yP9jKIaiY5JTCUlOF3
BII3UlXlpo+74j44lIGojYXqq48aSonL0lhjL2/vQlt5LZFSG4VLifGX6FFXks5J
+/EjgQI954Kxp/ylt9ThpwMFh0lcSJp99UAU52HEclEnKrVrCOWwLQP/syz59Qp9
ISY8yY6VMnaKMZU6wmev8SX1+SlXypSnbpYVMMZczAkqeeOcBaLQ30jx1NGhGDCk
uPz9iMMmX+MCoRNL0HI3
=Rw8R
-----END PGP SIGNATURE-----
```
