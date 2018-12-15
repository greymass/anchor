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
feab3703416f6328d809d89e4f62388d407fbaaa975d5103890487d7b11627f901c6878fc7158bac0868d83e6973c90092352c61a834bbb7cd68968191e373e8 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
5e68149c7d1b762bf661ac887a99190d6b9d16731b01a43f4130eb18513a00671557a0796739d0cac2fb42f5749957c4c68d0bb9f700f357ae22fe7aab714d3f *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
b208e4a84dd8657a26460a9cea07d5801a55f45caa1a3b47300cd00d562e0940cb704c69186cf564b099070731e033d2e7d295fa887071e4c63810862e216d2e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
2824c3de0db9cea23b4c02245364c8c9c13e214a5bbb84cb8ac7be3da6cf3839587a9a0114fcda7b84daaccdee0898f8305737c725e8017170a6098c66f2ccda *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
cd16515e50e75513905bab6618f85216f6318ecd697d96771515d88039fa84a80ddbedd55183b69d22abfc56fbc7158e7dfad105ac067c552eaa7a7bed83ae6f *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
29e5721b1400f4895e441ee424490142bc0c5bf6c8629f0a05d649e9d0e5db0254e6fe3ce6a15a341b565a59097c124e7e037564331a5b8b43cf695dc35b229c *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
1d23b03369d6e7980b7fb35a066930e238098303c0fa45df58868aab0bbb9bc0513a84118e7febc5d163d466cedb992f8fe1d015648f1cfde63258123be3e0f7 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFFXEAAoJECyLxnO05hN9EJUP/iOwpyf7yQIbZCNPi2t+YphX
tELmQpGWVCtaBsh8oKnQHd3SmTVIIaJAwY6GgDdHMcOaZcsWySkbJIyB+K+tnkQw
s/S+43Bo5wwGS6vFN5ibpd+dWywpsKTIZxz6HT/Q5+f2VyK+m4fcPF0aSrv0WkVI
kX7VcojR937RCqszJ/uxiiW1PL8GW+JYk7ikkkHoNbVTeyzuJsjK7Kb12W0XSg9U
LFstt69ZVpK7bgGXh8/s3V2wgz2xS4RfHZT2MkUZ8S9zM9AlQK1gAQixHdX2Blvp
UyRmEuLAxZT6uU6L+MZCJQgfNgTnQNtlxgx9NBTsXS/Rnp90jmasulvYdwjFcWqL
CLQ3SfzGjEYHonnUnwIGN4L04sYYLVP3YoJQlDVMT+tIwDHMfSWx5ch/5C4DgSQB
6v//kFeZY1gA9Znrvi7+TApfWroKbSITKoTIRSnU9lRRInq4HA/oDuwPzrbytzGD
hrrh5gi/VJQ5jfhnCjlnAkVCA7fIuqLGc20szlngOIE+PQM/CzN7PWQaxnV0wIk/
nYVFZ/T4tK1gMjmLPTF+4WZbOjAgt6MDrnoUuNwv6bx1LnZiBkPPkSnall9oB1oq
Pnemf79YQjwTwovHq94cZtvJryqnG2REA7a71K+KR05pZW2f5+nVAEecaOZJaSiK
aY9fCRXwjVencsfKq9nN
=CLtH
-----END PGP SIGNATURE-----
```
