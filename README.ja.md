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

現在の 0.6.6 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.6/win-eos-voter-0.6.6.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.6/mac-eos-voter-0.6.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.6-amd64.deb
84a1e8a226b13e37022b9c7f83f409a71b75f519c1ab79592cccabe021fa65ba3bade4d126db1cc890150faf81b9d377d29a629c5ae75d9f95d445b7b07ad056 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
4d7a3cec0f4a4418d6bb77dc52316ae90c9e9d0777f212eae376f18a9986ba6645ced7d92701fd9e144889538ac6e4f7ee74e3d9e5552b17fee5b9b367fec4c7 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
f8c9d41ed0014674d4595c0a8ef5cb6e9366d02f6eaa4112930d1806fd43e644954ea7187eae495cdee6fb78caf9cfd3b816d25fbb11938ea069d1bf46c72f1c *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
4422275f2b0db0e1dd7a2f533c33dba7e4877c40fc5685af2da252a7de7117dbf2a3a96f3fada65f307c9019f2aaea60e90d8341b6c7a42a2fed8cffd4999746 *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
5cf11187d3ac8df5ad188b4287d93b9e1feee93a31433d385fff2f139de297ae0ad77c336b1b67c09688eadc58353ca41dd2d1e02eb164358d73ab45fa8031c2 *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
eec19a97cc58472e637efd722ba734e89a82b76d110eaa8e6ac37841ddcfbf6bffc89225f5ad16adc724d0f747b3da1e9f94680926312a01b6f7660ed065da05 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
a7e5e605640213114c43cbf38a4ea7438e3f53b3dc9cda9556308fef0d9c816b8cfdf1db012e0ebe51ffd91a49f930351f8b8bed4f68752a63f9d088ee16a465 *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIXOxAAoJECyLxnO05hN9CogQAI/1/HwAly+bTzM321g4FirT
+qfFhh6lpfuwbMiJgTPnLUQdVe2WyfGhF35mAB8qCngIUO3wq69zAxa6duNsJHyl
MvcudxGbpe+JADD7zDqGiY9dw/MVCs21rFPLlBDHu7bytSQ2Pdh6Mp9xVlalZmgH
WFg6xBHLy6w2k+xCRUoqlK2qjoU8wkC5YmuTRuqC9UxlYVwnk1SW3Rhe8nuFISz5
20u/Cfe4bVQgWrU3HUpaL2PyhrfdmOlcxAKnsSlFrZzHjJRkQsgoPC1OG2X9C/zq
GV/8lHjCmZl51n2WVWZtAhmSPjwcbRLfKBLYDmDN7uKu8q4kVLWZ5882cRHYYwID
WY3cXnAAj8GjxNepDUd77kHsVw5iTLQq6+UPtV4ASGr0lVnrVt9/bbELpaqpS3LI
zXCRs0sBcCPU+zGJc1G1dsj7SJW6gmGxtQRYLJjeD2q63roX/bHViECvGJAcCVnY
wevKHTlIuKXfliqaavbNoiebVYBSTpnby0Ts5kb1O2WurnomgKoDYeTyKVopTWaA
jtSCkNrPw9dvShnoV5UeKMjJXnFTgdWQ5V/NX/YvLMvl1jdFl1Ciqb8KZu2h0B/X
MkmB+dvyM+/cR+H93LG/Q0lgItm1KQ5Z/JwQy3W7V25Ive3tIUQnax6N0tsnShci
H9AZyacToVn3M4hBJZlq
=uI8a
-----END PGP SIGNATURE-----
```
