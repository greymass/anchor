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

現在の 0.6.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.0/win-eos-voter-0.6.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.0/mac-eos-voter-0.6.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
d4ef6a69f5e5c5bfacbd96f0009552a37ededa18663c7c002af3d19e22dda48a46f030c7294e91b6d6fbc3dfcf75b202a693563a97a944881001c01711b6d3ef *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
7722e90db10bd53984b9eb7e00ede8595bbab9e0ffbc72d0acf4e8ff79e6e771a64c3fe4e2514bc8d59bb34256e4c0072beb633fa713720507fcd62b7c2924b1 *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
577ba5d04fed39cd5425af8718e065fb712d9bf62854811beec233053ff5c2d1a66ad2baf50e079fb22cbd2aa0bb0929b513e7f44258ca986a71f340619eff3b *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7b7b5687b3c3f8fae4049cd4dee1b0b28a6018fb98422cee7d3501a3f0e949e5de0d0b98ef48d303731bd94a603a1a7cfdd717df2a3a4f35ad8b94bb83ee4426 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
shasum: linux-eos-voter-0.6.0-i386.deb:
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
fdd898c8e6a97857b72709bf01e21e74b77ee5dacf63972e7473a19296940a28c34ae2abc33d14c4b411159a58acd913e7304eafa483ff7c49303e7fd344e190 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
d5f38d3bfbe8a02010b2f1a633f21bc08af68b020ad747c0cc2f8a92ea4160ba80537061a9ca643b7ed6e8970a2f9369be0fd531d390940e1d4b0afc6ec6c0ac *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
16ca3f7e145348c4aa35fa0f581ff25a6e794d645e6d0028bcfd16a0dc628c1501951fcc7f27578a17b1e3aee190617c47f78f616123af4a813f12b600f72c48 *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
3fea6e514faa56eb3c2abca1d31bf857b652f0dd29a42a260d8af814f14443494368149f4cd1d4adaac4b43465f53e1ce4b845a2b95a4e99aa9a800ea7565e67 *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2MQgAAoJECyLxnO05hN9OzgP/AiDx9Rt5V7F4bBlvN4LEHVG
y2XOnxodtPDyD3dPInn+bFnWpqIajjxSbhFwvnjokFmuuGKLtuY0oAKz1Xiravox
h5+Is8E67HgGia3scnL8qMpax6UXX9v56rQfGGUEPHUqXCRmbMhusEkP1jSCvsjQ
BICVnEWyGi4afXR05pAZFckqg+bQhbjvnimMH9UKZh5zFOcXW6HA4lgSKGRkcXC+
YwA3oRnGPetnDNhU9oPQuzmtFGe59HrU3cIEDer4rwzxo+e0dYor//7yWjZihYfR
ZmnS1Q4h47U3XkLRWbQBOmRZKgPAX/4Kv8bKRWearR7H1UQIRIeKuRhlg61gzxTW
Ee2oGs0F+waKbVXS2UDoVk94DUvOoGu4/PPUM/KIhYRMYuB39/pO6sxYWtmo+GEU
39PqrlSnCTr7YKe2xuOZNUQpI5CgcXJd+HphkEpbHsh8S+/Gv2m7QS9IGy00DOCV
R7sMRaXKEorFiwt1L2JHrB6HWElzH/zmDullH82T/E0q6wq+xi66Vlyj9OAoCUfU
NGRHZxftulaTX5zOxnRJvlzsRluTYHvt7Bzz+U4N0b0SZrHLlb7ul/LkPw9OWn3k
9YiFq6QYbXHc0NKLMgc9j3S14AYzEZTxEzcJUAm1dxI0jYPCc0M4UIv3ViRK4PhB
CvdJUdD65R2Q8sunVnB7
=SEwk
-----END PGP SIGNATURE-----
```
