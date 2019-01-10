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

現在の 0.6.8 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.8/win-eos-voter-0.6.8.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.8/mac-eos-voter-0.6.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.8-amd64.deb
7cec380eadf243789c209c13c5abb75c6056118d6b2e566245a4e7e33dba1572feab6ee4255e0ae353c2b49b85b9dbcb7a95525d4524380bd707497c949c12b5 *linux-eos-voter-0.6.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-arm64.deb
8737c70289e9779e662f069505b2ac05c41df3bd0a5891b3859a530461a6eae016a3419498d60b3e1d56728535106f7c6a8d19283a1f572c5fc34a927857e040 *linux-eos-voter-0.6.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-armv7l.deb
9280b6b880c8b1133f0a7905d9ab9e38ff1a7db4f69bc143a88d17738d33f545568dda6f9b6d31d5beddd62ec248eb787e002050f568d246862311c785356e2b *linux-eos-voter-0.6.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.8-x86_64.AppImage
66666a5b9e9fe0970af50c866e7e065177b27e866a448bfefab73b27cece82a0081279c934bc2ab91b630091fdc7aededd39de7cbca8f578ef5c2332c55b6370 *linux-eos-voter-0.6.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.8.dmg
38469b173548ca7f33ca250812aae74127edc93e45f4411e2230a3967320b409356107ec79be39342505d34eef9eeff9caa30e60d3c9f578e4aa7d936a7ede37 *mac-eos-voter-0.6.8.dmg
shasum -b -a 512 mac-eos-voter-0.6.8.zip
904b4463667cb873f7b89fe2cb606c95a7f39e1a76e1ddede0320f9bba4165bfb1a647c6f2707d34bdf32783c2c61b84711d8240a055c4b97eb1302efb785330 *mac-eos-voter-0.6.8.zip
shasum -b -a 512 win-eos-voter-0.6.8.exe
36b5fe426bd450f7f0d1c57cbe86f80ee47508fd4db483e3abb728a6e51eb6e24652ee4f857845418dac2efde5dbb20892a2ec36507b2d77de7931dbd53ff30e *win-eos-voter-0.6.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNutDAAoJECyLxnO05hN9KeUQAJ2x09eWhlwhp1hGVeqftLR3
riczwU0aChPY4HLSZ4VNaK9Llag60tc1yhz5dVB9+m5nblbB4h4gDFBIBZ30Wh0f
sM8DDFDg3Tou6lxLx2qPKN6PEl4lhoY9h8sxgsd0X88/EkgLY6ihfhID+r55T/nB
tsVIaufadm3rNVAkoixrMfb1hu0FkLrjfXwA1v/h8lU/4u2q2nUd1XaEvqBofoas
4jQPmBB6MdoNTL32eig8Z1N2aItRuzqBnkEOpwGARkSdh2aUhQFp1DCNmyaImEdI
/kc/1Wbxg0mTvb6ld5yOo4lz+LmBDwUkJYntIHWmiaOw24SdeOEAmmM4ew7o+XRh
aeuPuF43Rp+VNqrz0QNa/tdVRRzbLOc0i4/fXYZ3a/dUwHV4JNoLoiYyzpwFexJX
vNFOUGrNYFqM9ikX5+R9E95cF/gJJzV2BtTPD0xwprUluYda15XFlTs+Sc6Hsxq3
JTBcuccHeiwQ/tnJFa9aXc/EEzuuSdP6ehkc5PdFm4a316lTLDOwcyt/tw/5DVvN
wSK60uEFz+HO+mKn3coXQGtoAczMSLnNvGKGBIowDr3EzRVt6gUgnQV9DzVm9x6R
pdATD32QHBYfxVpCW/y72hV/jtSDEniPJRr9wFD2L8IlWNPY2X5MKVDQlrXEXtTX
sEmjPVwH0rkCgWQApRm1
=DXcJ
-----END PGP SIGNATURE-----
```
