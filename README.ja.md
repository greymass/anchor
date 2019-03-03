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

現在の 0.7.4 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.4/win-eos-voter-0.7.4.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.4/mac-eos-voter-0.7.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.4-amd64.deb
bea81fe2e68cda5609a9e322fc54d44d774c3f0204dcbe874bb0a021d8d408db2ba375aeab984e5cc44886a66608168f6889b57f1dffce6cc266f3edc1c83d92 *linux-eos-voter-0.7.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-arm64.deb
ebc6cc2b876cc1e37e47aeb5472cf51f6a58d8299dc0cd491423c7de6a31b8cb179198ac50e4a3601c48ae87b366fddb1a89e1c7eae57c7428dfc01b60550989 *linux-eos-voter-0.7.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-armv7l.deb
d3d39e6aa3fbb0aab564ebbb4a9da21d34bda928e5b42eb6fbba62fcf3fba678710aeade713125b24b8294f3f68f236f3c32cda53e0f251135f3bd329bf236de *linux-eos-voter-0.7.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.4-x86_64.AppImage
771a355b2a87c8078a10ee6bded05a87a892c47f7e2e8483ad889a70b6b81300a257c07ff99551c3bad99dc5b7e83eaa90d55fc07ab5ae5fcbd3cdf0ce0349e2 *linux-eos-voter-0.7.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.4.dmg
6dcde6ffcec4d249768e2e5c3b954123c6f4e034e9098785f66343e2277de2533697050b9aaec684a33c2ea7c40d60fca104f86bf6809ec4cc4c41d2bfac3272 *mac-eos-voter-0.7.4.dmg
shasum -b -a 512 mac-eos-voter-0.7.4.zip
df15d10696995558e39dd919cf86b019678d7defd6bb778b36787330d35ab32ec21aa0cb4d922f3fa0fa09b98f315d1b99713e63d3251423861f783178d2a158 *mac-eos-voter-0.7.4.zip
shasum -b -a 512 win-eos-voter-0.7.4.exe
04c58dc9c238e9c0535a9347dcabc3364966a0d1473e98a2e13434cf3199fca0491f51b9a945ea2326c8ae203b04f533d730f9aa904168dcfea5b365a2c24a4d *win-eos-voter-0.7.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcdvV8AAoJECyLxnO05hN9oYQP/1KSQ2orKzFu7GQy7pLUxxaF
XGBixNm0dqwgaD9UABr2wx0uWW0zAaeZXy5AUNt6I6EdKNFT/R608vG/dFOqVd84
qJpFs5ZDFEu/8/4zSJdznINWf8HurETmySI/QcbaypysLrx3JO5igF4Omr/YD0Lx
++stIuw+Xxv3UM08PpQm3QQQ8xWwv4mVcVdJeOh61QGXoN9w/uf0rX4TuULLNAex
qcW86alypYEak4ubf8+5gz8bvOSFqETnd/Z1mD4wrVYZdBKLRXFswj5iwS3hHJcj
9o/njv6lugDY4RqczkeTRQLJNIvE84NurkhHK2uVSHHBdWEy6wn4oajuCkfDKy7e
odtJthGzZjefGlSU/h4gXbP5rLPJ6dsEhPXFzsIxWDzuxaAwqzpIdnaFDxVB18oj
dlH9hG3OEbyZXmrpsBVN9J3tULESP8rKUHVwvlBjcmtnnnGr33zA0Q8CEuEqT71r
rZuZSp8FdepQOzzOk/oDEvlq2IlDVdsim0Ka0UC7e/tI2NikjAXrMFdI0SVArWU1
ZP3an36DAoxX1VB8AeMU5NxuzfURKgs+ZvRWnv7HokZG0FFTdp+JPtqcu/qGGfXa
gcEHQ9NyQRgKQty3IdL55m8ubw3zke3vxgDdKo3V7w+DaXzUo6kBB9hk5izGT+0+
v5p5a9nKvG7CDLyJLXNx
=fmUA
-----END PGP SIGNATURE-----
```
