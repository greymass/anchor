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

現在の 0.6.2 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
a158c50a65ffa8c34c54aae5ff5d0e730fce6e881f102d558c47ed9b12fe555ba066da9961e817038d66ddd8554bbc339ef10111896af4a67e0159e3ed75f845 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
e5c4dee66f097af7f23b7b1214e4b891e98c8e77dd3a99e60d4ba24f3f086f4b8ca2f6713b1a4af0627d58658411abdfaf36d33b793c6c3cc62de25a73b6fe9a *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
bc0e001d5344d0ea56d7d39a445b5ec9c23d590026eb6c71d287135371a6b5f32146b89505e316cd05e7fc5287a620acd17c0ad2613861c390b705baaa25e19a *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
f03c07c4d10e16baf7ecfb36258da1ac08a62615330a6998bbb028ba5bb27dbccc634690edba0b9fe28957ba81497ec601a6aea0392d16bb65070290824ece2e *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
935ef44a0b62ad123259da5440a2351f3517aa939ab2ff6cb12f895d72aa48b7b67d0503aa20119ec6ef2f9a3f6815efa947bd8344ec93f6ed18ffe6a52f9f19 *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
c00f9dd07f0f7e71efcca7a5c2f81104bc28bd99dbef13bab24f61cd1c774a9874489bae640694442cbcda5f9f54c4310fbefd38b23ad269175a83e834575693 *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
5c9fe446bcbc28e43efbe3066eeab94ddcba3b9ccbdcb49a6157eacb2846ff99673594040fc48e75f68b97cb07b323a59de6b3bd7848d3b29c7e25797ce4f4a1 *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb5K04AAoJECyLxnO05hN9mT0P/1fA+sgntRPGowmhlY6JB2X0
cNLx+HuhAycQNp6k0W1BncwViV/iKAoq3GsZUrZLtCQyaS5cUXGzBBrHy4klboGF
pZSvjmSHpPTEXyiII/Pmdqbhi57uUMwRMHjMqIPrUSz0AnMUxQpksi9SQTxG2NU1
nxSG2QpaNgn9pJTKuUyVfSFB0XdITKkTobaZRlZ6djP9etiV9e7ptxwuxLUVZl1H
SgfxC9uQZKAmvinagNn5RItEoZCcZcCSVcL3Nlhpsrm97uY96ey5js0T4CWTmS4p
RuVnJ8myXJdcWoV8so0ZMD7LXBacr2b0J+MbA/OE/3IwXSxuc0W8xLlj40M36xML
odb99ezaDDEpdTSvIl3iCTIzrK6eMYF90hbVf5xRZyHO5Z1pL1+0UHj31As8wb9g
oxn9jsCP+5MHsYk/8u/Ac5Zv1FDBv1wb6dxdR3v+y8NwZcbL6/lWPQ6sfca9kNWp
0NbLbvttbnGSmorpKbQbegEaUIWZV5lL8HAHWbdxaE5p3RBbbYlr1UjaKyRpX+Ic
hhMkR5P0/KeFlBQ0m18q9vn2Au37Z+HwTKdHVa7ltsyQFiyMoiAed6jpfGQl5Jzt
cR/cBeuV25ByFCXYGjjjZJ5bFG3hXnJA+UjnTTWC66i/i+JkALnB7qpaYWJxgkOl
9SCqa5mn/bI1qY0mNdQS
=6Pzm
-----END PGP SIGNATURE-----
```
