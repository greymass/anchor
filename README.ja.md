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

現在の 0.3.1 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.3.1/win-eos-voter-0.3.1.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.3.1/mac-eos-voter-0.3.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.snap)

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
yarn install
```

次に、いずれかを実行してください:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

プロジェクトのルートフォルダ内の`releases`にビルドしたファイルがあります。

### 開発者モードで実行

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### クレジット

このアプリケーションの開発は、ステークホルダーがEOSのガバナンスに参加できるようにするために、[Greymass](https://greymass.com)チームが主導しています。

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 linux-eos-voter-0.3.1-amd64.deb
8022c1206e5a38b3d4f538cbf15a90fc1818c43e3cc0f58c7c73f9dc85e7cd12df20526a298611704d56d8a7429a7bcccc80aac5aba086729cd04f804f51a773 *linux-eos-voter-0.3.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.1-amd64.snap
bce76409ca941d368e7d865d3f6e893ff996e097c7e42a9dd159cb167bab68b8769b9d313b38633e89e1d6dcec180db49f67d8321a9e7a90be21b38958534430 *linux-eos-voter-0.3.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.1-arm64.deb
53e0f2a9c1fe5ff50ec3f8635c5f86aa611840292c1b902379354d6974f2636755059654d2305af43e968f2df90be75bd801125465d40307e3d851dc43a38c7d *linux-eos-voter-0.3.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.1-armv7l.deb
3c547be55efffc83aed3bb91fe6ffd8dab5b0b7460ed5608ac683c0aea4f3257028158eaa4e5db55bdff4d2e97dd0f277104540f5e2e36741db6f4384e27d90b *linux-eos-voter-0.3.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.1-i386.deb
845eb1acc6f5ac9300feeaaec82eb22dc2a4952ee7c7bda772cfee905b6480a5e2974c4be53853441351f33a83960b590aa16c8baaeb346df5ae79e1a177a67f *linux-eos-voter-0.3.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.1-x86_64.AppImage
e224d3618512d2e893e5ddc8cdb0f0e9082e33a8092a817c0ed79b89e2b6979b403c62ed0df012cd8bc13f4cb7dff31e162e09903073d0f4e14833f086106125 *linux-eos-voter-0.3.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.1.dmg
af8b152368a26c01447024fe2f52ec77e3da7c19d0a501cf274769eb7c59760f5fd48c77e95a812e5d15ebcba5e132061ec8ce37fe4893da75a4cdae76650716 *mac-eos-voter-0.3.1.dmg
shasum -b -a 512 mac-eos-voter-0.3.1.zip
7a30cf1390e1f1fa51f0a5cd0ef93f6c0978de3966d3bd5c24c2c66dff9dc00d6d7c3f6434a65c37789c6d86a661877da5388e22470b44327303502b3b62a573 *mac-eos-voter-0.3.1.zip
shasum -b -a 512 win-eos-voter-0.3.1.exe
d8c6b16a787302a83448ce294c66690573b235b5ebbd7afa9b168ed49f9090918030f6c2d161bc3217bf138f10969bb441385a6190e67f730feee8109ccbfa71 *win-eos-voter-0.3.1.exe
```
