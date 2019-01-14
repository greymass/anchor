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

現在の 0.7.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.0/win-eos-voter-0.7.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.0/mac-eos-voter-0.7.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.0-amd64.deb
45dedca9809ee0a280cf173785a1e828d70d031fb490dfe15143d724c000d90c5a616e6210d1fe73d9a5a2eb182da90dcb50d687fff8828e606552799738ea5e *linux-eos-voter-0.7.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-arm64.deb
b0c870363b2872d1aada4a087c7b116491c299bd4fea96f05e0d3e81f68e932e9b604dbb6e0073cd511f9c0b7aae03bf9ca281ac4b7a2858c8e64ef386d25dce *linux-eos-voter-0.7.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-armv7l.deb
89ed394b7e4f97c834eb883d4c96ee98516fd3f534973872c1c0ad48e380e2bb2157fbb4081cd9c1ff90cd0eb89f64367ba1091e0a078de8db41f89666aaf39d *linux-eos-voter-0.7.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.0-x86_64.AppImage
ec87d40caac53555643fb615de9674b8edefa8ef71b93c577a26c8b3c83f6273abd88809785c47217d10d96a37695a092d067c420b831c7ab13bb4adcdc001dd *linux-eos-voter-0.7.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.0.dmg
0004b2c1f7f3e4f123ebccc12012b21259d26d01a0a67be9b03216ab2846cb9d885bc0fb1ddc589f153d355290859349a3f181e3796bc069f6f36c42302a9ef0 *mac-eos-voter-0.7.0.dmg
shasum -b -a 512 mac-eos-voter-0.7.0.zip
3ffb82e66029af626f6cd099d4883b3be416fa21c824cb446cf80f58871e4b441b400446da0840462876cb2373c49de16750be07dd1c81c369b3d0070d989eca *mac-eos-voter-0.7.0.zip
shasum -b -a 512 win-eos-voter-0.7.0.exe
463f99128424622665111b9e7d9dbf09c871f3067df31d44343444771e9a9949a06536f46ee9079b46127bb8084a6f80ea2f953ca162012526e22662c2d65353 *win-eos-voter-0.7.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcO/J6AAoJECyLxnO05hN9IyUP/1I+N45d+/71Olmqf4o86c4H
F4MaZgc7rmaFMPemq/6vaGGvHRV1CYLEmE1Y5lFXNtVKR78X3SoEA49Uxi+ArYbN
g6YHwel1PtwksC46nDwicxtFf9XJxab7j0Qt9VkVPzWZDYMIu0SQeWHwDhKHpWyk
b/SfusjR+aubdeYbMw0r7cPMMKuhdy+u7oAhxJMUCcS7eTJZ7D3a7QK6awaJ5X7+
3y7Xy6XcmTULcctA3xjwMq5M/CcxLnTHfI3wNwJnKJb2u5WZFgsj6To1A9QAlcxJ
gklkJ5dvJxdHnHs2ed75oFVzsM7uzNzhJQgbQQpdskKmbJnMHkg6g+1RTIXDps4A
6VnQdib/34SwL2u51WX1T4tFCCWWe9MN54fj78li2iKbK2mQZ6DazJD8TEZ7QxCS
x/umbevTAryTvEzODLecN/PgUsjdSoctpTR8XQsIwR+0i6fNjEj3JN3DovwNzWuS
Lx1n6+Vf+el9DAABdL0ov73ONtc4ojdbXWtfaJJoXusAXOD9md0hwAMkk9c/VeuU
xtT2Rk2pwVKaXf31sxE7lwHI1nfATiMGuAPLUafrH0nmE+HfhnhzHEXqXCjkWgm+
AfJoi0lrOFUegvQN6HI0tnKsulExK0GMTutBVcfHEljTITENmaKAXwLcJciffWTy
r2qlPmomqiwimaxACafo
=XUHV
-----END PGP SIGNATURE-----
```
