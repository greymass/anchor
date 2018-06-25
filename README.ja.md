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

現在の 0.2.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.2.0/win-eos-voter-0.2.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.2.0/mac-eos-voter-0.2.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/linux-eos-voter-0.2.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.0-i386.deb
26fbfb5e23cc19c0cc995a86f6c5060b7f99f7fd6af8b50ca771028245b298f8ddffe59925d73ee65d88b4ff10096488abf5b22ced87a27c6f5bcadc6ff870fc *linux-eos-voter-0.2.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.deb
7eaf225b8267616407af0d494b1c6df2029fa15f85d680ad8a8a3e73c12f7d59b2611298cd4e9c73e2bd103facc4abab7ec15bf2d7bf1f4bf58dab76a3337a5b *linux-eos-voter-0.2.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-arm64.deb
99591a3391782a213c65bf73e172afe4bec043de3ef41565b4979b583ece9b944087556c5c58693d4ff543e6a07d6e3a1ba8401d0f5b6e555fd6a4410e787364 *linux-eos-voter-0.2.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.0-armv7l.deb
12c6ca7ca66a4d6e8409d6506360632ac3a6eaeaf5f85b22c32cc8f1d960ff2110a1ef9a1518ffca44f2f76ff7ae4e60f226ba2090125c0bb0023ab189e0ed59 *linux-eos-voter-0.2.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.0-amd64.snap
a1b484aa7c42d93d207a1ba41d744da461ce71e6982d7827096f3b35ed0584712ec5e3765e439ff344ec73482c8cbe18cb6814c3bc0a863991eb62d466dbd9f6 *linux-eos-voter-0.2.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.0-x86_64.AppImage
43f6df8c9e187cc02dfcfd6c3ac2e7ea3945ead44a29ad8d8a08585e855ff94b51b2486e76b633bfce1bf5f88e530e0d4896e75136661d66ae7f7a6310c8d9c9 *linux-eos-voter-0.2.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.0.zip
50b34915924e432b99ad79e72e413432599b6e1a4e1ddeb4bd30b20febf08bd86c25bac1f484feb9771abe51f3ffcf9e90ac917417c1a49f41af44ba271d1008 *eos-voter-0.2.0-mac.zip

shasum -b -a 512 win-eos-voter-0.2.0.exe
b8ed0befb7af56de6481235a4e49502b4fd9b97646d0f4003a75260ebb1c4de9a7c67977cde36d24b9c4bc065ef05d75ad6e0c7e912ebbfccdb2f98d899db6e0 *win-eos-voter-0.2.0.exe

shasum -b -a 512 mac-eos-voter-0.2.0.dmg
f01e64267979991a5f5dac6764015d9fb3d821ed6ffd1f8252faa2e1c64dc498e81a50428fb787135d9ca0e8ff0f2d722953057bb41fb0629e0b6dba6ac6a124 *mac-eos-voter-0.2.0.dmg
```
