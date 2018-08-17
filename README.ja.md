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

現在の 0.5.0 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.5.0/win-eos-voter-0.5.0.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.5.0/mac-eos-voter-0.5.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb
59cab9caed4ccbfac9b4cdb943e464c710e4012e0e6132a74a1c537bbe581e9d383183bf02aef026834753067a48ce04fb0341175fe2ffeaf67d0be9eac0b481 *linux-eos-voter-0.5.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap
3b58c7eea6bbce47a437c15d8694c65937cbf3bf13b16d674d64eedd8e74d0e02e7d2e5f52094cbff93e97da1be53599104ce7c12cc81d0f2e93cc2411598e0e *linux-eos-voter-0.5.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb
deaeef2212769808d486cea2cda6a2453be8e0b422a7779c83a74106a3362b5912fc01be44df07f5a74da0023c304eeace188592f4dfdd38f8f7d980b55516bf *linux-eos-voter-0.5.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb
555ef8da0202e508665c95be300b723e2e5e0678d3e6e2a32336e6d80665341a618c30688a40db6bf1eabc7496f0b10780ff4b16888736520c5755a4556bf2d7 *linux-eos-voter-0.5.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb
e3e3d38bc4f8b98484d412f4bcb22fd3e453f50ec79e85a33005295d7891ecfc4db06c81054ddc6843a399bec727917808629e42acd3277fe2ce835d0a880bc4 *linux-eos-voter-0.5.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage
e3412b0016b7e90f4a8293b0068788fe656edb652202bce0c150d9e658c8c77f182585bdbd10b995d31c495d818c65ab7140230c1766db44f688d25013f6e50c *linux-eos-voter-0.5.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.0.dmg
8207d0197a3890707e3e545e105314e26b809d741ad60fced73f23e69f30b0548adc1a5ac8cc1c6b65d5d1f93e812dd2f9b8be40495c4c7df788a2d36050e838 *mac-eos-voter-0.5.0.dmg
shasum -b -a 512 mac-eos-voter-0.5.0.zip
e71c5e0d2312ea8b8ed175b26f43410f171742b2a7060fcaf5478dd9cda861cd1d67d06600b266c517b11118a5bbcaaa8ce470bb2d6bfbe118c0836ef88506e2 *mac-eos-voter-0.5.0.zip
shasum -b -a 512 win-eos-voter-0.5.0.exe
3a41ffd33e4acf94ea391c0ab3006c928eb2840b5c2187d8eb703bd66ae6c782fe39abeccb959638a7c7ea895e13f5c7277bab85cbf574b54249488694c571e5 *win-eos-voter-0.5.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbdhs1AAoJECyLxnO05hN9PQgP/1U0pJl8Z3JqokIHL2qeyt23
9a+bXHl9lwXlqyCdLfN3AMJay5+k1VmMeENG9mqcrTIZ/cS7bVDUMzL/B1nuV0NL
ioAeMCD59CYO/lUenY+ap0W72VDr5nZ+DotxBm1q9NMROh7FZNzRTMlD2s6VUQr3
iYs1K54l/3frK20xHVtnjv791xSPoVxoDTc6tlm4Nph7KRr1PD6Lwsc79yh8lTHm
u5G4xEYkyJp5i2yaFU6XOi51hP8rb0AskL2/KtSZWXIlKf+D6r/3Y5l3y6O2y3F4
rCO0k27IrkjNfo8AxLRVYtRJHhv6RjN5eiJucll2EadAnAiTrlTxcMVqqM6OUv3G
bczcXJwYiBx6Cc87WdQEBDA17zKklWEmtM+8OtqE81BjZbHSiOjqm5LCJduc/Xmy
inCL1iry8NsJ0XeoxVE3Wpfne7319Ujc6BebxmQQrx/4xXQIcaLjOil7eDC3c4PI
u/1Rdy41WpPrmitJffce8b6jAK+eC4g5SC3Jbb69Mz5CMFz11g0tj/ItqvNTumTF
p5Yereg772hWAte+DRQxpmL3K48MaoCO+5/TjC4D4rb6oMZgtsNnqRs3cIBetbVg
25RglmbZj3lH+p2kWZPRtId/x1Ch3VAt7vrQvU1eFuLf2WqNtAZfoAyCHTnkM2b8
5C5cKNJi2ktMY+iUdmOs
=mEQD
-----END PGP SIGNATURE-----
```
