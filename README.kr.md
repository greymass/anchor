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

현재 0.7.8 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
ca6f4fbfaf64b38d85144178e2532c5909f4363ec7074a8b9afff7a15cfe146cbda540e8505055cedaf597bb0e308ff8aee9ec87d24cd381b3c116d4b175319a *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
0a5c4ee4bad59db02f13b4c1d0d147cb2cc8bd2eb83cf0786ac138b807b7b4edc212fd63d08cc54e3a555202fa4646da3cb1c03cf3c9b297199b8362d20a7eb1 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
2144970bbc0cf92728659c797e6a99708c566834f88c810131b04d11a4ef152d3e1a997f00e4ff22a27b02b1f701d96d6058bd1dc9977cdfc2c6a636273aacac *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
fe7344ec93a7e769ce9f89ea96eacc4bea40a32614588cddc21405993307d548919289ddf14a8c1431c276604d84b3a85c2eb98c28f98e1d92bca1b4584e1f6a *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
a1a1756069998822c8f566e420754f1922d81b7223d2e81962de0f1188e1ecb54d0bb4e22ff2574322e26a0338dd2027e2e4106b777687cf33332321032f7d4d *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
5dfb2de40fc5e4ba0d41bc772643457a26b99259e1e2eb60b473882efb17cabcd93efa7f464c8f5ffef3e733aa9cd9b8b0d87ad9ae92ff4b098f797557d58586 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
d4c8f18a5483dcd434b04e8f80f29a0958cc1ed333282c02762a34ba6016ad51fef66a0580ee0203b23d8221588e36d8656c25d2c07a8c112fc492f7b9bfb0db *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcy6fzAAoJECyLxnO05hN9GTwP/3fOe+7jlltTLm6nWqmVTmsV
UaC/Wr6tEuyBR3bJloaTHAl7MghNYfoXEjmZSCO8KPzKYcXNTxSOBFeWQrltIupd
myijc+AGHf91h75dZ7KRg9ts9rFpQTF35Vu/F2eEEk2mIeKrP0f7V2GjAfD79eJJ
0x6OIjwgYvNoOp48ZxPcXpozhYgEnXD2fagIvaM0qOVuIautay/Mig8RYPdFrs9+
AtSrHbcxv/ILSf2UZnjgRfjgtF/5IwC9NMbYsrk+DS1x5nmdmfomOeRk70GyaCcS
FwovKDmA22uxooBYSKhBqwSfIoIty/etaS8rMzH/04A7/gHxk/7vOoPgX9FEVb7Q
WvN4893zubqagHLZUXuB4ExXqwfudLw6FlH49eB3gFXLIPIF88zwRqbfYXTCcyVF
z/nyhs2v4SxRTuTUbTMwE+N+W3tHClhHD46Mg7PMsVqB92qHq7Csgz2VGJJf4Fix
7qH/HvFeqFmSTNaTPR+ahBU637a4dxrSyzLOYgW7QAkVSrNlX2SE7dCshq2GWvOx
p6wiiLI8Ks2I1SmPOWXaXLNQZngjoKdPrar2Isu+WoSUorEq8VuoqDAKOI5v7MiD
vLfewsS/GrCyQaNdMxhA6k0KHlChncUbo50XQ/9IoDW0GvPalY9PSGLWvLznutJW
pjEiVUtm4AH8AbsjSjtx
=o4Wh
-----END PGP SIGNATURE-----
```
