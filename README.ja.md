[![version](https://img.shields.io/github/release/greymass/anchor/all.svg)](https://github.com/greymass/anchor/releases)
[![issues](https://img.shields.io/github/issues/greymass/anchor.svg)](https://github.com/greymass/anchor/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/anchor/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/anchor/total.svg)

[English](https://github.com/greymass/anchor/blob/master/README.md) - [한글](https://github.com/greymass/anchor/blob/master/README.kr.md) - [中文](https://github.com/greymass/anchor/blob/master/README.zh.md) - [日本語](https://github.com/greymass/anchor/blob/master/README.ja.md)

# eos-voter - EOSブロックプロデューサ投票 & ウォレット

`eos-voter`はEOSブロックチェーン用に設計されたライトウォレットの機能限定リリースです。このアプリケーションはEOSのリモートAPIエンドポイントに接続し、プロデューサ投票の操作と、いくつかの基本的なウォレットコマンドを実行できます。

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/anchor/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/anchor/master/eos-voter.png)

### 機能

- **ブロックプロデューサ投票**: 支持するブロックプロデューサを選択し、票を投じます。ブロックプロデューサ投票UIは検索ツールではないことに注意して下さい。これは安全に投票するためのシンプルなインターフェースです。
- **トークン転送**: 残高を保有するEOSまたはその他のトークンを他のユーザーや取引所に転送します。
- **CPU/帯域ステーキング**: 帯域またはCPUにEOSをステークします。これはブロックプロデューサ投票にウェイトを加えるとともに、ネットワーク上でリソースの使用権を与えます。
- **ローカルウォレット**: インポートした秘密鍵にパスワードを設定してローカルウォレットを作成します。キーはこのパスワードを使用してローカルで暗号化されます。このパスワードはウォレットのロックを解除するたびに必要となります。
- **一時使用**: アプリケーションにキーを保存したくない場合は、パスワードを設定しないで下さい。アプリケーションを終了すると、キーは消去されます。

## eos-voterの入手

### リリース

現在の 0.7.12 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/anchor/releases/download/v1.0.0/win-eos-voter-0.7.11.exe)
- [macOSパッケージ](https://github.com/greymass/anchor/releases/download/v1.0.0/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/anchor/releases/download/v1.0.0/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/anchor/releases/download/v1.0.0/linux-eos-voter-0.7.11-amd64.snap)

最新のリリースはこのリポジトリのリリースページでいつでも利用可能です:

[https://github.com/greymass/anchor/releases](https://github.com/greymass/anchor/releases)

どのファイルが必要かを決めるには、...

- **MacOSユーザーの場合**: DMG (`eos-voter-***.dmg`) またはZIP (`eos-voter-***-mac.zip`) ファイルをダウンロード。
- **Windowsユーザーの場合**: EXE (`eos-voter-***.exe`) ファイルをダウンロード。
- **Linuxユーザーの場合**: SNAP (`eos-voter-***-_amd64.snap`) またはDEB (`eos-voter-***-_amd64.deb`) ファイルをダウンロード。

### セキュリティ: 秘密鍵

`eos-voter`を使用するとき、すべてのトランザクションはアプリケーション内で署名され、秘密鍵は絶対に送信されません。ローカルウォレットのパスワードを指定した場合、アプリケーションは将来の使用のために秘密鍵を保存してAES-256で暗号化します。現在のパスワード/キー暗号化のスキームは[ここで確認することができます](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86)。

### エンドポイント

このアプリケーションを使用するために、このリポジトリ内でノードのリストを公開しています:

[https://github.com/greymass/anchor/blob/master/nodes.md](https://github.com/greymass/anchor/blob/master/nodes.md)

このリストは時間とともに更新され、アプリケーションの初期画面から参照することができます。

### 自分でビルドする方法

アプリケーションを自身でビルドしたい場合は、nodejs/npm/yarnが既にローカルにインストールされていることを確認してください。

**注**: Windows開発環境でこのElectronアプリケーションを構成する場合は、追加の手順が必要です。

```
git clone https://github.com/greymass/anchor.git eos-voter
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
git clone https://github.com/greymass/anchor.git eos-voter
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

shasum -b -a 512 linux-eos-voter-0.7.12-amd64.deb
db3e39af4aa36711c5c0af4b5e63d5eaad091ca65da5540b40302d29b2a220a47234459557610706c8f4ec6eabec92bb5cd0beda51986bdbfad3d3b74c10009e *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
3ee2ca8f7e5cfc59cd40da84ec55e72732ee147cef35225a5f2d4e7047c3c71d38d7792e45b6423727cc7dc5769ee2bfa7f56e13323678b10641a2c27c780b70 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
ced69a3c32905299849c1b6ff68b282ccfd1d89659bb33f67fb7c16c30ef2af314a865da1f35d2e7c4f6a3e53ad9e6401c61a7225002515e797972b1f93ab190 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
19e03748b6d5e9d42ceddf60855727b37941bcf807d040c5705421ad5e9e11d80118fe5458107ea8316a4f1bd4b44ecca314bf47c3b18bdfb5cc0fc2a241a1a3 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
036f4217729acf50a4065698d5972dff92063653ea969a2c31320fe585ba308aaa7f1ca2143cbae415cea0f0f343d26f20fa5edc5ef9c14a8e1aa02208655461 *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
752debf045e6c0105e80fcf02f1b3218d3c44af4accc4cbd9d24f68937253ecd90161e8be497aa2ff16edaf051230d6fc4ac4df4d3c7b1f2f1c2260b62523275 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
bb36acad70b528d28ad096a53bd41b83cf6963dbc8578dcdc3b3929ae2ca9392003bca1fba46d0bcdca975744a1febdd6edd78cc5d6a9a675466a92ca2b700aa *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdteGYAAoJECyLxnO05hN998wQAJ58csR7u39piEpumRLiX9/Q
pGJ6Kmbq1SrmxvXsDOAUPJT53KWNSuTll526Joq/a/TlR7NEx/fxvVi+cOGnNCmj
HdxLNoaExeY5HCDV1/hc5x+3P0VDF5wIfrN2YHh+de0yNXmr7cr0lgoJlR19dzf2
LzlKd1+8DcLc5JyZ14+Fv7WKeFvWwEZNY4KtRNrEXhqv7wX9b1snKVy5AqxGEHoT
1bVdt8uiiwvDVlTTKEDkc6lDNkaY+V3C41CtQliSqjzbJmfJYbGDuh4xGo+kf2l4
OBSq38jfF23wSzP1JEzipPZHKsxlm0rA3RuXYLWOO9UP1AMR1esUGiQ7Q8+iBebK
SYsju5AYfgpyrgC7C0fop/IZsp0N7sr5Mp+OdjHrkOy6TNNDtVRdj9b2yQuKu6ds
UQe7MpLY/n/PRt2b05xMiIDNOe+Juf4vvWuARXGYec8nm7VI0v/Rf7F+BF0XNvgI
bI0wnlp8YPbkeCRvRv+IbzqhL/sYLBMay2j7C2czxxXnSlWcis3cSUDfFF4obw/g
SRxBag6/Yr0kXYN8vkwpjbkZXBqdL8fVC2RW9RZ1CXzCxyRyyQR/BAJg5xUIKuCz
b+RBC1Lbp0AsfN+NnnEl+QZNnnipz+S6yJFNjE5c1q/rbJSEE/jeUfJhstc80jpk
r41s5ya+FBzxIX3SLUsp
=vZcm
-----END PGP SIGNATURE-----
```
