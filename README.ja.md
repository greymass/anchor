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

現在の 0.6.1 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.1/win-eos-voter-0.6.1.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.1/mac-eos-voter-0.6.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.1-amd64.deb
16a74ba15c579eb7861e95f8cc7bc62156ffb767f078a25a0b1b81482e99123948d38ced23060166800696365df96ebb53fbdb8ff56d6680f49089a9ae2ac019 *linux-eos-voter-0.6.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.1-arm64.deb
4aa5af457d9a51b110b623c1ba1cc8338048f734c8122793973f342c0ef90a9172415eb81ff4aa7aee63459f77387007ba0d546e8700d62457dcad57c77ee85e *linux-eos-voter-0.6.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.1-armv7l.deb
4304df7cb0282158dab2a364a6b6b944d45259d926238e812f1fb5de605f818304d4c98619973fb0e7c61c9e903dcf07a2bc071e5f7780f2ee40ba7123f7b874 *linux-eos-voter-0.6.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.1-x86_64.AppImage
242ca936dc0da02a3f21f1b9f7febe3a86c2b6c4920ee93f0efae618bd55ea6c3d96de07339d0fa3ac2bcb6e9ce28475fe50667cdb16187f77691bad7c198302 *linux-eos-voter-0.6.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.1.dmg
3dd5110f1348c18767fab178de5cf72649ceaed2d08657fc0905d85578d754e57f413f6a9dd608a05fb402c9e8ac02e9e5b9d3ccb41b0ab37bbcb791d8e5040e *mac-eos-voter-0.6.1.dmg
shasum -b -a 512 mac-eos-voter-0.6.1.zip
a65e5526ae31eac5dda47d3aae1881fcc6686c79a2b76690de1e8561731252f249f6de1020fcaef46a307e1984cc2634e7aeadcb21cc65954b2f8ab0103e84dc *mac-eos-voter-0.6.1.zip
shasum -b -a 512 win-eos-voter-0.6.1.exe
29e20ac9ced730f3cac14e2235a7fd86a43c8d311d601e1a3b50692c8d6dc3e4ef74471c4e43b56146a79caa0743df110cd2bdf8bc20a0cc17b22d84e9c457ad *win-eos-voter-0.6.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb42bwAAoJECyLxnO05hN91VkP/RKYjXbWebd2dPpBibtyHmUo
hS67shdhW8F8r5bxM0CFABLECBFK0K9ybMNCoZyn+BTMSFVtD89LE+ESNriGJ7/m
Zuldc+BF0c4kt0ZaTKOXASwM7wZQDxFaYL2zYrOgvYf03zf3HuvhTJ2/E0hx7t/q
2Iw/mdtkCKsBq3HJg4lAWBlUCaRGW5ssThls/GS0t5hCGzKsHIrEnEJupVQfZfuw
XdC/skQgLriBJaxNSh+XAfJtlHZ6es2r0q7odcwwGJKN+tWIx4JOLb+j5dsEGeH0
YqcKAOENHBxUSCOPSDbKZyKJiHhm2ZdenszFcN9mSGpOLI7TVAcXAIf9JnZl0XUU
vWRH+Wv1LL1zbb87kTtLYxu6ZebVud1p4NKLsX69zoUiRhhIW+cRtNTgd1wCeUnk
brXqB69yJ4VudpDtQp4/94/1XJdKRLSMOKlMsJDUSTg5r/yP9jKIaiY5JTCUlOF3
BII3UlXlpo+74j44lIGojYXqq48aSonL0lhjL2/vQlt5LZFSG4VLifGX6FFXks5J
+/EjgQI954Kxp/ylt9ThpwMFh0lcSJp99UAU52HEclEnKrVrCOWwLQP/syz59Qp9
ISY8yY6VMnaKMZU6wmev8SX1+SlXypSnbpYVMMZczAkqeeOcBaLQ30jx1NGhGDCk
uPz9iMMmX+MCoRNL0HI3
=Rw8R
-----END PGP SIGNATURE-----
```
