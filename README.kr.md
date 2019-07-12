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

현재 0.7.10 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.10/win-eos-voter-0.7.10.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.10/mac-eos-voter-0.7.10.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.10-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
7f420d9a7ada321934df43b09c29b61a8e58128a83cc87905b1affe463f99043b21db69884ac90aeca86560f5623c8db7f0571e52c9e0f51c648f52c6b7e4dee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
fbe79cfdab0da7c977477133f76adf38aa16f79e955ccbbfd72aa96bc56632abe7a7a90e74e1ff59eb0b33196d09353873c2420f55ea3a00cb39ed85a5e973ad *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8F1hAAoJECyLxnO05hN9UrsP/j9D5Hfqrn8qPJYiNagOX3qy
nj3WhJyKzgWFEUBjfLEh0fhmCfESwurylC+QQWhyNa4hhpDWDmWe2bR0XUs9TcUI
MBDWBh5RCU/8qIRROBUGqQRQw6YSU80DNOU/1yQQR0v8f0TOq0QJXNLD9I7WQO8p
P8AzSlNE70MS5crzzn7kCw5vuno28cPtyKJ9jNA+HwM95Hv7dj2fnQCtGm1WI0ON
aoZ2St5nG2oXwvLHL28LwtNCaeVctjaDyxuaASsGwaYaOE+tFOz6VQ8psGGp59p/
Z+LVjyxIgJ3zQu/AflrpmPtrg975j28GB1I+IFH2XVYV/pLoNAKj8+Q5vwNkMRL/
8NnWY53osDnuI/wlgQT0wGSjum4OUWRqOrQdz+TCvqa9Gy2pRgjxwlggszWP0EAL
KqlJlMUG7PUCOPVSsKJW4MhM8AwmHvRby208/ZLQEDfarPbGbLDpt8miQv2ZMoe5
/JhgovTLt4NI+p+7vpbgAJQ4f8YXTFDFuJ9q6C5LXhn+f8kc5Nvtm2HQuEadL6J8
CVKIh0nugoRoBu/1XfahWhmO532OQQe8SmtqS+8wtuxjpqH72xUCTDXZvJ09cMr1
FrWhVRY5TmM4muR1jnR42e9wBUa7aEyRQx7DBqreKNgxBG90j+4s+OWTTQPnYtWv
S1FUBiMIMDIIOjt8xyG3
=uZl4
-----END PGP SIGNATURE-----
```
