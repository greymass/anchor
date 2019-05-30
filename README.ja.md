[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md)

# eos-voter - EOSブロックプロデューサ投票 & ウォレット

`eos-voter`はEOSブロックチェーン用に設計されたライトウォレットの機能限定リリースです。このアプリケーションはEOSのリモートAPIエンドポイントに接続し、プロデューサ投票の操作と、いくつかの基本的なウォレットコマンドを実行できます。

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### 機能

- **ブロックプロデューサ投票**: 支持するブロックプロデューサを選択し、票を投じます。ブロックプロデューサ投票UIは検索ツールではないことに注意して下さい。これは安全に投票するためのシンプルなインターフェースです。
- **トークン転送**: 残高を保有するEOSまたはその他のトークンを他のユーザーや取引所に転送します。
- **CPU/帯域ステーキング**: 帯域またはCPUにEOSをステークします。これはブロックプロデューサ投票にウェイトを加えるとともに、ネットワーク上でリソースの使用権を与えます。
- **ローカルウォレット**: インポートした秘密鍵にパスワードを設定してローカルウォレットを作成します。キーはこのパスワードを使用してローカルで暗号化されます。このパスワードはウォレットのロックを解除するたびに必要となります。
- **一時使用**: アプリケーションにキーを保存したくない場合は、パスワードを設定しないで下さい。アプリケーションを終了すると、キーは消去されます。

## eos-voterの入手

### リリース

現在の 0.7.9 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.9/win-eos-voter-0.7.9.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.9/mac-eos-voter-0.7.9.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.9/linux-eos-voter-0.7.9-amd64.snap)

最新のリリースはこのリポジトリのリリースページでいつでも利用可能です:

[https://github.com/greymass/eos-voter/releases](https://github.com/greymass/eos-voter/releases)

どのファイルが必要かを決めるには、...

- **MacOSユーザーの場合**: DMG (`eos-voter-***.dmg`) またはZIP (`eos-voter-***-mac.zip`) ファイルをダウンロード。
- **Windowsユーザーの場合**: EXE (`eos-voter-***.exe`) ファイルをダウンロード。
- **Linuxユーザーの場合**: SNAP (`eos-voter-***-_amd64.snap`) またはDEB (`eos-voter-***-_amd64.deb`) ファイルをダウンロード。

### セキュリティ: 秘密鍵

`eos-voter`を使用するとき、すべてのトランザクションはアプリケーション内で署名され、秘密鍵は絶対に送信されません。ローカルウォレットのパスワードを指定した場合、アプリケーションは将来の使用のために秘密鍵を保存してAES-256で暗号化します。現在のパスワード/キー暗号化のスキームは[ここで確認することができます](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86)。

### エンドポイント

このアプリケーションを使用するために、このリポジトリ内でノードのリストを公開しています:

[https://github.com/greymass/eos-voter/blob/master/nodes.md](https://github.com/greymass/eos-voter/blob/master/nodes.md)

このリストは時間とともに更新され、アプリケーションの初期画面から参照することができます。

### 自分でビルドする方法

アプリケーションを自身でビルドしたい場合は、nodejs/npm/yarnが既にローカルにインストールされていることを確認してください。

**注**: Windows開発環境でこのElectronアプリケーションを構成する場合は、追加の手順が必要です。

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
cd app
npm install
cd ..
```

次に、いずれかを実行してください:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

プロジェクトのルートフォルダ内の`releases`にビルドしたファイルがあります。

### 開発者モードで実行

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
npm run dev
```

### クレジット

このアプリケーションの開発は、ステークホルダーがEOSのガバナンスに参加できるようにするために、[Greymass](https://greymass.com)チームが主導しています。

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.7.9-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.9-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.9-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.9-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.9-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.9-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.9-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.9.dmg
fb8c673a7a26b4b1c6dc8033409598d0e7e5128cf00948cf298e1aeb67d7e97e48aff8f1825c01c1c8e5c6d20dab9a0d093341ef0f197d6558b244e73247c14c *mac-eos-voter-0.7.9.dmg
shasum -b -a 512 mac-eos-voter-0.7.9.zip
a34872cd499df42640204cef7e34488b5459d5c8cf4cc6fa6f3c3dbdb5f3cb374a490c8f5e54bbda01da83f644f7b328998e15eb6d6e4f8c2fed1c651ad6626e *mac-eos-voter-0.7.9.zip
shasum -b -a 512 win-eos-voter-0.7.9.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.9.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8Cg8AAoJECyLxnO05hN9DRAP/ibL7YK4Jg668xUW8yvgK52u
x8OqPjJZeF7qZA27+nBXMk6wSyoeoGtfn0y6PFMD2toaE/omkyj8uX9jjkAIgVhN
Mq9vDNj/eY9dbvXs01GOlKha+l1Q6Jf6NrR9CJ/pEghM/QEpAFC0Xui1OSvvTj1r
HtYm1LVxfhEMKJavTbUBK20EqINpimZxz8YV4fQdY/rNa6vry3vEnW0VA7hwinc1
yKNQ5QqLCQ9tyoFGMOdj0htgFxkOguL+UxcCswsLL6LLGthgRln/IW0PxCSgWtd6
bBQAswQjUrMRRbpAD9MEpgp4NXx0mZkdPldBL9Puywaloovb+x7gsgX1DMycRoJ8
kNH5LCsYVo2jnvbJBn6dRzUruLAuOo+xxr2xr25LIf+U+3FMwl3R6OudjG3BjHeX
rbn6wfUhUF08zEYe6IID8kQcZUrn97MAAIKYsW9T0AIfZM5nPNet5irZm3UGZvEV
aFXxZ8eG32EJMNCNYypnyGPmR1VNVWfYxWakrS7gIpMsjf5Timfd+rtf4oNqNyBY
PLaI2e7qSB094djavYv2BZfDXxLANE8MupooNXD8qPDT1KluRvATobdUbNC5n66u
uew4KWCY3YXW27SU9rmnNVROMHVkffBOCQu26exVOOFMojdw5ybPbEtnsYXbJr6Y
X7V2/u9gwwkMlm4TwI2j
=MMKR
-----END PGP SIGNATURE-----
```
