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

現在の 0.7.10 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.10/win-eos-voter-0.7.10.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.10/mac-eos-voter-0.7.10.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.10-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
7f420d9a7ada321934df43b09c29b61a8e58128a83cc87905b1affe463f99043b21db69884ac90aeca86560f5623c8db7f0571e52c9e0f51c648f52c6b7e4dee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
fbe79cfdab0da7c977477133f76adf38aa16f79e955ccbbfd72aa96bc56632abe7a7a90e74e1ff59eb0b33196d09353873c2420f55ea3a00cb39ed85a5e973ad *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8F1hAAoJECyLxnO05hN9UrsP/j9D5Hfqrn8qPJYiNagOX3qy
nj3WhJyKzgWFEUBjfLEh0fhmCfESwurylC+QQWhyNa4hhpDWDmWe2bR0XUs9TcUI
MBDWBh5RCU/8qIRROBUGqQRQw6YSU80DNOU/1yQQR0v8f0TOq0QJXNLD9I7WQO8p
P8AzSlNE70MS5crzzn7kCw5vuno28cPtyKJ9jNA+HwM95Hv7dj2fnQCtGm1WI0ON
aoZ2St5nG2oXwvLHL28LwtNCaeVctjaDyxuaASsGwaYaOE+tFOz6VQ8psGGp59p/
Z+LVjyxIgJ3zQu/AflrpmPtrg975j28GB1I+IFH2XVYV/pLoNAKj8+Q5vwNkMRL/
8NnWY53osDnuI/wlgQT0wGSjum4OUWRqOrQdz+TCvqa9Gy2pRgjxwlggszWP0EAL
KqlJlMUG7PUCOPVSsKJW4MhM8AwmHvRby208/ZLQEDfarPbGbLDpt8miQv2ZMoe5
/JhgovTLt4NI+p+7vpbgAJQ4f8YXTFDFuJ9q6C5LXhn+f8kc5Nvtm2HQuEadL6J8
CVKIh0nugoRoBu/1XfahWhmO532OQQe8SmtqS+8wtuxjpqH72xUCTDXZvJ09cMr1
FrWhVRY5TmM4muR1jnR42e9wBUa7aEyRQx7DBqreKNgxBG90j+4s+OWTTQPnYtWv
S1FUBiMIMDIIOjt8xyG3
=uZl4
-----END PGP SIGNATURE-----
```
