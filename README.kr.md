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

현재 0.6.6 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.6/win-eos-voter-0.6.6.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.6/mac-eos-voter-0.6.6.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.6-amd64.deb
84a1e8a226b13e37022b9c7f83f409a71b75f519c1ab79592cccabe021fa65ba3bade4d126db1cc890150faf81b9d377d29a629c5ae75d9f95d445b7b07ad056 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
4d7a3cec0f4a4418d6bb77dc52316ae90c9e9d0777f212eae376f18a9986ba6645ced7d92701fd9e144889538ac6e4f7ee74e3d9e5552b17fee5b9b367fec4c7 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
f8c9d41ed0014674d4595c0a8ef5cb6e9366d02f6eaa4112930d1806fd43e644954ea7187eae495cdee6fb78caf9cfd3b816d25fbb11938ea069d1bf46c72f1c *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
4422275f2b0db0e1dd7a2f533c33dba7e4877c40fc5685af2da252a7de7117dbf2a3a96f3fada65f307c9019f2aaea60e90d8341b6c7a42a2fed8cffd4999746 *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
5cf11187d3ac8df5ad188b4287d93b9e1feee93a31433d385fff2f139de297ae0ad77c336b1b67c09688eadc58353ca41dd2d1e02eb164358d73ab45fa8031c2 *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
eec19a97cc58472e637efd722ba734e89a82b76d110eaa8e6ac37841ddcfbf6bffc89225f5ad16adc724d0f747b3da1e9f94680926312a01b6f7660ed065da05 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
a7e5e605640213114c43cbf38a4ea7438e3f53b3dc9cda9556308fef0d9c816b8cfdf1db012e0ebe51ffd91a49f930351f8b8bed4f68752a63f9d088ee16a465 *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIXOxAAoJECyLxnO05hN9CogQAI/1/HwAly+bTzM321g4FirT
+qfFhh6lpfuwbMiJgTPnLUQdVe2WyfGhF35mAB8qCngIUO3wq69zAxa6duNsJHyl
MvcudxGbpe+JADD7zDqGiY9dw/MVCs21rFPLlBDHu7bytSQ2Pdh6Mp9xVlalZmgH
WFg6xBHLy6w2k+xCRUoqlK2qjoU8wkC5YmuTRuqC9UxlYVwnk1SW3Rhe8nuFISz5
20u/Cfe4bVQgWrU3HUpaL2PyhrfdmOlcxAKnsSlFrZzHjJRkQsgoPC1OG2X9C/zq
GV/8lHjCmZl51n2WVWZtAhmSPjwcbRLfKBLYDmDN7uKu8q4kVLWZ5882cRHYYwID
WY3cXnAAj8GjxNepDUd77kHsVw5iTLQq6+UPtV4ASGr0lVnrVt9/bbELpaqpS3LI
zXCRs0sBcCPU+zGJc1G1dsj7SJW6gmGxtQRYLJjeD2q63roX/bHViECvGJAcCVnY
wevKHTlIuKXfliqaavbNoiebVYBSTpnby0Ts5kb1O2WurnomgKoDYeTyKVopTWaA
jtSCkNrPw9dvShnoV5UeKMjJXnFTgdWQ5V/NX/YvLMvl1jdFl1Ciqb8KZu2h0B/X
MkmB+dvyM+/cR+H93LG/Q0lgItm1KQ5Z/JwQy3W7V25Ive3tIUQnax6N0tsnShci
H9AZyacToVn3M4hBJZlq
=uI8a
-----END PGP SIGNATURE-----
```
