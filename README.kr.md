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

현재 0.2.2 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.2.2/win-eos-voter-0.2.2.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.2.2/mac-eos-voter-0.2.2.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)

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
yarn install
```

다음 아래 중 선택하십시오 :

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

빌드 된 파일은 루트 프로젝트 폴더 내의 `releases` 폴더에 있습니다.

### 개발 모드

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### 협찬

이 프로그램의 개발은 [Greymass](https://greymass.com) 팀 구성원이 이끌어 내며 이해 관계자가 EOS의 지배 구조에 참여할 수 있도록 노력하고 있습니다.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

```
shasum -b -a 512 linux-eos-voter-0.2.2-i386.deb
acc63feded2f88e9ff4f2752400bf1a482ca55b87b756aa7376ede3d28aaf72ae4c62da6528b6d2b0eab039195d627ddf80244dc6192d71c55c41cd8ab7de481 *linux-eos-voter-0.2.2-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.deb
26704939f44f463881e2f6c3abcd9b1bb8d268db276fd233c5452468cacf574e1d88724f7e0d407bfea03deff1e6435f6891aa8ee0d045ff92b75f6cc98fe88b *linux-eos-voter-0.2.2-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-arm64.deb
fc43236352d9f6bd661c93f154386b788b227df5ef1e81be7d0345c3a06ba0973561742191a92018091451127dd223bc22014d9a9ad7159b093aae0ea175ceda *linux-eos-voter-0.2.2-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-armv7l.deb
e83c04cef0fee0070f9f2f9e93ad38a357c8d7d3d9c49a0f9efd24c3ebe12ec85676365a6e24eb13a4d904e69c94f41cdda09abeecef6ccedd02c7553ae99acf *linux-eos-voter-0.2.2-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.snap
097942f10b2c4dca49356ff2e83d2c1bea01ef46a422bd1e2b26d64da8c643a78b72bbefb4a7a9aab8c5ef6ec869461d61c11e50cf1abfb01b6240da4d399bea *linux-eos-voter-0.2.2-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.2-x86_64.AppImage
9cc312436528a07d134dd58a9362c8638057354a83752b94f94104444c4d271fa1b38b689f5bc9b02ec43538721ff5f95cc23e6085ee5887d5be48cc58d155f1 *linux-eos-voter-0.2.2-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.2.zip
355e7d18f462d7586af58acdfa7aff4c363e78d78d76a3c2cec9e3525e1c75a79ad988122f9b12337bcc1dfa78dfddec1deb3973aeb7fa5472cb3c036a581e06 *mac-eos-voter-0.2.2.zip

shasum -b -a 512 win-eos-voter-0.2.2.exe
56afe1adfa4dfa1b753db6f87b71f6b929e72003b4db50504e97b67990da067c4157c99062297522c6af067af921106f73375d4974c8e565e44816feabebff78 *win-eos-voter-0.2.2.exe

shasum -b -a 512 mac-eos-voter-0.2.2.dmg
56d17e0561c9ce9d06f9d1d159f5a77889d4ebb08f20e675823d3529c97c82b8108159f5144e171665c793d7ea7dc65e5b2c4bfe195ec0ae10866608855714b3 *mac-eos-voter-0.2.2.dmg
```
