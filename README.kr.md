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

현재 0.6.3 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.3/win-eos-voter-0.6.3.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.3/mac-eos-voter-0.6.3.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.3-amd64.deb
9646adb0c7a1532e9338412901d03c6d0e8fc632718bc86c9d96df508442b73dd919b768b64ff4c8aeda8ee1c8971d3e2b71670829e96f6311d85221970df1a1 *linux-eos-voter-0.6.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-arm64.deb
8b8cfa20e0434db698e03c2669749ef1cb7748aa7ab7e150825a86c333e9c117cb752100e27d701ac14f07747b431a77ab8e7c071579e2259dcf250c5ed79baf *linux-eos-voter-0.6.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-armv7l.deb
17b4fc9961ba15fb31a095ce54edf20794e560d04e9d7f49c4bbbcc37748312848abc0ba432bd89ca8259330632ad252cdda041ea4e848e9ece8f03affcbf8b8 *linux-eos-voter-0.6.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.3-x86_64.AppImage
e1a81736b3fd7bce442918430235ef7e3109ae0b7d95682aa41c26d961b5eaa0e89a0e126a6a673b1e9d0bc9970bfb28d5a161496e97db92402e59c341032847 *linux-eos-voter-0.6.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.3.dmg
1e9f8815266bd0287ecf531b64bbf702ca334a6b1e14564708eca800e33ea7080d04010e22989ed85b7a7cacac9713a4a03dab8821a6ae27507fe6f7248a161f *mac-eos-voter-0.6.3.dmg
shasum -b -a 512 mac-eos-voter-0.6.3.zip
652b8d7a6a3aeb55c277a4af1158e8fda03d2bc9dd626c19931a0b62bf9435e736c407b57d2835f4483c2088493bb7235844256597a60cc2e5cabbb7747206f3 *mac-eos-voter-0.6.3.zip
shasum -b -a 512 win-eos-voter-0.6.3.exe
97d85c252f6777c5eee56c701fbf61bc109b098c96c728f46f9dbcf715c592ccf6d9b199023d4288900a57ae04e86be8a5dfcdad8cb58243100b4873ed3e620e *win-eos-voter-0.6.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb9b0TAAoJECyLxnO05hN9mfUP/27p4i1FwjepCG8ZB/1ISCGC
ekVfgqY7a2CDdK10B9c134Noft/DBTzB/zgHo+hZF5Wz7JilJWQmQeycNSi32xzz
0tuZdV0YtDIKUL744SVeOElTGcP1O0P7Wy4q1yFiRHsdCkGyObY5oUeewJkKDphs
w4WUvYmASAmouo/r641DY9R1g1YluDuUK+DU4Q7g+Nhh/dD0H5QhSf776eFTwJz5
BV7WeJBGQhuVXWGj0s7phPxBSoLfYDNdyU5vGP5Kxhof/c24D0Msbdg6TLk93/OU
2VcYCJLmXpKjI5l7X01dI5+1xAK9JUvwTFQBJcTKA0N87FJa1dVNc5wcjUSOLZSC
Jr55LFBlvii9wA/kZUE4Y7vFCfRcWCyFqY8PftuFrfNmm+HqkAzaM14ML4cHQRk4
d1rIBmdLNK8TvBNJFMGsiCCmEBLcYc6KLjS2VCa5TA1la+nDhiShtxiRgNp37esj
yGeF10DPPcRbefOKJk3LYYvcrqwTWhbZArlMzqxpUGCNX83hWoFZOXkLu96+hXrK
5xfP+aJmGaAJoo/LCQobFn7UspR5TfpSCkGqL1/vPi//rKw+tb9uSz+ouAZ4sW3u
SaTsCXd2v9wyCO6KAg9neS+yhQ69azdtRLHjjwJEVnMFu91IdiqVBGA2J4F5StgY
cBD+wxvdxSKIxguWxsQH
=h4Qu
-----END PGP SIGNATURE-----
```
