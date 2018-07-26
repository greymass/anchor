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

現在の 0.4.1 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.4.1/win-eos-voter-0.4.1.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.4.1/mac-eos-voter-0.4.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.deb
7561c25d8931025434233ca10f31d0f63e2e0941870e57518ccb60fafdd42fe56ab6796fb557bfd97d0855d80d8ed3e328c007eecb7aa57d952da672edc5bfbf *linux-eos-voter-0.4.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.snap
db2efc19a06f9d51ba40aaaf06f28f93b9867296a2707adee98dd145871eb3cb57f9d12438f295c09481957b366f9e59346d0e42cf9208c852ca4ced1fbaa2f5 *linux-eos-voter-0.4.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.1-arm64.deb
4c5567a7917e951df14bb7ac9c53afacce8e4d7b93a8ff14024ec4b60651b4eaaae54f8418b25a91c22e6010c555d967bc5f8bfcf33a72822d04ce8b9f0e375d *linux-eos-voter-0.4.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-armv7l.deb
1956e33dd7f4a70c1fa1e008a9f652590a917c399902ad3acd47c4520499808bb5b027f3d14ed797eeda65eed4d6a89d0e8afc3df0eb093e3475eacf3388bf3e *linux-eos-voter-0.4.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.1-i386.deb
a77842c747d4a71f2d073db112e344bcbe2c006acdf02aa43cef2aebc159c418c393ffba7cb5f29a57c0d5e86a9a7b3bebe75c3d3882aabfdef0bab3d98ccdd2 *linux-eos-voter-0.4.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.1-x86_64.AppImage
c81d8ddb03a4c6ab5af8c00b7802dec4ea04dfe6044a9cd28e2c589a1011a33faf94bbe2ac1eecdde896f89dbf9031346687e3eb96fd553060f5eb5f72443778 *linux-eos-voter-0.4.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.1.dmg
82824383e2bae3338880d5f9278abd0dd97b0dbc6c4c640eec602c87c3ced1d2e65267dea66b211334a28f214a2e43c47c40016dc7b58e2cd2e0628a5f837b1a *mac-eos-voter-0.4.1.dmg
shasum -b -a 512 mac-eos-voter-0.4.1.zip
7cffcbeac3b89edc55376e95b014efdf4af25e5471128ecbce7ec4ac7cc0252e6ea61cf76a337536687c2278f939a6c25cf6aaf1d8a04252c26233c627a24729 *mac-eos-voter-0.4.1.zip
shasum -b -a 512 win-eos-voter-0.4.1.exe
2e535c7f0cc93cfba5f40cae5df3d8f294bed08e0dcc48bfe6d6176c667f7586032c19c22d0c8125acc048a87c28ad0a41ca1aaaaa7bf6ff7568e03a5926e1cc *win-eos-voter-0.4.1.exe
```
