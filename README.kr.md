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

현재 0.7.5 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.5/win-eos-voter-0.7.5.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.5/mac-eos-voter-0.7.5.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.5-amd64.deb
aa135d96052585d818f7c47ef01599aa6d64344292228fe8e027973a2d870e5cc5bba6ec0fb8073ed87d5169e30f893c4a6746c7514458ba3b8832257ca0ba04 *linux-eos-voter-0.7.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-arm64.deb
dcab7bf7c943e848622f9a0ee5f4ee52927b6f055a153b05e203463394ad488a11d9bf29533e6b23b7bfdd0eea61f27ff25a1fc8db50bfe36aa8fea97405cc47 *linux-eos-voter-0.7.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-armv7l.deb
865ef4599f119e25c47ab490f7d2700979cb1397079eef1a52ec59451e1c7a98f3930d45626c533dd624ddffbb57b474a211f2f45563317d5d6fddff7147f534 *linux-eos-voter-0.7.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.5-x86_64.AppImage
405c1e7dbe98bf7e442a51143c3be5cbc0028d179f3417809e7f6bfd178cf6e0a509461264ec469335f46605518fdce59d3f26ab02f4d9c0e80e49abe7b2a743 *linux-eos-voter-0.7.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.5.dmg
5f3d0825530a98285fa0191c2c7a956f7d7ba741d5a3992900be95f9eee5cb4c81aa368567c2ebd4fa1d16e40a9f21a641dfa1ea6388cc569ca8763d9e1f84c0 *mac-eos-voter-0.7.5.dmg
shasum -b -a 512 mac-eos-voter-0.7.5.zip
de65d261a754791da6ec7d0a850e552e3d5a8d828cf837c9fa84a0aa0d05ddde61c59179d4a027122b66783db6351ae427917640f85266287d80e7a5003918ae *mac-eos-voter-0.7.5.zip
shasum -b -a 512 win-eos-voter-0.7.5.exe
bf6e1010371a8d5aed757dd0efb3e1b89d5c0a5a1604c7beb3074de367d1a350e1f2a4cf60ecfb9fade3960174557b062aabb88a498f68034cbeb5a046269d50 *win-eos-voter-0.7.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcpNwAAAoJECyLxnO05hN9awsP/ioJ5zINASlEZj7COiYrMDu+
yGDJUJdMZemcCQpHyvBFcV/SGgbZdVd9MM0yc28k7IESHi6kV3BhspexB0tU7Lsf
+KMLGOd2zlS0On9MnQdnrjJdSfxPvk+sguj9A5/y0nyzF+TgTHFXiz6nSPQJ8RVQ
Y0jXD8sy5ntp7/NJYJD+h4PKkb6CguAyJQ+rcd+dvO0cT0k6WP8pBGlIgRdB+Cm5
4OPss4rImS22OvmEVqgbaSsBS+yqqJ+fI7841J5M6iio5dRK14ynuVHpBj//t24E
wMcwKcfcn9bL3/KghJ0QAEDY0aUM5U0lwnuwutVMfNRWRmFnHV4Uglw1yectP7xN
cDFvBr3aUJg5DwxhnLo0vBua8Lq21QamUc584f94u8QC6YW9kQlMbmLsNAUh4XpU
jS2JELTqn026SsIni6QNlbsB7QrUpcW/k9rpu3mAmk9Hbc/GkkdwuYgTLQlnPuTJ
FvsfJ/yn/dkQw/ZM6QcFGtIBD08XyYiBOfcrY6B4cTC4cVxuK7oep1dmsMUKTO9u
KAocVUwV2XG8IONyNl0uBG3Z/UWcjVTl9BnJkl0zBQVOOJE2Ur7brmnIAs6Bg359
7TCWLtUwfIgMToZz3I0rFiYsuqufPieDbICayLlYdysRB8Ol5xTqt2sH2BDUGpLR
tO63ZSfugUz4R5y4YS4J
=gVCf
-----END PGP SIGNATURE-----
```
