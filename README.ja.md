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

現在の 0.6.7 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.6.7/win-eos-voter-0.6.7.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.6.7/mac-eos-voter-0.6.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.7-amd64.deb
f2899ca957d9703ed6b1538e00c71d284762cbc22514b4a871811ad01092c8e3d50a925b237255b4853fdf4029c20a0b9bdbe839e9a41686465770c19e228d2c *linux-eos-voter-0.6.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-arm64.deb
25de79b05c683a6daa0f0f96d63f6974034ce0ccdd169f05c617a96516dc4f5ead2101408bcb60f9133e8e6ca11f467121abc51849e5fccc71a15b1254acbce0 *linux-eos-voter-0.6.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-armv7l.deb
cea54cd8be68cf8069924765a33d23182d74097f0eb3a4ef2fc0519fa06a2f5f33524bc7eb7ae71332a3cb3d98ed4e42b8c3f3c99cd14eec9de38a19db70ba73 *linux-eos-voter-0.6.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.7-x86_64.AppImage
646a208065bead3a44147dc04049e0ca0ea635fdaf8f97de12eda48d24b8371ce17fdf4365c1dce44ba5c18c144a4113321233754049b88fdedc05d12870170d *linux-eos-voter-0.6.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.7.dmg
755b651de8f0c7b160ac54c64178a8de2ea1dfb09e23f5a4c03f431e71a7459719e8c9aa4ca46bbcda93148fc0a7a65101371e20fbbb682cf47608be054fc784 *mac-eos-voter-0.6.7.dmg
shasum -b -a 512 mac-eos-voter-0.6.7.zip
8cff2b208f3fa250823787a319f9b9799b38ee233c7f237891a7a569a7bdc382a8ebaa62af8ede2247e5af71a3d9858db459e88b916278b01553a58cb484939a *mac-eos-voter-0.6.7.zip
shasum -b -a 512 win-eos-voter-0.6.7.exe
f06eee1cc307372219239eda2dfebb6436b8edb1ef8d16db47a9519aa7bd4c2b297f5198825e5702d177674206c53ed032b521783a74210178db8f4357dcf98f *win-eos-voter-0.6.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNnY4AAoJECyLxnO05hN9/ZcP/ivas+Kk4tg2oklVdvSu+jGa
wQUM5HNo+qJMKStImJs1aCGbcXPeTnqakSxUhkgAoinktTskWTl+Ti4thaA5h8Pe
cYg8nhP0G4vnwITjnjMyi5LMRpyXDRFc9q7DA2jxB//ZQkvm3fGb0uZSCSfihpY2
trGGApBjbHCG+Vou/LcVrt/s7KyINOOueiavVCbgA16y9U+1thh+YYddGR4HMTwi
o22FkOw1+y3kA8/1npjsyT92U8pG1ilzGCRAMTUBE5Kndbmv6bdH04IzJmQ8oXvf
5L1vmQpg4BbAMXQT0npgAsxRMMoVmoxcM9UnXrWoROzSC5+5BuKLmrkuh9Moy2I8
I/bsRgy2VyrJwRzMi4aDw4qJNwf4166KSl4jHdPk29CupLDsJrfAXVdogLRSJTKC
nt7qNGSqg2SVL8ramMCp+7z9ioT5nxNwbcdCoWr5KorofzzTJXQ9SGc6Cmt5Oln8
DX5U04+r35vCt8GBdBPDF5Sx2ZRE8td33m0wSabvAZB9va/CXG0O5uFXnn6GklJb
/8rAUb9kfuQPykViy7oky6mwn8WO8bHd6bkaKinoVHCxVfw7ZPCghw8Fz59jkOdl
3TGJnerCfCuEEyzrD+ikBeAs/4toBaK+M8YiabM/5lI+SFwca+aZvUtGngZkjUQg
X+fPa5nLn+vheSCBrMFq
=Ybzo
-----END PGP SIGNATURE-----
```
