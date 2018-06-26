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

現在の 0.2.2 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.2.2/win-eos-voter-0.2.2.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.2.2/mac-eos-voter-0.2.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.2-i386.deb
acc63feded2f88e9ff4f2752400bf1a482ca55b87b756aa7376ede3d28aaf72ae4c62da6528b6d2b0eab039195d627ddf80244dc6192d71c55c41cd8ab7de481 *linux-eos-voter-0.2.2-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.deb
26704939f44f463881e2f6c3abcd9b1bb8d268db276fd233c5452468cacf574e1d88724f7e0d407bfea03deff1e6435f6891aa8ee0d045ff92b75f6cc98fe88b *linux-eos-voter-0.2.2-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-arm64.deb
fc43236352d9f6bd661c93f154386b788b227df5ef1e81be7d0345c3a06ba0973561742191a92018091451127dd223bc22014d9a9ad7159b093aae0ea175ceda *linux-eos-voter-0.2.2-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-armv7l.deb
e83c04cef0fee0070f9f2f9e93ad38a357c8d7d3d9c49a0f9efd24c3ebe12ec85676365a6e24eb13a4d904e69c94f41cdda09abeecef6ccedd02c7553ae99acf *linux-eos-voter-0.2.2-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.snap
097942f10b2c4dca49356ff2e83d2c1bea01ef46a422bd1e2b26d64da8c643a78b72bbefb4a7a9aab8c5ef6ec869461d61c11e50cf1abfb01b6240da4d399bea *linux-eos-voter-0.2.2-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.2-x86_64.AppImage
9cc312436528a07d134dd58a9362c8638057354a83752b94f94104444c4d271fa1b38b689f5bc9b02ec43538721ff5f95cc23e6085ee5887d5be48cc58d155f1 *linux-eos-voter-0.2.2-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.2.zip
355e7d18f462d7586af58acdfa7aff4c363e78d78d76a3c2cec9e3525e1c75a79ad988122f9b12337bcc1dfa78dfddec1deb3973aeb7fa5472cb3c036a581e06 *mac-eos-voter-0.2.2.zip

shasum -b -a 512 win-eos-voter-0.2.2.exe
56afe1adfa4dfa1b753db6f87b71f6b929e72003b4db50504e97b67990da067c4157c99062297522c6af067af921106f73375d4974c8e565e44816feabebff78 *win-eos-voter-0.2.2.exe

shasum -b -a 512 mac-eos-voter-0.2.2.dmg
56d17e0561c9ce9d06f9d1d159f5a77889d4ebb08f20e675823d3529c97c82b8108159f5144e171665c793d7ea7dc65e5b2c4bfe195ec0ae10866608855714b3 *mac-eos-voter-0.2.2.dmg
```
