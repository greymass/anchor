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

現在の 0.7.6 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.6/win-eos-voter-0.7.6.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.6/mac-eos-voter-0.7.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.6-amd64.deb
aa135d96052585d818f7c47ef01599aa6d64344292228fe8e027973a2d870e5cc5bba6ec0fb8073ed87d5169e30f893c4a6746c7514458ba3b8832257ca0ba04 *linux-eos-voter-0.7.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-arm64.deb
dcab7bf7c943e848622f9a0ee5f4ee52927b6f055a153b05e203463394ad488a11d9bf29533e6b23b7bfdd0eea61f27ff25a1fc8db50bfe36aa8fea97405cc47 *linux-eos-voter-0.7.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-armv7l.deb
865ef4599f119e25c47ab490f7d2700979cb1397079eef1a52ec59451e1c7a98f3930d45626c533dd624ddffbb57b474a211f2f45563317d5d6fddff7147f534 *linux-eos-voter-0.7.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.6-x86_64.AppImage
405c1e7dbe98bf7e442a51143c3be5cbc0028d179f3417809e7f6bfd178cf6e0a509461264ec469335f46605518fdce59d3f26ab02f4d9c0e80e49abe7b2a743 *linux-eos-voter-0.7.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.6.dmg
5f3d0825530a98285fa0191c2c7a956f7d7ba741d5a3992900be95f9eee5cb4c81aa368567c2ebd4fa1d16e40a9f21a641dfa1ea6388cc569ca8763d9e1f84c0 *mac-eos-voter-0.7.6.dmg
shasum -b -a 512 mac-eos-voter-0.7.6.zip
de65d261a754791da6ec7d0a850e552e3d5a8d828cf837c9fa84a0aa0d05ddde61c59179d4a027122b66783db6351ae427917640f85266287d80e7a5003918ae *mac-eos-voter-0.7.6.zip
shasum -b -a 512 win-eos-voter-0.7.6.exe
bf6e1010371a8d5aed757dd0efb3e1b89d5c0a5a1604c7beb3074de367d1a350e1f2a4cf60ecfb9fade3960174557b062aabb88a498f68034cbeb5a046269d50 *win-eos-voter-0.7.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcpNwAAAoJECyLxnO05hN9awsP/ioJ5zINASlEZj7COiYrMDu+
yGDJUJdMZemcCQpHyvBFcV/SGgbZdVd9MM0yc28k7IESHi6kV3BhspexB0tU7Lsf
+KMLGOd2zlS0On9MnQdnrjJdSfxPvk+sguj9A5/y0nyzF+TgTHFXiz6nSPQJ8RVQ
Y0jXD8sy5ntp7/NJYJD+h4PKkb6CguAyJQ+rcd+dvO0cT0k6WP8pBGlIgRdB+Cm5
4OPss4rImS22OvmEVqgbaSsBS+yqqJ+fI7841J5M6iio5dRK14ynuVHpBj//t24E
wMcwKcfcn9bL3/KghJ0QAEDY0aUM5U0lwnuwutVMfNRWRmFnHV4Uglw1yectP7xN
cDFvBr3aUJg5DwxhnLo0vBua8Lq21QamUc584f94u8QC6YW9kQlMbmLsNAUh4XpU
jS2JELTqn026SsIni6QNlbsB7QrUpcW/k9rpu3mAmk9Hbc/GkkdwuYgTLQlnPuTJ
FvsfJ/yn/dkQw/ZM6QcFGtIBD08XyYiBOfcrY6B4cTC4cVxuK7oep1dmsMUKTO9u
KAocVUwV2XG8IONyNl0uBG3Z/UWcjVTl9BnJkl0zBQVOOJE2Ur7brmnIAs6Bg359
7TCWLtUwfIgMToZz3I0rFiYsuqufPieDbICayLlYdysRB8Ol5xTqt2sH2BDUGpLR
tO63ZSfugUz4R5y4YS4J
=gVCf
-----END PGP SIGNATURE-----
```
