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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
834f1409690c338191f9c8a6a2bcee8291d81977897e7e62e9614deaf5642cf44b640ded97b811f61c18e535563e1e5acb69e4de2fe8fe6bbc855467e5f0fd2b *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
c7c6ebcedbda30de98f19ad3cfe5f956a58cefc091a1d9c2d0d5109f913f75f33707a62803e33f9a7630dca2c6b01e1910318a04ad052ea8a55b7dd95277fdad *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
5f7b9fe7bc918f6d244e80610a87d20e40784578c0d5fb82ef782181b5c50d48eb027551874948047362cae89ed8fb6107139f4b9434ec3f7fe39103fe0484c8 *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7ef5a3c6eefbbc0700dfce13f3914010c517d9f6891e94532a97088dc4edfe34ed995339c65d9dfed97299639fef0eefde27e924d9a43832d32a6745f289d042 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
7f587daef9e984ff8f03e3c9d50e570c6d40dfd239d5e3be817607b0658a72cbb219fca07afad8a103b885ccd7259124aada5e0de1ccfacb03e704a0aeb4227d *linux-eos-voter-0.6.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
b08d32b1663f1a2caace8346bcaaf36e51e22fa5c3d181788e899685c815491681bc82cf7173308729a9f24e2ad154ef250d51b2caa629a0405a58c6a4a8daf6 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
cccad2fd292cfe75df904b7fab34d34583686c41de5f2b362d6895547903138bc94c9016fc1c95781eecd0f93217562c282f0e054838c9807367249f6032c79a *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
9fdc0fdbb27273b6248825ae1afd03869f2960ea4287c2619aec9504f8da1faeebd8cabc6a0117697b3a13492f9e08ce2f224be23c3580800d3b12b26adb992e *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
39b19425059abdf24446d5e6c22b7b095d2fddad2c121c028190a71a283ff741d1c1d4f802c9397466fdbdaab4a6a726694af1e8b6b8c3ce401dd7f6134152fc *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb24KnAAoJECyLxnO05hN9zGIP/RTQX8liCmMpV7roUVkJREVL
Ghw19r9CwPuhq1T0MXK/l+GjstM3nxSJKh1CPOty6Rc+LBt/HEEDhYsXVCQQCOZv
6Crnh0xHcJoaz6e2QQ5U4yex2gA2hTb0Hi0pxC190UtXfFWBA/oa2TqSx1q4MGaF
8KYF7mLxnAa3oQJn9NRzbWoVR1xbz9kEByg0GeUoOAoXZ9ALoB7ifH6+oVimfGzR
yVhbl3AhZB/4UcatJQJ/vXrstO4WoHWH30JeAcmyzejCvHMCP82/vNjNSP6/Bo7W
BbvDsl6yo+Drd7XIXlrk/nmzn1tm8c/ycPLXZpHPdK7KLoyUDa0NZVK8E/xKD+Mg
reeghorqaRwXz50ViU4Mv4HPuHAWYCvG91iVEjdBoqsMVLnrNsWPGj7JOsR6Ezv9
zuLADBh7p2FVePhYX7ILS9gJh97XJCVSAbdx5J9TxzftUS01YkSFm12Mf8cosgtt
sV6LQDXBjtnqBdY07Kl9Dt5uPzLyxKbukV0tQeJgE+a8EYUoqwVbmQcTjPm+HLnt
gdnbQ7iOX230C5/th0lRMS9nOyb7/7rtwCQsxlRLrZyxo5jCtZqwAUGTZQxkFwcV
0Gzx7DFMvqpaXvin4mRv7rJbSVlNkX/Kuw7tnxNXzSfjdFOfw0QxLttRKwrsR51i
19c5zb8CG+OEXb0MiEks
=poWJ
-----END PGP SIGNATURE-----
```
