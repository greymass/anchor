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

현재 0.7.2 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.2/win-eos-voter-0.7.2.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.2/mac-eos-voter-0.7.2.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.2/linux-eos-voter-0.7.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.2-amd64.deb
3d0358e1fe63e5739218f748f2436b8f8754e9442dff8e3a7a0081a8ecabd41ab276bdf6cf0246344fc7f635cdc72cf0f2a583c2c392afb8a6eb14d4f087bde4 *linux-eos-voter-0.7.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-arm64.deb
8968ba9f9c5ad2d61da1bf6bc4624317a9accf93d9988143f1871259a1f25bb11115a457334da894393d8d859505f54359518fd7a2b9ab985105d63ec589af64 *linux-eos-voter-0.7.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.2-armv7l.deb
b8eb83776671b0b5df6bdb2aed74ee12e5922d00c6012fbcc7d0eb9da32ff9eddc672eaecfc6a5dd7074d190e18d94b6cf0db324a5e1fb8c974fdd12e036132f *linux-eos-voter-0.7.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.2-x86_64.AppImage
b9242ba351b839994b3d0aeeb5c937cf2ef624c859c24aea07ae3c8d5a42530dc984c7c50f71963bc8227be101a278c83f070b5044af9d9a2bc9e456e0c92ff7 *linux-eos-voter-0.7.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.2.dmg
91005c6409de1468a948f63638caa21b6323342debf1a71262d56d6efa7a7bf1ad9bb920c680649a304c9a9d57e87f6376f82b0574e51c51f44393fdd440b95b *mac-eos-voter-0.7.2.dmg
shasum -b -a 512 mac-eos-voter-0.7.2.zip
cca60b96d8fc41eddd22d421f353bc9929499245fe62fb42de4f8baf21e9445635ddeebf305908f82876b6de04aa7d8cc818e0b654833fcfcd0e78c9c1273314 *mac-eos-voter-0.7.2.zip
shasum -b -a 512 win-eos-voter-0.7.2.exe
f7f9b00c82ae668979a4f4ad9bc8d76f59a0e5a102154cc170e4c0d6433ae3f6e21c996c112f57e95e90574195e3d879684f32280595486862dc794c215f8742 *win-eos-voter-0.7.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcUMZtAAoJECyLxnO05hN907MQAJ+tDGrVaSjHWSyRxP31hRLF
v3E/FIYV8IKMGgnMfayXe/9TKKCMZ/hDS6qglD4azOIWDGztcaI+pVpQ2DL7CL7I
QRKVxxUREvZh5GPUmWsHdFgnbWAL0fWXd8M6YGRRilcKnIAr0ylAV9/YJifr/DWi
8+/OnWCwuSlz1IIiq2XfkBn5uvDOa5HuK5X3IQYVfqVsYk5C6oYHsB00U79mjyoD
GUF69SSBNxY6BmmdvBekT1NDmzDflt2KxTrkxRLxvAFV5181X2iKkopSSg8WO6Sr
la4GqH0IyysiP+a/xwe5G7Q1zNVW5Gxy7UPPRMb/IenzjerNn5IapmcOrklhM2Oa
VDTAJxXkI+4wnvxdXGg/LkBI/bFNp2hJLJXNXALIumTHcFHXUQ6+p3HOR+bg3wQc
aPPvoBqy7GOgzcMw2EL+IN7cMzvhAkuJebXbo+CqmZKDqHTIg0qT4InpMl3AAbgt
Hlu1fuAKqplRm7z8c6To+GcObsbuasPMZPL2+qG8tBsYTx7JeDXilL4T6TLRwU2H
hXPg6JKMbiXr0kk4t+spNjaV5yFaWF3wtxLFnK58MZdwEn78JtEGyZPGYn43jv+X
hkdQzepf/9C2q2Hqmwme1CWhqSTb5Ymo6yIW/RxOklJpEc988Tp1QPfcUtx/HZmB
rvwtIqMk5qpvt4Weq0sq
=xnpA
-----END PGP SIGNATURE-----
```
