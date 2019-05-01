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

現在の 0.7.7 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.7/win-eos-voter-0.7.7.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.7/mac-eos-voter-0.7.7.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.7/linux-eos-voter-0.7.7-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.7/linux-eos-voter-0.7.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.7-amd64.deb
426381e0251a0218d3f07fbaedf6204cd2724e739a2350b811da9e20a75fe8786f65fbb51c0596100faebe1d102d0645316484c4ab18e64b81cf3128c26e9297 *linux-eos-voter-0.7.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.7-arm64.deb
2bf5a90300ebbdc9335282296af90e39e827a8e59d8d509a25272ec5f02e4bfeb151bc76c575ba2a5ddd176ec1c47d8c23211711e335ee9c445758f49669ef39 *linux-eos-voter-0.7.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.7-armv7l.deb
825b71330c2f49da0b1e20be3e62182decab805cb7c48455a16c4ae16b6e075b787cc22a2b2bea43b0a74d2eea0c42c0b95352bcab07ebde65c84a012fc1c643 *linux-eos-voter-0.7.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.7-x86_64.AppImage
e3c0a549204b988e16443c9b04c7e86029c7640091e8c1e9c6e70f6780ce6fb3d436731bcee505831231bd691462de7dfc10d4098e94cd9d3b3dc2b572ac0ad6 *linux-eos-voter-0.7.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.7.dmg
ffbd403ed41efbdd4d9c76d40d620594522c69723e0731bce14a1facdd13742c708bd3524ee7c121961dcf37ff28ea45372283b4a9ac7a910466ac9af8597570 *mac-eos-voter-0.7.7.dmg
shasum -b -a 512 mac-eos-voter-0.7.7.zip
560924b5097411b81742f4b840a5f6f0873ec55bdab820695e4afec6d7dfc4a1fe84d08c1664edc43e47302f6a082f608079978618c65ba334936ed5130f86ba *mac-eos-voter-0.7.7.zip
shasum -b -a 512 win-eos-voter-0.7.7.exe
59c1d612b5a8518659c28fd155ee1e8b7420929c0fc55d64f7e2eec4d9cf17d30af0d0560cb788c6853f48ea88333626286e0a08e11cc5b4383dc4f61b52f83a *win-eos-voter-0.7.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcp9AgAAoJECyLxnO05hN9HsgP/2Ct8rrz21xoBLSSZzisLmUS
SFsuzQGSXMi53izfUWCL/6Ruj/U2Ptm6ShNz49eyxej+UQGlOEZIcomhAocGvH8q
f59xkuFnHWJU1BVBLYUDWF9BQG/wt58VAqC75UnYsm6GI/ksthVJ+2b7PyWTdVyP
3mcwouy5JlEuKVuBN4S/doDoT58vSQAY27fx0E1O7VdVFeZp0VV4Wg8IgBrD4bbx
5Xvt6j4d72IpJRp5p3Jj+EVLvGz3rzAjJWv7aAzCnSHrLaCeR3Chq1/sgkrNQYw7
GSfG8IbitqxM8I7mGO9xkLCPn7/EdoQHXsbHJj+PEtKTlKMHfyKpyFPxlygz+JU0
6Ikqxr7VfpbSh/pBJXxizfnHAHNxEiBB1Nytl17gbjZfjCTfPIvDgAFiDJTvEbqm
uZL/YBAn8rUfOCD72MdDK9aYODR2elS+J8iDl238v/1b7FIxd/bwarWCB0bCdUfT
Nq86nhjo2ROaATdnr4TZZaFeF2KnJ9J9hSbThv0XKZqFBP4rjracSvj5aiL/3AwP
9JwUNfJKvF3ardAP+q1k9fJUhbh4DjpXqUf60Q8k++XzSxxYkpI+gUyhkKWGPQsp
aPjB1n+34N3KVbnA/a5JuQgGftxuQJ27leAHLaPxLaReIUNn6jHmn9wTTWkINWRq
zWN8uuctBk5y6egCWkwQ
=pFla
-----END PGP SIGNATURE-----
```
