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

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
e55fc9fb53d0e8bd25f4e972a5fd8563086af50b6d6386b6597e9fbf39bfa7704d43f1778f236fe5e56b548eb7ce8a01ebd16884e787d68661475057636ec55e *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
02ba35cd83b00d13f3417c2ec7e4de1beae4f12f86cf156131683a067faa44b54c859e76f8aa6d57c245fc1d21437e347c1e1be077d2a319329967a67db23b30 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
bfe806be8914feee01c319d107249f02f755e93b5ae270ed32ef25ae69d48bfb04379d65329ac5209baf2ff082c98c17de668d7f735826fdd6177550d50b4431 *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
fe3ee24882e1ceb68e44536785d6d2cf1b2290a20bf1d721ffa3e36de46e7bae89de43e3bc29b2762b81abc1d1a0b68d0f494d6532305aa9433aebbadfaddba9 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
7feffaeb0b6c1439b6be3a3ca6589eecf318cde40d1ac6bf16dbaefa52ef3b45b3a46ed1f5e0274922c119e32915855b533f85a71ca03474a826030269a44108 *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
8a73895f0709880de8b9b61693a28ed9813978001b6be7a63e599f52c091003f5bda7c7c69191270e4f25c2ec4b3d2cc22d49b777d206353bd4095b505b32bb6 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
272104b0bd785137c399426dae6d3a555501f7fdcd2625114522d1230346639467e6ca803207f7af976a32a4d66277d202528eb1329a31a877b1dc79dac45eda *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
1f8a6d4c294b29a291427a71939e6d31ee5474927f644776a008af806e1a2221c98ca97fba924a6b6c6d1bdc9290a56011a6cc00ea23d9c8ff5557319bd67584 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
83cbbd44bd5bc54f41b12b2ac2948fdbf21d0932cb4e845e6d3ff5adc02fb1e039763b3a3a08e9cdf556c8e234af492bc9178897699b6012017200c798fc2e98 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovsMAAoJECyLxnO05hN9BVwP/AxPWZjzf6cMz+ryLAf7G98A
9kTnXYmI0I41+hrFaS+icPQokrAPadVLixq4vlzVV9/I4NDYM5AJr1rpx6ERGg2E
eBUMhXu49WXdSjjocfWSqCBO86ZABUai++J4Lv/AKe58xTvyoId5MxyI7azmKY7A
RT7myUCSGRqIX50bpkMa+1DbfZ8TpnymUnOqqpRjVi15RJ8DQUpDGQEK/Et2MIse
8VlqYJ3A3cbZvyaZEQBMa8EhA09AzFopFSCu2CBuTLx3/eGUtkW8/r9eenWWiZUb
/H+ktu1A95ejBENVFwTIHoOCEdgyh7Ipy0PqZqJegAfbPAO0wLda+0F4eePUqm6/
5PE72dy92zh5DPzVpTgEvfcbJIG+V0SLtlWnchaob2nA4TSaJMWMKuA55aM5OVAy
YBEePBzZzn8MDQ7G2aig7lUweE48aJk/h+y90yW0eA58XEhwrhXzsE1+QHY6pnSz
Da2Zt2eD1paB87Sj0o86vmVFdT1FJHMdsIP62S2TEkNT0QyIMOVPR3AO/51dUi2h
nohLutKJqIHWo1klLRWQ7ywfU5uA4OZT27iuTvXNs5s9fh1aN2nZ8/pwI7kTxFt0
8d9YMayUcjspE5BXdLKBu1eMmOHqiyF76yRtvoezXwv8EuSN15S0tMEv78LDR4N8
Nje+JUP0wUL0+9Vnm27v
=HGmk
-----END PGP SIGNATURE-----
```
