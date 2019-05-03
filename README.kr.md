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
c4580cf4fea96e0ec6e043c0f44834f968da732502809248f2d6e237048fdd4b547872bc3a34e816a054156c8b8a06125ec298f1d7f5f253649f510ccd12b6ad *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
f9d22567d27dbb788a9e74cab809ce75d18c4c0fe8f2b27decc885978a3e53a17d3ea6b7b097781581a6897e691a3d1606c8e659f1130d0ac822f527c30f74f8 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
f99b22932337dddf68687058479ee3ae7c26acf57b39f33673e9bc97679d90c82460023a8a472032950c384486cb317a9da1a956fd3eb621863b1ae83a577704 *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
cccb80c21cfa9cb134e1708ce1797d094f9c56ed47081b75e15b624e5af96ac7f14883da04c26cf817c2bd7d28a41d4e6c306fdb07abd0ca8dd1d072bc44c815 *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
9f8c2d69075f118627272f8e0df89db0fcaafb59f6bc61441575effa4f2cada48e0e595b6e8d22a3ba1e2c55a7a6985462517b2eee8c4e242207936e1413a02f *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
c4a13a6e9382991aa99a311a888e7c5c86f360694ceb2aee1c0b99c1c8a3dbed2b3a5602ce4ef8a1b8b540129fa9b52c5b7b331ad33525eb7d66678491c8baf6 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
a706ced71a10d6e201d28bec8961743ad6045e466c4bac5bf8fa5fd958c494eb132055c6205154f44df157696a80e13dd628e2c40df6356cce064c17eac9b0b9 *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcyjRIAAoJECyLxnO05hN9EWAQAJyYjJjkcwgjQUxpdrlpiLyt
1cSkq26FYuQGsP2AB2hmOLerHI2wdVqziJ8CYOmFYLzXZa71R1xZcDUaUrNILN+J
7Y9nJ/Gwscdes0llVVlewYH+ZBRTd3GbWymIaS7UiL4NlAl0fuEnXm5qvb+HBY4X
zYTsQDYgYkmzH32VRf9c7O+F3oPnKVi+sy7mp22b1bEoa+6TjodmsKYmFXrC4gn2
8NESCP6sPemUZTkhqahcvegUAIdDMVhVy/eBw+grJyZYADAY0CfqGUvHARgT9IuF
r44frw237Rdv0n7GPFHTcBAy6wDi8G1GbjO2cvyQzgc4p8IZaKs865Z/kzK4Sff/
4j9IZfVbxQPNJ0jEaPDGKDvfKIym92ydY/LYsr4Sj09dP/0K4ifINsd9bs9Tm1or
jTkp5AYNd+ghWJ95RMMavBUIOyL4DiIIERf7VwcmZ7T+lPFByLxqA+5mAyp43DR1
ydbK5J3ZyBGYX0MrnznDVjsF+JVv/+LHZXtiRnMROxAXXchEVWBNWWQaEQaVHGpO
48g30SjMYgLt6aRwpHIkzYxzf/cJrxMriFdov4O6CSYYtNHmDtmvYB/Upx/hlvSU
hbHDKTG8OSxU8jlFVcFUBuF0wD7IDWr9uG9JnvDYiVxCX42QUVb66YbSg85JoWo1
C71trwt/RMUTiaAHBnun
=UNws
-----END PGP SIGNATURE-----
```
