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

現在の 0.3.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.3.0/win-eos-voter-0.3.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.3.0/mac-eos-voter-0.3.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.snap)

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

```
shasum -b -a 512 linux-eos-voter-0.3.0-i386.deb
383d2e030ee927c76c54eeb6c6ce13913a0e39cb97a2ba297af15fab45913f96545b2025b986115d01a8ecab14e964749370990789e68ccdb19a6c5210933f5d *linux-eos-voter-0.3.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.deb
1228f22a4edbfe689a30780b9f018bbe1de81e58384350f74039e56d10ec65cca747f7c91971df43d1fe92365fc7f38ebeceafb3b2bee750c267a021564ab6c0 *linux-eos-voter-0.3.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-arm64.deb
fd2786f97971a5a94c1e35ca3a95b6ba8c9d916906ca372e4d705dc7b6cd9f0298921725a6df3e6348cb31efc321bb5578086f8f7171a9af15b6dc0045ae59fd *linux-eos-voter-0.3.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-armv7l.deb
21be6be8e70020b2655bdcadaf399a2440d3e4c9988619d8a9d6c81e16151271ad1d5568452a219d02f2e9ff196e79e349f7ec876be0570e424165e3b0cc3c5d *linux-eos-voter-0.3.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.snap
a8ac848ee23a67ec1749316d1d4fbd81c19525c6a39fc1b22da89676f26d0ceec35689ae3b6feaccec5e6e515466d8b087ede1c057d4b01fb97295faeff80dd4 *linux-eos-voter-0.3.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.3.0-x86_64.AppImage
e55be02a047054de711bf40d3feb238d12485a7f8f4329c4735ce434205f49ff47e95fa0ed32d42a7ee16bb3db7f8f1602530ecb5ef009331af2d91016ae79d8 *linux-eos-voter-0.3.0-x86_64.AppImage

shasum -b -a 512 eos-voter-0.3.0-mac.zip
19e5c689e51c9eb46037f179ef0d93e99b5c02d20d0d8b96171f13082b17253a2a6c53ad759d55807e8546e18f1fe90ace6b84d7ee98e157ccf5e858c1210f4d *eos-voter-0.3.0-mac.zip

shasum -b -a 512 win-eos-voter-0.3.0.exe
ca143a59ceee7b656254a4ee1c0bb3834ab54fd633a87dc3a4d742a3bec56ce0a0ba4ed4384e2c8571d36075acda6ef4cdf47df4e490efe798b8a95345aa1bd8 *win-eos-voter-0.3.0.exe

shasum -b -a 512 mac-eos-voter-0.3.0.dmg
63a962436a6ad63cc7a054d9ca0efa2c0d5c355f5f7b83161d10d1129be234407f46e7a96bcd8bfd107a8b7b05ccb8f0e95457ac38e3b6060985868d4457fdb7 *mac-eos-voter-0.3.0.dmg
```
