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

현재 0.5.3 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.5.3/win-eos-voter-0.5.3.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.5.3/mac-eos-voter-0.5.3.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
fbeb348c4af96d117e1e0a9234a6b436a5c5dcdf48b2024645cdea0501bbbd3ebb671dfb95c73f63e8f0ddea9e605032afc89d23df8e8d446c68c4122e158998 *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
e5e1e84045510a4e610fd3e6c434795ad658dd7d530cf56f3da2d26d5639b5beeed5a1a3f6ae153958e0be0fb7226ce8948bb34106795ca798142f42b96eb193 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
c2d1f283327e0edaf0c538518598d913d506f9d6ebe9775e8cc74939c01f90e808173ce10529bb68c77a479899dba482b8a23b68d80b581ce0bf309fe27a4555 *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
85dbe1c5e6ef70c22ac43237751c1c2a1282260b93fbfb194316e9a7c3d2aed99b01bd760f35b7b9168c73b0879c373c2a6eeab77670df03c935bd8c0f406414 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
8c7ddb6969fbc53125ebc2869350f6455613906c66282fbb8bd7823a5d47bc7316f9607255ad7e814da6404c943d9467f426f9b2c5221cee98c836155a9775b7 *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
0e41926e7a131a37d8381a5dfbae6473969c9894d1b958ce7b7f0168a5cfb83637916d9ae1e684075bbb8564d6f22c283dcac7ea45adf6fe84bca497b5475a16 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
71b88ff2e75b651767143323cec7057a766fd35fd9a8e8a0ecf98251d35fd5794099c293e1dbee5a90e7141a6fa063d5d08d65e1f4c40a4f3916bf71388f4585 *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
33073469eeb7234d9262fdfe40e7d3f0199265e831cbc20d88986d02918ba6a295bc7533fd7d878ad18c03ae4d6d28b34d98976fe11f20f09dab94eb03de147e *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
48461512a74cd1d0f9b6f7ed8009b7625900e4c1f26d57dcd8b369cf15ce8a806a0bd305f17a814a09a91ee0abc0872e451673319475b9828f2ab4d9da92f9ad *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJboYkHAAoJECyLxnO05hN9Xn8P/iy/dSbQ3yrSKbhQnXdb/seH
7V7q/9ndvulZHZUuMPTb3vSbKjdff49THKuWXrEw+owyhAywDkv+nUB+F7slNnFp
pJ4V/V4r0l2QNb34feo0k15WlcmV8LzAxvH4fPf2VllMiLHNJvmA6afFt5WpMPjl
W7iJI6upise1ceAfzwhPKYC3vdAgvcEmR2rmdaMPATnid7u61vnJnfmTt5DBOsj2
Qt7cSOQy9zURMywMcQ08uPojSIIGQgSyjiWn9MNWJ5n3yyXnQ5adbV8/po25HS3s
ihlt29kjwR9luf70SfkjWZT6kJGBa3gN5MFt8zJxnTkwjdCJhd8ugH2Brq3nTOD5
z3f+D8lWjFVSB+n78YWjIEc4SN29CSkJnXVZGxKEsOhYE3+/JDLm9lE53LsHNFBp
R1/YAS6t7LkiDeY0VnnOUAJ1jZPzq+hgoNmOFS93GWlSQT9wjgj8bu0akzKij4+x
y/o6TnHbp8DVFxzZvszARLMLBEpcSaM+dUwnha0O+1JlZhhE/lEuUk8VIjqbl7AT
yincUP9FIJLeC35vYcyFObht4VGKuq5OWm7coK/TXFB9SFc4+7cDRTKTnDHByLHc
wNyzad8kkwcGZ+O/kZdGtyHyy5FR84mI1NE1t6BVHQrJY5IKuunsKTg8RG6P7iEe
GuYChabPGlWXyG9Z23Iz
=T+K4
-----END PGP SIGNATURE-----
```
