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

現在の 0.5.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.5.0/win-eos-voter-0.5.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.5.0/mac-eos-voter-0.5.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb
a767a8a85de0a7b2e7cada4ea9c80ee5610117c8eb9b09b09305671577474a238b5ead10ed9cb32a132fc7ceadf935de4176822788ed4da88fdf015635663aab *linux-eos-voter-0.5.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap
1a14c2cfa69500f8534eed13a449835c153424b2a02337e3d7d0d13d1c88d50e4d10d20e2c78ab967653b4896848f3fc47fea4aef2a084076a028313a43bc2fb *linux-eos-voter-0.5.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb
7f20c47f724e71ae1c7b4bf130170b33803bfdf83e124bc9f7fd6ab21e5071c7a48a7e5447218cae1e6cd45f32303a314f2c47c32b9b9d2baf61bdb8677cb015 *linux-eos-voter-0.5.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb
389cf80e3e28e71bfcbd5b8850736b27722edb4063dfc6a450ae9f8a1240d7fd5e39fd13b4cdc6f3f4087e512df98e9e73b1c900e00495cf5608f4b1655ffe09 *linux-eos-voter-0.5.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb
91c0697bb0b50af607517690c2423f0c07f997eaf4f488800eb7abdb68e26d1c2b36c5c1622c1afaaba150701e864899a250b79679602b729ff8f48859762bb5 *linux-eos-voter-0.5.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage
cec2f578ddbb01508327b2c5dab4ee476c8ba141d8a7cc10c5fef3da1bcf83d6e9922588882baa06f00c4e49792c1b166eba14a3658733d8eb1b85aa7539f716 *linux-eos-voter-0.5.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.0.dmg
efdf141a65a65424783f394e712338e57b653e6322d7e08039fe796755211f4d8cde27fa9a0a120abbc338dd360f882f4388dd3022ab94831fea10c09f78e433 *mac-eos-voter-0.5.0.dmg
shasum -b -a 512 mac-eos-voter-0.5.0.zip
ed5a7e73a6f6b6e2716fbb8396713cd3184e17e640bc8b51a4b141b7f50e478b23d26374aed78670fc1d5bf4d5e4bcabc803dedb7679e83c02a5cc004910e603 *mac-eos-voter-0.5.0.zip
shasum -b -a 512 win-eos-voter-0.5.0.exe
6cac7e0cf78e02e10a91fc008cbef02dc4f51e013493d412f1bd412d732371ead7bd770979b890df8f09312ab53003c04787bc7beb1a5fb6ef61551333d74852 *win-eos-voter-0.5.0.exe
```
