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

現在の 0.3.3 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.3.3/win-eos-voter-0.3.3.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.3.3/mac-eos-voter-0.3.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.3/linux-eos-voter-0.3.3-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.deb
345fe5f90a218fbb2b5d9638a9da56775aec1885a9bf059449f69ec54b54e036caf55becd0c05bf126519e82023f8079a2479deaf091de43fe9e2e33dbe7912d *linux-eos-voter-0.3.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-amd64.snap
f6e94469ec9ea4d9e3bcc22d29279722eb4586f5871b74781adcb395dab1c62d15b6ddb5b072cd9c23aad6cc2d0138d27e6bd5efcda27c13eae7f99db5f8dc61 *linux-eos-voter-0.3.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.3-arm64.deb
8ad0d51f4f2019a608093e120cf20814af757fe2d78ac38b7fa169767c3deea94ece99d2cabd8b89e3a6bbd10901a81377c5c8dac22c8f34096df5025b06364a *linux-eos-voter-0.3.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.3-armv7l.deb
ded0d6db8135ea404e1bda62b62ab4681bb38b9487bd14fdcb7f964c6140b350054bf5c0ce747c07d5ba975ed1952ba1ec588c3505dc7ff5ec2cfaed5c11f004 *linux-eos-voter-0.3.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.3-i386.deb
38259ca723b9104ca19f5006d94d994a1621b48ddfc8d632f835f02ba8faf0bbee23e79eccc7736506b91945710aa5d92f0b539250475c0a557662b1e6dfb009 *linux-eos-voter-0.3.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.3-x86_64.AppImage
80b960ffd41ea249574ec68d63bf3b6293cf8c5179fda7e6b9d39742b6e43f0eb303eb24f2b99361ce1181c4fc03afd43f370cb33a7945baf482d3eb8076d85a *linux-eos-voter-0.3.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.3.dmg
7fb73dea0829fdf070ed8f6e964b95967dac22e683c5707b2df06915663580cc4d741f9ce0b6da3d374f91ddbab7c18c6632b9573e8eadd35c81e25e0e46ca65 *mac-eos-voter-0.3.3.dmg
shasum -b -a 512 mac-eos-voter-0.3.3.zip
76685389d7c6210b536225ef63c7aa42c71d0eb51f2f1e44d178456f3d48ca5e0badc786bc05af50d7d0ecb5069a8aeabdf7f96d8bcf9916b2099a3377392386 *mac-eos-voter-0.3.3.zip
shasum -b -a 512 win-eos-voter-0.3.3.exe
77e3061e01bc6bfd3e62b54a11ff0f7638033ec5f0bd942f10b2359eeed615c1316df3bed1636d60618a7459bc2c5a2ad23cfdf6065ebd01cdf5b01058d8677b *win-eos-voter-0.3.3.exe
```
