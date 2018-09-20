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

現在の 0.5.3 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.5.3/win-eos-voter-0.5.3.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.5.3/mac-eos-voter-0.5.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
3acbaba16be8f9f3159933aea50e5ffe39e4c9daa8a2ce820b3424f5e630093ea80b74ba78b8f50d6e1a96cb650fc2c619b24e7d4f3eb3685353d9d2b1507dbe *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
166697e3cbb2a7d1a2d0b04a90876d4cf22d0f08596dda4f0998dff8f6f9f965084d72ef247f776936fc0d483e49845f38596eb0ba3b899c19ef499985bb48d1 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
3d63b30b288f8e4fc65455dab6c3d9c64d2806eeae25b023f50d8e0704eb3d9f40668a53972569b22dc24e63d7f78ab01128e7dff5c04a290d2088a749866c9c *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
768c5e525efa87d02f541156ae50adfdb1d26c4b6a50fb5e1a70e29d5fdba71abe4eb550feb5f83dee4ba6c29e50ef47b235359a1db49871dbaa0c1e9f426369 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
78ccc6118607a8c548ece91316111a40cb1493268cb806dc4c82298002156461d4dfd5f48e540e1270d3c1efe8a4acd0cd0b7853c961465d76bdc3f264b4c96d *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
56fb53f17a6e1d2582a26b4ec9567a31ff886f76d64468a575de118c54c63cd72e38797a6d62212a3bc006d06f317fd8fa8e3bab55946737949ae7a963deb757 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
e375ba191a7aec80b850d44d4127efe4ec3921b39770f7345867e2328cc0e637078499c374386a3909ea2d47f00c2ce7e6c3f557da9641e7af9752cf615de761 *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
69c47c2641ceaa1530108637692cd714efffbbbe15b2835bd07611a94808e7f4c036d142cb02699839be285980e3db5402e49585167924d2ef5d3c0ad8ed2c54 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
445c20134561e8191dba778b71a4688c7c1fdc0b39148c839d68aa1ccb6b0b1f82226365590ae50378fcb416019de3d69677253a5404db55d3aef465d7ee7e11 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovcmAAoJECyLxnO05hN95C4P/3PYiF/AY4BnVUmGVNw6ADQu
W6bOFaNGBtKm7a1mhiBraNrfWmYtVbpW356iqZU6ERFQ7pFMu3v8ri7NDNUJFG1r
cZMgxnDyPccRa4bl000ayCfOpbLh3hnV9nKMFCCDLw3vdr9pQlHUkasWNoZym870
uXBQQqlb3yegwk/0eNhu1e5veLlrXe/6Q+NmEQ0XoS17dUYYwUKWTgHvnj3A/n/O
HjX3MBsGEvxxkGzgWJwgWze/u32HuGbL+0wiKfVmpZ2QvHnJbybuH0c3vmqi9eCU
HkraI5HxfJb/Wl0wJCUVwZZ7LfsL1AmlIv3Y5bC/J7l97Xwtz54enV6sdUFBo2vJ
n59/j0rI391mKgbXX+NyL1wL0oaZgogv+3BmmxF3g1M/1uTNVUyElKAHiOfOkAss
IxXdW/FANfEj6CiO7lLrs5W/GlubQM3QqhUX2NOZg2zFPIHZ6DcpWrbICEJgCApF
U3Bfy1hlQdWZ7cxmsFvTUU1fs0ldkR+F/ceV/bxLGoHOi1iUJi9ybhzyKezvV6uV
fxLu9nLk0gZsgKFoTQrwjwe355BqKjDlvukCm0ivVc1mZ7c8nyX6mQwkCQputE2b
wXo9PtXFvQCFjDw3Setd1InIDPlocwqJtp5+CfEgpAXdO2+Q5Ss3dNr4YX71tXIe
c7BMQi4jsvkWBkruLqzj
=rC29
-----END PGP SIGNATURE-----
```
