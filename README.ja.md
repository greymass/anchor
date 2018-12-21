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

現在の 0.6.5 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.5/win-eos-voter-0.6.5.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.5/mac-eos-voter-0.6.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.5/linux-eos-voter-0.6.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.5-amd64.deb
7565c92cc47fe587d0d07757abc62a8eada15586c96e55d585bf7689ba80815613095895a54402b1b489fbbb3dab56ace4ec28dcec4be3dfe390555d48ce1f4a *linux-eos-voter-0.6.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-arm64.deb
03f072ed36916249c1d4e221e6e8791a106946e292d16404064e704be6b75616c097cc15fb9710540c4701123e5faeb9f7afb60e4eef19b13a511b75c3ef641b *linux-eos-voter-0.6.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.5-armv7l.deb
a14fbdc2c76def46ab6cc47c8612c2927b09091f9d1087877bc422e1e1062741b8f08b671fb74ed3f50c00748f33cb155e3b433929b3ba60f4277be9c49cc26e *linux-eos-voter-0.6.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.5-x86_64.AppImage
d76dad659929d2311cfdff980ca060aeb93e38be8ae9474f45ae47dcc83a556875671b4b3827bae704a3ddb80152aba76272e37162113c30dd5818129dfde981 *linux-eos-voter-0.6.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.5.dmg
7169ce28962a2e4b45c2010b7886f215133e3c3e0f99dc81f674e55a30ab5806d21ba987bd9fcd2612ff668c2d077a3de7b887d7acc9fa7acdd3569c8d865d33 *mac-eos-voter-0.6.5.dmg
shasum -b -a 512 mac-eos-voter-0.6.5.zip
bc9954891f48cb0606e7051cb96b98e5592c8fdfe2bcc6c32411da41c0ca47e971211e2dd5eb601c452f813206fd63135659ae9b2c7b1213065d0d2c5ac960e2 *mac-eos-voter-0.6.5.zip
shasum -b -a 512 win-eos-voter-0.6.5.exe
a51234b9068e3beca91b89995da754857e7834b4015e5d378d870004511bedaf4c1b75e2c3c52db1e95c5cf8fd35fa1b47d2c27e435919d8b1520a28329ad824 *win-eos-voter-0.6.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFGKFAAoJECyLxnO05hN9sZgP/iy0fF52PGjNN8RBwGzRJFy3
1nTmOIIHdW+cJf67gVG9NcTqyqB14CO2aIJRegjbUWQFn42//GkCKhHXyNLiy63k
zXX1sy+hn0zNa5jOzZjCsOrPA/jg4keUMU/LdwNkzAuESUXy5GRzrUAGHScdmrSq
4lTfjBS8h1OPDURMBk375V4V1W+88uSwapbLGXjLfDqMpmPS05mNf+N29w9sOTgI
V+c5tgS2EEKSMoCQoDYvlWsTvcZUaMG/IghyruSi1KYh5CPJ2aXGoj3VZ9GVgply
ePxS/8HEEpzkTPUpn/QxLa0cz1Dpz9pXWdz0Z/+3IAymrY/bkGcDfnbc1nZMwM4Z
xGbHMlJ8Fvr8lc6Vwwe4bLCaq1NnkXnC4eVYNpNNxQvtv9bAjaeUzZ1VXS+BPrft
rD2cu7NKr+xt8QSqUg8jQFh/mP9odhLa2qGSegGfm92SwIye6kzLcb+DsskVd4uJ
T+Y6gqDCaq62tchq7waNzl3PoqFv+wkmgqceJaltacVqElF9vlBU1SlSRt/wO7+h
/ErR3sBRM8KMoJDBlTVolG+teWnR9RmSB79SyyHxSMindYKho+GNyb3G0hJS7USy
8qUD4yJh4+WRkskVu4A7mjxOxNaJIcmjG+bbhTjOIgaaz9VCVBX/GXRlDjuqPWwE
Zyym0JHDsppfgfMh0brG
=TkGu
-----END PGP SIGNATURE-----
```
