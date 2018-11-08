[![version](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![issues](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md)

# eos-voter - EOS 블록 생산자 투표 및 지갑

`eos-voter` 는 EOS 블록 체인을 위해 한정된 기능을 갖춘 라이트 지갑입니다. 이 프로그램을 사용하여 원격 EOS API 끝점에 연결할 수 있고, 블록생산자 투표 작업 및 몇 가지 기본 지갑 명령을 수행 할 수 있습니다.

[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### 특징

- **블록 생산자 투표하기**: 지원할 블록생산자를 선택하시고 투표하세요. 블록생산자 투표 UI는 연구 도구가 아닙니다. 이것은 안전한 투표 방법을 제공하는 간단한 인터페이스입니다.
- **토큰 거래**: EOS 또는 다른 토큰을 다른 사용자 또는 거래소로 전송할 수 있습니다.
- **CPU / 대역폭 스테이킹**: EOS를 대역폭 또는 CPU로 사용하십시오. 이렇게하면 블록 생성자에게 투표하는 동안 가중치를 전달하는 것 외에도 네트워크에서 리소스 사용에 대한 권한이 부여됩니다.
- **로컬 지갑**: 개인 키를 가져 오는 동안 비밀번호를 설정하여 로컬 월렛을 만드십시오. 이 비밀번호를 사용하여 키가 로컬에서 암호화됩니다. 이 비밀번호는 지갑 잠금을 해제해야 할 때마다 필요합니다.
- **임시 사용하기**: 이 프로그램에 키를 저장하지 않으시려면 비밀번호를 설정하지 않기 만하면됩니다. 이 프로그램이 종료되면 키가 잊어 버리게 됩니다.

## eos-voter 받기

### 가장 최근 버전

현재 0.6.2 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

최신 버전은 항상이 저장소의 릴리스 페이지에서 제공됩니다:

[https://github.com/greymass/eos-voter/releases](https://github.com/greymass/eos-voter/releases)

필요한 파일을 결정하시려면,...

- **MacOS 사용자**: DMG (`eos-voter-***.dmg`) 또는 ZIP (`eos-voter-***-mac.zip`) 다운로드 받기.
- **Windows 사용자**: EXE (`eos-voter-***.exe`) 다운로드 받기.
- **Linux 사용자**: SNAP (`eos-voter-***-_amd64.snap`) 또는 DEB (`eos-voter-***-_amd64.deb`) 다운로드 받기.

### 보안: 개인 키

`eos-voter`를 사용할 때 본 프로그램 내에서 모든 거래가 서명이되고 키는 전송되지 않습니다. 로컬 월렛 비밀번호가 지정되면 본 프로그램에 AES-256 암호화를 사용하여 나중에 사용할 수 있도록 키를 저장합니다. 현재 비밀번호 / 키 암호화 체계는 [현재 여기에 있습니다](https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### 직접 빌드하십시오.

직접 응용 프로그램을 빌드하시려면 nodejs / npm / yarn 이 이미 로컬에 설치되어 있는지 확인하십시오.

**주**: Windows 개발 환경에서이 Electron 어플리케이션을 구성하는 경우 추가 단계가 필요합니다.

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
cd app
npm install
cd ..
```


다음 아래 중 선택하십시오 :

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

빌드 된 파일은 루트 프로젝트 폴더 내의 `releases` 폴더에 있습니다.

### 개발 모드

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
npm run dev
```

### 협찬

이 프로그램의 개발은 [Greymass](https://greymass.com) 팀 구성원이 이끌어 내며 이해 관계자가 EOS의 지배 구조에 참여할 수 있도록 노력하고 있습니다.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
a158c50a65ffa8c34c54aae5ff5d0e730fce6e881f102d558c47ed9b12fe555ba066da9961e817038d66ddd8554bbc339ef10111896af4a67e0159e3ed75f845 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
e5c4dee66f097af7f23b7b1214e4b891e98c8e77dd3a99e60d4ba24f3f086f4b8ca2f6713b1a4af0627d58658411abdfaf36d33b793c6c3cc62de25a73b6fe9a *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
bc0e001d5344d0ea56d7d39a445b5ec9c23d590026eb6c71d287135371a6b5f32146b89505e316cd05e7fc5287a620acd17c0ad2613861c390b705baaa25e19a *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
f03c07c4d10e16baf7ecfb36258da1ac08a62615330a6998bbb028ba5bb27dbccc634690edba0b9fe28957ba81497ec601a6aea0392d16bb65070290824ece2e *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
935ef44a0b62ad123259da5440a2351f3517aa939ab2ff6cb12f895d72aa48b7b67d0503aa20119ec6ef2f9a3f6815efa947bd8344ec93f6ed18ffe6a52f9f19 *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
c00f9dd07f0f7e71efcca7a5c2f81104bc28bd99dbef13bab24f61cd1c774a9874489bae640694442cbcda5f9f54c4310fbefd38b23ad269175a83e834575693 *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
5c9fe446bcbc28e43efbe3066eeab94ddcba3b9ccbdcb49a6157eacb2846ff99673594040fc48e75f68b97cb07b323a59de6b3bd7848d3b29c7e25797ce4f4a1 *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb5K04AAoJECyLxnO05hN9mT0P/1fA+sgntRPGowmhlY6JB2X0
cNLx+HuhAycQNp6k0W1BncwViV/iKAoq3GsZUrZLtCQyaS5cUXGzBBrHy4klboGF
pZSvjmSHpPTEXyiII/Pmdqbhi57uUMwRMHjMqIPrUSz0AnMUxQpksi9SQTxG2NU1
nxSG2QpaNgn9pJTKuUyVfSFB0XdITKkTobaZRlZ6djP9etiV9e7ptxwuxLUVZl1H
SgfxC9uQZKAmvinagNn5RItEoZCcZcCSVcL3Nlhpsrm97uY96ey5js0T4CWTmS4p
RuVnJ8myXJdcWoV8so0ZMD7LXBacr2b0J+MbA/OE/3IwXSxuc0W8xLlj40M36xML
odb99ezaDDEpdTSvIl3iCTIzrK6eMYF90hbVf5xRZyHO5Z1pL1+0UHj31As8wb9g
oxn9jsCP+5MHsYk/8u/Ac5Zv1FDBv1wb6dxdR3v+y8NwZcbL6/lWPQ6sfca9kNWp
0NbLbvttbnGSmorpKbQbegEaUIWZV5lL8HAHWbdxaE5p3RBbbYlr1UjaKyRpX+Ic
hhMkR5P0/KeFlBQ0m18q9vn2Au37Z+HwTKdHVa7ltsyQFiyMoiAed6jpfGQl5Jzt
cR/cBeuV25ByFCXYGjjjZJ5bFG3hXnJA+UjnTTWC66i/i+JkALnB7qpaYWJxgkOl
9SCqa5mn/bI1qY0mNdQS
=6Pzm
-----END PGP SIGNATURE-----
```
