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

現在の 0.7.11 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.11/win-eos-voter-0.7.11.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.11/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
3543bfce0ac2e452ac82be539da1ea35ffecb5cd2802135362570f44a38fa46290fc42d5f80546024d3df0edef1bc90e90c6031452c2c102aa153933d6684de9 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
1d70270a7f37f2e4caaa3fb2b5df761091dd6c711cb23aefe87965ec790b1cbdc46bc3079548d862e803e3e0e5887da69653b98959c3112aeee9fd4152f3d874 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
2e6f10ac7ba5b5c43d1f16935e62d34c922cdd48f4f31e6bb1d697e2e35cc3473b4e083e4bdcac34273b81aaf7255ec4acc2bb42f9c0cc3dca8b9bf516cc2f74 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
6fb76795a66231a8809acbad2709edf94789e7a0cf36a2fa3a9defc472c7f4d70ec4bb0d9e458d8330fa384b5c15d64c454cb429cf24de9a679dfd89febbf634 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
fc814169319bfdf91b52e2f5ac18115431734552f8c18dbf8f43367113641946b6670dcb7805c1cfd9c37604af5adc0013e4634732d6abc450819e0f7b26dc3b *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
eb6e193ce91e4e1992059067f985595d7ff4da2a50e8c25a1e1cbc3302937fbfcfd7e2b3117f776b690a9247f0392e4035e7f9c78e2c678497e0f308c6154309 *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
97edf7aaac9a0265f8ae21d70ce021294ac427342353bb306f1b87cb19b10c1f8dbb50a1b51807587ae4c40dc92fbe06f70053343b93d54b2ec2675569dfef9e *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdQNYzAAoJECyLxnO05hN92H0P/315x1SHKABthYnHbDj70pqe
rkkHFNSfGD0kiAkeAqCh8gPxCcMnP1xqMlM4cMnY2OHwOt0jjmQxcixcIrWZdhmA
7wKTvLa/A2OfinRQ/+EX6K79iSTjbLYYDeuS9ko4eQNLcPFJ+gnEx0bjQZKaVtzs
A8ULSWXpWqOZ4mR9ZH8BkY9RO4zhFEZUzp4kmGGeJmDWKbRq5pGuH7713XKwewAY
ZuClxF5slcRcLvKx2H/IJgfYU4sPK8YhlPX3Kkr3spKJs3pctNyBUxsadmjKZ/1C
gXWKpjIbFOQTcoetYccdJe5fT7vdKZv7Fv7SszCRLAUEMyZxcTW7f6nj46hIKsIs
PWgWegdO6JCN09KC1zfslTv6UpJI6uSb42CPq49EcL1FKsJ2X2B4sA4GLmwmsQSx
DtEaZcOvnC46rCuuhEZx7EXRPcixdIuuJosqv6qn2KKSqU2e9oyLfcPKy0nQ7H+p
DBp+1kbEp5bd/QxSdaGE1ohOH2Tf1JNP+fWSXOiRh5987IC9xFOtl53hv+P/nTlP
KdUo5l2UsjR4qv1TrFUg1s/MeMk+36ZSMkN9zqIG/nyMn2/EwGftqb3xqflm0lu6
fcgm44kM1bx00DdRAseR+Wa8aZ5SR7ALKewvQU6+3br9hWS5lkv9vdpzdA7oWXHl
fcHjrk15VeLqUpVLiFM1
=7eTt
-----END PGP SIGNATURE-----
```
