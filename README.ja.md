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

現在の 0.7.2 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.2/win-eos-voter-0.7.2.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.2/mac-eos-voter-0.7.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.2-amd64.deb
15861e901a0165256c6c5465f00a50c86f098d0d62b54b6e71d681cea61fb9c3f1823acc534761f330d0b63592af2a900c5f541301e6fe52a407219bffde6e4f *linux-eos-voter-0.7.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-arm64.deb
180aacf9a3d14149e845be2c757b08ac4aabebe20146e0795afb57b996f16da53cd147c5780e3569b67190b7daf9b5d28070c039f89220ab17178d6cbe7123f1 *linux-eos-voter-0.7.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-armv7l.deb
98eca71ffec54a25482ff761735bb459c7c86937922080c3cb3da211b22f21a3ede3bfc5cdbbc3c311c57a5e4e42d2a7fa47dc63a95e4f66022a9b78484fdb92 *linux-eos-voter-0.7.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.2-x86_64.AppImage
95a869d47d0f9da9fc6c38a865023b8f390e9b2dd0b845196ad07d2d393f97b3cc2aeee84e837fe5a8114a5bc48b580768dc0d2a00b6f6773c04290660f0e939 *linux-eos-voter-0.7.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.2.dmg
4a15a343d1c48e967ef885ed132698adce416648138ab02a697d97c15ea242d652280d0c7d9605ff0c8da62a9878dac6b2b11cd61b04e26642a6560c42c83017 *mac-eos-voter-0.7.2.dmg
shasum -b -a 512 mac-eos-voter-0.7.2.zip
fc39b8bc81300010f724f492def4b662fa4b19a53835eb54ae794d87e5243b8b29e8419617809744e537c3cd350e71e978e27c9bf6afc6a56739f6169b68cbe2 *mac-eos-voter-0.7.2.zip
shasum -b -a 512 win-eos-voter-0.7.2.exe
a51861b9c346c8b27f7d1ff30b19713bcb1e03e839c013c76bf4e2c16d4c0ef96f377a848f0fb896f5f34b9ceee4ca3f5011628b2880a8a6f0e29a2e609edc45 *win-eos-voter-0.7.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcPRQqAAoJECyLxnO05hN939EP/jApAWSxQ4uU8itZYzp7AcoZ
47Rxy/PSexOX+xYSzI88yiKBtbja8nL4zeDMg20mHNzg/oPTpci6BGqrHC8EP6kj
NC6L5/JZ8fO+27J+6/gsjYyFboRFjeklj1lHCjAtZkDp5oRLQNamUoNgWEV63eDM
8UfERE1Lax+tqPCkSxqXY5QENY+SgKox19JYSoBkR7pDC35du9Dn7t/CTQnYItwa
4c2pC5WLI+17WPfUmhn7kopcp7vmpSqy7gCgiHEAa2k3rOwuE9UXoM+EXiNNNNx+
vY0k4+r8KVmnhKlWxHVAysS0UYRe0bo7WcveIhT8nJ0ltyFZsdwboWDdnxJm85Rd
cdlOIxpHY+awXYQEM/sX21nhAckg3v6KDsfkDJlIzjYuAL5qjxrEZ1OsRtROjCA3
Lksy63RAcuzVeJQYg6RrDcHfx2X/JzNEbon1yp1n7DYt5FljC7qfYz4rgi/Jfjbb
/W04y4zt4rZ2e1qd1CARYfc3A/mkK4iiUf5xbR3p5HuY00mm335FLSo/JAoAyODf
OtyORVfRhkA/VZtSSDfbkFFa+lycs57eUoHXu9QReVxTZPQ0j++o1PT4CFx0Jote
TUkHxD8y9+z/QBra5iTnqozv83bGh3+HK3RFysRv0EE9Q1blQg2PZ04Q4JFBTi46
MsudY7AswJPMk7QFO4LM
=UzbA
-----END PGP SIGNATURE-----
```
