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

現在の 0.7.4 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.4/win-eos-voter-0.7.4.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.4/mac-eos-voter-0.7.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.4-amd64.deb
ec117530d7a7cd540e1fc649d1c6914817e900a492651765518b1b65624d6ee0dfc907ae9b8ee0fe2087cad66e392a4bcf233c5e113191792cd648d9356bef8e *linux-eos-voter-0.7.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-arm64.deb
5ff0fcea3ae45400fd2179d28b54d8a282c8b36682d013e78a3dea1c21261d48c9a5412e72e4cd51b220fc44adda192958a5ad0f992027eee49c12d7bc5f0759 *linux-eos-voter-0.7.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-armv7l.deb
ed1e61e8ecf846321d8ef5d2df1bdc80e90e4a97544eb7cf9351b4753ee84b75ba420c1d7f106846f7d04138cf41dee67e951387e454b930ebff6ec112914254 *linux-eos-voter-0.7.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.4-x86_64.AppImage
4301bbc3b05d67239fa2d2bd20eb5f83c55ab339ce362ddf3c0e1903ef2eecceb916c1bb713ebcbfe2a45e08a39561f56fe18613dd5d2a8a032f10de35bac86a *linux-eos-voter-0.7.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.4.dmg
3059fddd190ab7e1c727984f8ae6ce676c56c6fca33ee7631396565a8c158a11351edefcbb85dad7bdcd602399337261582d1495e3129450925092586e7923ba *mac-eos-voter-0.7.4.dmg
shasum -b -a 512 mac-eos-voter-0.7.4.zip
1228177f2f15d83e52c029dda3ac86f851b8ca1022ea96f197235c7894b2a8456dfb195bf189303cd766d369fc2d6d84c749faa41f39aaaf032c3fd3857fc07a *mac-eos-voter-0.7.4.zip
shasum -b -a 512 win-eos-voter-0.7.4.exe
3b7b11c18c6377ba804815666197a4964cacb90d19b69a78427013c0940c38d8667aa44a9ed72e421a7103dcb567b9ec5aef7f5f112e76c6a30d22ac99a73040 *win-eos-voter-0.7.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcfCJhAAoJECyLxnO05hN9t/MP/1gGGEMKyQPJmFHsh3u4Sb3/
K6QLT3osrwlh61evgqjXa1whstd1ZaD8GFABPhVIBhYveoygoQSQEfyw2gpcT/dF
7Agg4f6T/vF6OfcfZFUZHN81hQ761G8aZT4mkGXFXG6IJNsHojkM8aeQ6BKMY9uf
HH10HM8L02/KeKUxdDwe38MOvcWPYd3ECCX39Gr7qMmcgz1Hz2HqfI98oH4pxVTy
FrCnsjL3pOVrF9AkCtPvi+FEqgDcmXrkzB7EgSr/O37tn04Tdx7yD44m8evFepkv
N6KKHJda6XW1xar1BWn/FpQf+389XZDtwMdepZP83w8f5UuvD3ADKr8/cVeo3+M1
OzP5WhBHTdbCKLzyg0QUEfME2UHfMTJPBJfC4HjWtbJ5xudyhZa6UtFkiYeDABfM
jq1Xal591ffbkXFVakLfImn5txoM2ib8eQ9efCXje/sKvoKyvS/q6wzNLDZkQ726
akFzBIC3Mvfr1qjrUKXrjzVfq9bKVTEX7uWYgc2jdoskxOESwTaQA9nLtwks2HsY
YwH/CM2TqAZrNlsjRYzRigFZdL1WJV0S+8dlDjZZqMOgYHmv4f7Jb5PXUAKC9qDH
hUSRC3ZDla+OszCKX+nlK9CdNFmkOSlFx0+vr+4XxJtmqrFIzyEVz066fht6W3U1
f5dS4mcxa6gxfr3WLBzh
=OUdW
-----END PGP SIGNATURE-----
```
