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

現在の 0.6.3 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.3/win-eos-voter-0.6.3.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.3/mac-eos-voter-0.6.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.3-amd64.deb
9646adb0c7a1532e9338412901d03c6d0e8fc632718bc86c9d96df508442b73dd919b768b64ff4c8aeda8ee1c8971d3e2b71670829e96f6311d85221970df1a1 *linux-eos-voter-0.6.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-arm64.deb
8b8cfa20e0434db698e03c2669749ef1cb7748aa7ab7e150825a86c333e9c117cb752100e27d701ac14f07747b431a77ab8e7c071579e2259dcf250c5ed79baf *linux-eos-voter-0.6.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-armv7l.deb
17b4fc9961ba15fb31a095ce54edf20794e560d04e9d7f49c4bbbcc37748312848abc0ba432bd89ca8259330632ad252cdda041ea4e848e9ece8f03affcbf8b8 *linux-eos-voter-0.6.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.3-x86_64.AppImage
e1a81736b3fd7bce442918430235ef7e3109ae0b7d95682aa41c26d961b5eaa0e89a0e126a6a673b1e9d0bc9970bfb28d5a161496e97db92402e59c341032847 *linux-eos-voter-0.6.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.3.dmg
1e9f8815266bd0287ecf531b64bbf702ca334a6b1e14564708eca800e33ea7080d04010e22989ed85b7a7cacac9713a4a03dab8821a6ae27507fe6f7248a161f *mac-eos-voter-0.6.3.dmg
shasum -b -a 512 mac-eos-voter-0.6.3.zip
652b8d7a6a3aeb55c277a4af1158e8fda03d2bc9dd626c19931a0b62bf9435e736c407b57d2835f4483c2088493bb7235844256597a60cc2e5cabbb7747206f3 *mac-eos-voter-0.6.3.zip
shasum -b -a 512 win-eos-voter-0.6.3.exe
97d85c252f6777c5eee56c701fbf61bc109b098c96c728f46f9dbcf715c592ccf6d9b199023d4288900a57ae04e86be8a5dfcdad8cb58243100b4873ed3e620e *win-eos-voter-0.6.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb9b0TAAoJECyLxnO05hN9mfUP/27p4i1FwjepCG8ZB/1ISCGC
ekVfgqY7a2CDdK10B9c134Noft/DBTzB/zgHo+hZF5Wz7JilJWQmQeycNSi32xzz
0tuZdV0YtDIKUL744SVeOElTGcP1O0P7Wy4q1yFiRHsdCkGyObY5oUeewJkKDphs
w4WUvYmASAmouo/r641DY9R1g1YluDuUK+DU4Q7g+Nhh/dD0H5QhSf776eFTwJz5
BV7WeJBGQhuVXWGj0s7phPxBSoLfYDNdyU5vGP5Kxhof/c24D0Msbdg6TLk93/OU
2VcYCJLmXpKjI5l7X01dI5+1xAK9JUvwTFQBJcTKA0N87FJa1dVNc5wcjUSOLZSC
Jr55LFBlvii9wA/kZUE4Y7vFCfRcWCyFqY8PftuFrfNmm+HqkAzaM14ML4cHQRk4
d1rIBmdLNK8TvBNJFMGsiCCmEBLcYc6KLjS2VCa5TA1la+nDhiShtxiRgNp37esj
yGeF10DPPcRbefOKJk3LYYvcrqwTWhbZArlMzqxpUGCNX83hWoFZOXkLu96+hXrK
5xfP+aJmGaAJoo/LCQobFn7UspR5TfpSCkGqL1/vPi//rKw+tb9uSz+ouAZ4sW3u
SaTsCXd2v9wyCO6KAg9neS+yhQ69azdtRLHjjwJEVnMFu91IdiqVBGA2J4F5StgY
cBD+wxvdxSKIxguWxsQH
=h4Qu
-----END PGP SIGNATURE-----
```
