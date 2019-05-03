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

現在の 0.7.8 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
c4580cf4fea96e0ec6e043c0f44834f968da732502809248f2d6e237048fdd4b547872bc3a34e816a054156c8b8a06125ec298f1d7f5f253649f510ccd12b6ad *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
f9d22567d27dbb788a9e74cab809ce75d18c4c0fe8f2b27decc885978a3e53a17d3ea6b7b097781581a6897e691a3d1606c8e659f1130d0ac822f527c30f74f8 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
f99b22932337dddf68687058479ee3ae7c26acf57b39f33673e9bc97679d90c82460023a8a472032950c384486cb317a9da1a956fd3eb621863b1ae83a577704 *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
cccb80c21cfa9cb134e1708ce1797d094f9c56ed47081b75e15b624e5af96ac7f14883da04c26cf817c2bd7d28a41d4e6c306fdb07abd0ca8dd1d072bc44c815 *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
9f8c2d69075f118627272f8e0df89db0fcaafb59f6bc61441575effa4f2cada48e0e595b6e8d22a3ba1e2c55a7a6985462517b2eee8c4e242207936e1413a02f *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
c4a13a6e9382991aa99a311a888e7c5c86f360694ceb2aee1c0b99c1c8a3dbed2b3a5602ce4ef8a1b8b540129fa9b52c5b7b331ad33525eb7d66678491c8baf6 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
a706ced71a10d6e201d28bec8961743ad6045e466c4bac5bf8fa5fd958c494eb132055c6205154f44df157696a80e13dd628e2c40df6356cce064c17eac9b0b9 *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcyjRIAAoJECyLxnO05hN9EWAQAJyYjJjkcwgjQUxpdrlpiLyt
1cSkq26FYuQGsP2AB2hmOLerHI2wdVqziJ8CYOmFYLzXZa71R1xZcDUaUrNILN+J
7Y9nJ/Gwscdes0llVVlewYH+ZBRTd3GbWymIaS7UiL4NlAl0fuEnXm5qvb+HBY4X
zYTsQDYgYkmzH32VRf9c7O+F3oPnKVi+sy7mp22b1bEoa+6TjodmsKYmFXrC4gn2
8NESCP6sPemUZTkhqahcvegUAIdDMVhVy/eBw+grJyZYADAY0CfqGUvHARgT9IuF
r44frw237Rdv0n7GPFHTcBAy6wDi8G1GbjO2cvyQzgc4p8IZaKs865Z/kzK4Sff/
4j9IZfVbxQPNJ0jEaPDGKDvfKIym92ydY/LYsr4Sj09dP/0K4ifINsd9bs9Tm1or
jTkp5AYNd+ghWJ95RMMavBUIOyL4DiIIERf7VwcmZ7T+lPFByLxqA+5mAyp43DR1
ydbK5J3ZyBGYX0MrnznDVjsF+JVv/+LHZXtiRnMROxAXXchEVWBNWWQaEQaVHGpO
48g30SjMYgLt6aRwpHIkzYxzf/cJrxMriFdov4O6CSYYtNHmDtmvYB/Upx/hlvSU
hbHDKTG8OSxU8jlFVcFUBuF0wD7IDWr9uG9JnvDYiVxCX42QUVb66YbSg85JoWo1
C71trwt/RMUTiaAHBnun
=UNws
-----END PGP SIGNATURE-----
```
