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

현재 0.7.6 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.6/win-eos-voter-0.7.6.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.6/mac-eos-voter-0.7.6.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.6-amd64.deb
426381e0251a0218d3f07fbaedf6204cd2724e739a2350b811da9e20a75fe8786f65fbb51c0596100faebe1d102d0645316484c4ab18e64b81cf3128c26e9297 *linux-eos-voter-0.7.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-arm64.deb
2bf5a90300ebbdc9335282296af90e39e827a8e59d8d509a25272ec5f02e4bfeb151bc76c575ba2a5ddd176ec1c47d8c23211711e335ee9c445758f49669ef39 *linux-eos-voter-0.7.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-armv7l.deb
825b71330c2f49da0b1e20be3e62182decab805cb7c48455a16c4ae16b6e075b787cc22a2b2bea43b0a74d2eea0c42c0b95352bcab07ebde65c84a012fc1c643 *linux-eos-voter-0.7.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.6-x86_64.AppImage
e3c0a549204b988e16443c9b04c7e86029c7640091e8c1e9c6e70f6780ce6fb3d436731bcee505831231bd691462de7dfc10d4098e94cd9d3b3dc2b572ac0ad6 *linux-eos-voter-0.7.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.6.dmg
ffbd403ed41efbdd4d9c76d40d620594522c69723e0731bce14a1facdd13742c708bd3524ee7c121961dcf37ff28ea45372283b4a9ac7a910466ac9af8597570 *mac-eos-voter-0.7.6.dmg
shasum -b -a 512 mac-eos-voter-0.7.6.zip
560924b5097411b81742f4b840a5f6f0873ec55bdab820695e4afec6d7dfc4a1fe84d08c1664edc43e47302f6a082f608079978618c65ba334936ed5130f86ba *mac-eos-voter-0.7.6.zip
shasum -b -a 512 win-eos-voter-0.7.6.exe
59c1d612b5a8518659c28fd155ee1e8b7420929c0fc55d64f7e2eec4d9cf17d30af0d0560cb788c6853f48ea88333626286e0a08e11cc5b4383dc4f61b52f83a *win-eos-voter-0.7.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcp9AgAAoJECyLxnO05hN9HsgP/2Ct8rrz21xoBLSSZzisLmUS
SFsuzQGSXMi53izfUWCL/6Ruj/U2Ptm6ShNz49eyxej+UQGlOEZIcomhAocGvH8q
f59xkuFnHWJU1BVBLYUDWF9BQG/wt58VAqC75UnYsm6GI/ksthVJ+2b7PyWTdVyP
3mcwouy5JlEuKVuBN4S/doDoT58vSQAY27fx0E1O7VdVFeZp0VV4Wg8IgBrD4bbx
5Xvt6j4d72IpJRp5p3Jj+EVLvGz3rzAjJWv7aAzCnSHrLaCeR3Chq1/sgkrNQYw7
GSfG8IbitqxM8I7mGO9xkLCPn7/EdoQHXsbHJj+PEtKTlKMHfyKpyFPxlygz+JU0
6Ikqxr7VfpbSh/pBJXxizfnHAHNxEiBB1Nytl17gbjZfjCTfPIvDgAFiDJTvEbqm
uZL/YBAn8rUfOCD72MdDK9aYODR2elS+J8iDl238v/1b7FIxd/bwarWCB0bCdUfT
Nq86nhjo2ROaATdnr4TZZaFeF2KnJ9J9hSbThv0XKZqFBP4rjracSvj5aiL/3AwP
9JwUNfJKvF3ardAP+q1k9fJUhbh4DjpXqUf60Q8k++XzSxxYkpI+gUyhkKWGPQsp
aPjB1n+34N3KVbnA/a5JuQgGftxuQJ27leAHLaPxLaReIUNn6jHmn9wTTWkINWRq
zWN8uuctBk5y6egCWkwQ
=pFla
-----END PGP SIGNATURE-----
```
