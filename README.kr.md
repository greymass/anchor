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

현재 0.6.4 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
7565c92cc47fe587d0d07757abc62a8eada15586c96e55d585bf7689ba80815613095895a54402b1b489fbbb3dab56ace4ec28dcec4be3dfe390555d48ce1f4a *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
03f072ed36916249c1d4e221e6e8791a106946e292d16404064e704be6b75616c097cc15fb9710540c4701123e5faeb9f7afb60e4eef19b13a511b75c3ef641b *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
a14fbdc2c76def46ab6cc47c8612c2927b09091f9d1087877bc422e1e1062741b8f08b671fb74ed3f50c00748f33cb155e3b433929b3ba60f4277be9c49cc26e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
d76dad659929d2311cfdff980ca060aeb93e38be8ae9474f45ae47dcc83a556875671b4b3827bae704a3ddb80152aba76272e37162113c30dd5818129dfde981 *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
7169ce28962a2e4b45c2010b7886f215133e3c3e0f99dc81f674e55a30ab5806d21ba987bd9fcd2612ff668c2d077a3de7b887d7acc9fa7acdd3569c8d865d33 *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
bc9954891f48cb0606e7051cb96b98e5592c8fdfe2bcc6c32411da41c0ca47e971211e2dd5eb601c452f813206fd63135659ae9b2c7b1213065d0d2c5ac960e2 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
a51234b9068e3beca91b89995da754857e7834b4015e5d378d870004511bedaf4c1b75e2c3c52db1e95c5cf8fd35fa1b47d2c27e435919d8b1520a28329ad824 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFGKFAAoJECyLxnO05hN9sZgP/iy0fF52PGjNN8RBwGzRJFy3
1nTmOIIHdW+cJf67gVG9NcTqyqB14CO2aIJRegjbUWQFn42//GkCKhHXyNLiy63k
zXX1sy+hn0zNa5jOzZjCsOrPA/jg4keUMU/LdwNkzAuESUXy5GRzrUAGHScdmrSq
4lTfjBS8h1OPDURMBk375V4V1W+88uSwapbLGXjLfDqMpmPS05mNf+N29w9sOTgI
V+c5tgS2EEKSMoCQoDYvlWsTvcZUaMG/IghyruSi1KYh5CPJ2aXGoj3VZ9GVgply
ePxS/8HEEpzkTPUpn/QxLa0cz1Dpz9pXWdz0Z/+3IAymrY/bkGcDfnbc1nZMwM4Z
xGbHMlJ8Fvr8lc6Vwwe4bLCaq1NnkXnC4eVYNpNNxQvtv9bAjaeUzZ1VXS+BPrft
rD2cu7NKr+xt8QSqUg8jQFh/mP9odhLa2qGSegGfm92SwIye6kzLcb+DsskVd4uJ
T+Y6gqDCaq62tchq7waNzl3PoqFv+wkmgqceJaltacVqElF9vlBU1SlSRt/wO7+h
/ErR3sBRM8KMoJDBlTVolG+teWnR9RmSB79SyyHxSMindYKho+GNyb3G0hJS7USy
8qUD4yJh4+WRkskVu4A7mjxOxNaJIcmjG+bbhTjOIgaaz9VCVBX/GXRlDjuqPWwE
Zyym0JHDsppfgfMh0brG
=TkGu
-----END PGP SIGNATURE-----
```
