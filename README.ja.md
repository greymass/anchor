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

現在の 0.5.3 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.5.3/win-eos-voter-0.5.3.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.5.3/mac-eos-voter-0.5.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
fbeb348c4af96d117e1e0a9234a6b436a5c5dcdf48b2024645cdea0501bbbd3ebb671dfb95c73f63e8f0ddea9e605032afc89d23df8e8d446c68c4122e158998 *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
e5e1e84045510a4e610fd3e6c434795ad658dd7d530cf56f3da2d26d5639b5beeed5a1a3f6ae153958e0be0fb7226ce8948bb34106795ca798142f42b96eb193 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
c2d1f283327e0edaf0c538518598d913d506f9d6ebe9775e8cc74939c01f90e808173ce10529bb68c77a479899dba482b8a23b68d80b581ce0bf309fe27a4555 *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
85dbe1c5e6ef70c22ac43237751c1c2a1282260b93fbfb194316e9a7c3d2aed99b01bd760f35b7b9168c73b0879c373c2a6eeab77670df03c935bd8c0f406414 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
8c7ddb6969fbc53125ebc2869350f6455613906c66282fbb8bd7823a5d47bc7316f9607255ad7e814da6404c943d9467f426f9b2c5221cee98c836155a9775b7 *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
0e41926e7a131a37d8381a5dfbae6473969c9894d1b958ce7b7f0168a5cfb83637916d9ae1e684075bbb8564d6f22c283dcac7ea45adf6fe84bca497b5475a16 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
71b88ff2e75b651767143323cec7057a766fd35fd9a8e8a0ecf98251d35fd5794099c293e1dbee5a90e7141a6fa063d5d08d65e1f4c40a4f3916bf71388f4585 *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
33073469eeb7234d9262fdfe40e7d3f0199265e831cbc20d88986d02918ba6a295bc7533fd7d878ad18c03ae4d6d28b34d98976fe11f20f09dab94eb03de147e *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
48461512a74cd1d0f9b6f7ed8009b7625900e4c1f26d57dcd8b369cf15ce8a806a0bd305f17a814a09a91ee0abc0872e451673319475b9828f2ab4d9da92f9ad *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJboYkHAAoJECyLxnO05hN9Xn8P/iy/dSbQ3yrSKbhQnXdb/seH
7V7q/9ndvulZHZUuMPTb3vSbKjdff49THKuWXrEw+owyhAywDkv+nUB+F7slNnFp
pJ4V/V4r0l2QNb34feo0k15WlcmV8LzAxvH4fPf2VllMiLHNJvmA6afFt5WpMPjl
W7iJI6upise1ceAfzwhPKYC3vdAgvcEmR2rmdaMPATnid7u61vnJnfmTt5DBOsj2
Qt7cSOQy9zURMywMcQ08uPojSIIGQgSyjiWn9MNWJ5n3yyXnQ5adbV8/po25HS3s
ihlt29kjwR9luf70SfkjWZT6kJGBa3gN5MFt8zJxnTkwjdCJhd8ugH2Brq3nTOD5
z3f+D8lWjFVSB+n78YWjIEc4SN29CSkJnXVZGxKEsOhYE3+/JDLm9lE53LsHNFBp
R1/YAS6t7LkiDeY0VnnOUAJ1jZPzq+hgoNmOFS93GWlSQT9wjgj8bu0akzKij4+x
y/o6TnHbp8DVFxzZvszARLMLBEpcSaM+dUwnha0O+1JlZhhE/lEuUk8VIjqbl7AT
yincUP9FIJLeC35vYcyFObht4VGKuq5OWm7coK/TXFB9SFc4+7cDRTKTnDHByLHc
wNyzad8kkwcGZ+O/kZdGtyHyy5FR84mI1NE1t6BVHQrJY5IKuunsKTg8RG6P7iEe
GuYChabPGlWXyG9Z23Iz
=T+K4
-----END PGP SIGNATURE-----
```
