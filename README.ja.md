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

現在の 0.7.10 リリースのダウンロード：

- [Windowsインストーラ](https://github.com/greymass/eos-voter/releases/download/v0.7.10/win-eos-voter-0.7.10.exe)
- [macOSパッケージ](https://github.com/greymass/eos-voter/releases/download/v0.7.10/mac-eos-voter-0.7.10.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.10-amd64.deb
d2b5db8a6d0b4e0963d392c72c400581959766cd5f27fa5032351ae6a95bc487fd30773d361226fdc2dd97e1d39433a54eacad72583d1a125d6b46e03e78ba94 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
3aeea5e196c48f7a7c03669c25f99110cedabfded3df9f97e3318e079ccd216d10f603beb04f840911ddfaacc663d59a47e3539db4edf8616d6bfe4b4b5e83a3 *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
a477912c77bb93edefed27a87b58cfa19673d308a68ee649f2e7dab8aa5734644ed51d758908851f0a71e78739547bcab39565136c4893ed150de47a5fab2d47 *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
02bba946eb3deb63690387e6233a899c68491e588d7a1b95b62fb6f89210cc39e365bd6d318890363ade85a14f9ed8873dfff42e2d02e29d0fc6e9dcb6e14225 *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
5e39d14a25338fc25972f0c89cfc98b4cc682b66fbe48e9888f9158ea2a6bb502de23454d8976014bbc76e26501d7ecfb9ad118e83ae9db75345689a464af7ee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
ed39a12df4a3fc8ca859371d34ceb86dd7516cb4f2a5290e3e6a2c652ddcacd7a5cd766bbccbea01387d05f46d608f4852c3b784099da063c5cd733f996039fa *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
9e2df61a64b0ce00a13a005da1ce0d6f8526f4ab395465e4898268357be61bab4030875045c4c2b08ba14144500922a55d84cc92f534a0aabbcac2fd9943c9e8 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdMimDAAoJECyLxnO05hN9PH8P/iKdFecdVwaTwRv/jygRtekg
p38xPNiN5xyQzm6KgW4tg8IHsof2GKD0l0In/IcPiMIm0Zrvqq/StxluJxk06ZJn
b8shvsZD3OHgFtvCVo4ldEisbn5d6G2VqG63nobeg3yofPDeKpR5V/0/9vkhQSos
XOZFhUw958oqU3jkR2dcgDsUZ7gISlu6Cq+jvbFuGuwpaeoKCyxCfA5tY3bUPUsK
C4nPZUl+Xstz4rd5T92R6x1SBTNEUUL6TrPK2R2VhkipMeHwpGALmeGDS2+Nan4D
4AI93h3vNzyutqTXrdm0mJJo3QPQjgnmy6FBew749Ho+km/qEiEwgHtTFNGdSjbz
Ok+J918CJaWpp4Esl/m4Z7BxTR6XlChWVnaurXhxNoeRoIOlLvFGWwg02IlxADBa
Ecz0dJ5cS+AxDHntUQjm0dBh+SSpXYvSdZ0Gx8+ftuS/vBkMc+i+5NDqtYbWGXqD
UG9LfitatUcsrSnsQ4CAdirAmXuZJR3nL3sn3meCRVWNgWi6kNn4voVAFALtjfT0
qkx9se9phO4uXKEbve90/i2UOwXHbLjol80LSkOL8AggzyuQozI+don5JR8cVmxA
F3zGNbc+OMKPoyB9HpFA0PPbG9/L3TBDawdAd6R44cXijWI9sPO07DaVA8dWtZKH
yYi6VxpfyL9HSnMr/4ch
=RUm2
-----END PGP SIGNATURE-----
```
