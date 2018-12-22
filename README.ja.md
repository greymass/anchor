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

現在の 0.6.5 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.5/win-eos-voter-0.6.5.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.5/mac-eos-voter-0.6.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.5-amd64.deb
81dac8eb51d9b75877ef8111eb1b1593e9ce3ec83f9d329425a0b06975bc55dcab8de82db37aa45a70d32372dd87e20c560a815783dd58a195c497be0aa0f089 *linux-eos-voter-0.6.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-arm64.deb
d2db3977c1afde2856285527a71e3dcefb7faa84e04ccd583dd82b328fbc078e1fd3321b1f9c8ad18196c558bc46565193f3826b600491954b09e91d2c785421 *linux-eos-voter-0.6.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-armv7l.deb
2554d854da5aff4c60403e08b28f6624a5f275ac604641c557a4ae004f0c028f9e2a63ebf431dd04aecaec99588a83f2cab828b6017ea47a89bfa14febef4a08 *linux-eos-voter-0.6.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.5-x86_64.AppImage
1983a8f9080f18e11872c57e1814ce158701ff9c425cedf04ef38582f067eb18000034c04d1a46a16cee11cba9eb5fa2704f996ea1bbe4ad1c47b4046fa8b76e *linux-eos-voter-0.6.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.5.dmg
40f61b42c29cff4f391ea7ade53ef92aa8a9152f011ed69af6ca5a39947246b9d71a510df78ed1775f59e07b9b8f5afd4374d74017523eabe4d4041eb86d887f *mac-eos-voter-0.6.5.dmg
shasum -b -a 512 mac-eos-voter-0.6.5.zip
32c1c3d3d978c891db588e7c9c04c3f3e30d06e7362c88dd90608373e1988142cfa28c6f361b2c27f0fb53a705ae2f8871d57a03da15da651895ec1c44da2a66 *mac-eos-voter-0.6.5.zip
shasum -b -a 512 win-eos-voter-0.6.5.exe
720f6e3493923032098656cd391bf7cbf0ac26e0f585d68707f02c1660a0b6576dbf02646f2fafa8b7173a81a9f3d6480bbfdcde3e14184aab22b791aeab079e *win-eos-voter-0.6.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcHZfBAAoJECyLxnO05hN9TqUP/RiFhoduhUNspmBMaygUHB44
YIw1x92wn91TaN3PUnKmQe957edtLfkwY704BLcj3t9hbrtqJV+2yqpntolw7hOU
Wpo+loSdcgJlUh3fFNiQH+SNniXvIvGOCpzd4IBNPhPjMQQ2bgQC4YOdBZindodi
uPoPQMNsmg2/B/ZagiZzxg48u2Z2gw/S7P7MskAAZqR0nFDu/W6/Vk1XY8fXOtgc
4V3oa4vSyl7680z2K+mcPtPGb+k2RmIl+6vOfWnZtGStBBsMOFHf/wwcLRYO74S4
Y3clIVGadNeJ1+IUZXuvjobBMVMyylmNff50NUE/mBaf64DMxhTFi9ahnuWDNXzR
7pSp9aK8fgKeC3BQXb7ak7zpORB5DhC1ZwGvZmdyEWexiicLKVWwW8CcxI0yh61/
39RYSip3DtI10lVWX3LeopTTVwRgLxXPlPbUYd/dSdhSkOjSkvmamXn6/wjmipHt
DI3X1zKT6CHk8HKNp8Soab4GEJGk/BkK7lh7d5pHzRrmg8hgbLCDLpUCPP0WrK2b
glRk6DCMcNoP6TAXNMQWwve5RKNlJgRiW+5gGMi+AJbUht0LUFtF7+sXO7zF1HYd
zbyvruxLgrONe4xAjCfK9CDW/Zyu4XjXRalIIKiA2KlSX5XNUXojylkub2jwroAE
M8iF6RPLTWb4hFKtc2vu
=M6IG
-----END PGP SIGNATURE-----
```
