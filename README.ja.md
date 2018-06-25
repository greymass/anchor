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

現在の 0.2.1 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.2.1/win-eos-voter-0.2.1.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.2.1/mac-eos-voter-0.2.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.1/linux-eos-voter-0.2.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.2.1-i386.deb
e713e624711d2ee3d36a3b8ab9b3bf8ad59be1e4c179c2bb78a3bac5b146b2be32fbf859bfcb5e60ba658e8aca89d026d4856942765e0f44bfe11dcaf0ac33f9 *linux-eos-voter-0.2.1-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.deb
d785502fdf8d31c8b6cea10ef8c64a516621fd92282903fd2cabe4fb0e090f4afcbbf7473ee730e46e6c8dc02c31e850162b2fb4c6ed587f89773bb499238385 *linux-eos-voter-0.2.1-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-arm64.deb
eec1efa387c01a18a7ea6f23936ba22396d67d0706de9d40c171117825d463d216f4d0207ff0902372eb2e46022d5bd588ee214802ba88d64b112847df311777 *linux-eos-voter-0.2.1-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.1-armv7l.deb
55b97236ac80f1f4565b4d74c33e20d6c35e7fbf8ea12f71c023a1a1a5d99412e0496d95efae61dbfb66a4880f2a09940754d653647608cc0d832de271e2d61e *linux-eos-voter-0.2.1-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.1-amd64.snap
3c2cc744eb4c54be508f95cf89ec4b4c05ba81c3d05e15f7689df5d69fa2b8a607a6abcd5934a2f34202342b5bfa052a545ec252822a292e9c160094424182ad *linux-eos-voter-0.2.1-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.1-x86_64.AppImage
e475bf94f6629e5841b57baab10837c3720bb89270db7e53393464305a76b46c9b87d66b8f57c6caacc78291494d65c0f891b59ac0f099eb9b31946b851fff0b *linux-eos-voter-0.2.1-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.1.zip
5692fe1c8c4860f0dff1a5df444258aefc1959709febcddf025e4387e99aa9554d71c6a9839c9ac15d5e0d9e2e79eaf03265a9060dc20325bb03c3c374fd9783 *mac-eos-voter-0.2.1.zip

shasum -b -a 512 win-eos-voter-0.2.1.exe
a7fa929d14820c5534a2b633146dc223396705c9059130504c450fecd061ad789f0c9338c58946cb0a19dac73045d430e1598c387338390f7c1d589cbd50a475 *win-eos-voter-0.2.1.exe

shasum -b -a 512 mac-eos-voter-0.2.1.dmg
bc3a28ae0354bb677fb5a775f1c4d5d624fae519bad5f49f3d9d70161d2e0c2dd19cef6a24b25ec0e0823bf1aafda7a422a9c2178c3bf784138173818b63d6b6 *mac-eos-voter-0.2.1.dmg
```
