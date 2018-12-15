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

現在の 0.6.4 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
8094d3daed5c7f2e024f5e9ae6113644d7ab3bbba87a8225ae4ee972c8970ae07f40058272371560ca3eafba20d1dcfd70b16a66688a140c28b485d1cfd30a04 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
e9e517c2a729050e8b998aeaf84818e83cbd94eddecac60d68b011a822ed2d8b8b0b83f4fc9ee95cc3c681fd98ca3275e228d3471132619090ae600b4386bfe7 *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
645a3ef146bfab32e185f4e8412bb4e477434d1770b002c8073b859710fc0d21b448f84a641598a8703d58f5cb9c68841c0642d3b11006b7f2dae35c7cdaac06 *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
0dee015c92303065480fa52b4a50c5afd58dc77b930fe2c50693760917efc1c4d7b9f6d288ec04ddd45e21c7c2735458e9093a5e8b40a7f74983b3901b240f4e *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
ba296668f48ec9f9bb53fdee35be856da00068b7b98bcee0d9d3de4fad73f02d1ad42bc306853a724df22ff148c659673db8135bf633d10add61d3a4167810af *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
6991dc61ab435b389a2903533ab635f835618092d9465f45a35ec904b3f4f41f9a1397059400f5a47cb5a0a3ad67075db93f2a105e648472953833abd6403841 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
4b8adf916b271d76ae402f4a10fc72b3653f4dbd4cd345429cdc16b1981d24641897a843c918c6ae7bbd2ad6651676b199e4a0e752d9037c8af97a95184e3f6c *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFE1DAAoJECyLxnO05hN90SsP/RNQl5VS7r/K1ACmURIPXhZ7
or/gKDdxKJyYIsoZBnV9a1flgCqTw8QY67LPiVdUWZcKNdzfsdrZ29CAtyHG8EyS
YWUvJ7UbjGNoQU2OLAk2714CZuFfOdxM47YVVJxhduZL/d49/H5XcmFTidpXqoVW
7I90UAiVkwPZckqmI8h30wIodtPhia0PiGkr9S3ekD7iUuou4Wxcoisxqb3ZpbXV
uuYoUJrFKJKN2ecNrRoF6yDWEudPislfdt5yHe/+6O3ceJf1Q2Wyul9YybH1oS1M
MShkcmmt9weB/lgHnIXPK9rRKyAq6OW24eOt4xB9DQMEy5P2do9BBdj5ba0gCdhR
qMA24V8vJDw0lAOdOEmeApntwOg4uBmmFX1tKLYruoIzj016ej/4uEXQEH3tNGDk
b76MJb0AmAdmQfHJjWK7V8+WGfhxeuDzzodd1270/xP8ahzmPcX3+vVnl7826/5h
MlvjN6VdUWLIVqItHloPErLa61LjkiZ78BPu89CcCzGbC85PuyZcLpcYywdfzS0M
bPXmT7nvV/Qnyav1GZemQFhbTRx/XTuHema3L45Sls6kJRTeoiOgIZfBjiCpTez8
sYycJ63TEvPlsJdusDU9uffokrV3fafWK9xiB7EoFjzt1Z0TUNCzkbRZVy1mw1tP
zJjiN3L8ZwFMyNgc1JwJ
=ht2L
-----END PGP SIGNATURE-----
```
