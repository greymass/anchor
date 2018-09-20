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
3acbaba16be8f9f3159933aea50e5ffe39e4c9daa8a2ce820b3424f5e630093ea80b74ba78b8f50d6e1a96cb650fc2c619b24e7d4f3eb3685353d9d2b1507dbe *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
166697e3cbb2a7d1a2d0b04a90876d4cf22d0f08596dda4f0998dff8f6f9f965084d72ef247f776936fc0d483e49845f38596eb0ba3b899c19ef499985bb48d1 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
3d63b30b288f8e4fc65455dab6c3d9c64d2806eeae25b023f50d8e0704eb3d9f40668a53972569b22dc24e63d7f78ab01128e7dff5c04a290d2088a749866c9c *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
768c5e525efa87d02f541156ae50adfdb1d26c4b6a50fb5e1a70e29d5fdba71abe4eb550feb5f83dee4ba6c29e50ef47b235359a1db49871dbaa0c1e9f426369 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
78ccc6118607a8c548ece91316111a40cb1493268cb806dc4c82298002156461d4dfd5f48e540e1270d3c1efe8a4acd0cd0b7853c961465d76bdc3f264b4c96d *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
56fb53f17a6e1d2582a26b4ec9567a31ff886f76d64468a575de118c54c63cd72e38797a6d62212a3bc006d06f317fd8fa8e3bab55946737949ae7a963deb757 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
e375ba191a7aec80b850d44d4127efe4ec3921b39770f7345867e2328cc0e637078499c374386a3909ea2d47f00c2ce7e6c3f557da9641e7af9752cf615de761 *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
69c47c2641ceaa1530108637692cd714efffbbbe15b2835bd07611a94808e7f4c036d142cb02699839be285980e3db5402e49585167924d2ef5d3c0ad8ed2c54 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
445c20134561e8191dba778b71a4688c7c1fdc0b39148c839d68aa1ccb6b0b1f82226365590ae50378fcb416019de3d69677253a5404db55d3aef465d7ee7e11 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovcmAAoJECyLxnO05hN95C4P/3PYiF/AY4BnVUmGVNw6ADQu
W6bOFaNGBtKm7a1mhiBraNrfWmYtVbpW356iqZU6ERFQ7pFMu3v8ri7NDNUJFG1r
cZMgxnDyPccRa4bl000ayCfOpbLh3hnV9nKMFCCDLw3vdr9pQlHUkasWNoZym870
uXBQQqlb3yegwk/0eNhu1e5veLlrXe/6Q+NmEQ0XoS17dUYYwUKWTgHvnj3A/n/O
HjX3MBsGEvxxkGzgWJwgWze/u32HuGbL+0wiKfVmpZ2QvHnJbybuH0c3vmqi9eCU
HkraI5HxfJb/Wl0wJCUVwZZ7LfsL1AmlIv3Y5bC/J7l97Xwtz54enV6sdUFBo2vJ
n59/j0rI391mKgbXX+NyL1wL0oaZgogv+3BmmxF3g1M/1uTNVUyElKAHiOfOkAss
IxXdW/FANfEj6CiO7lLrs5W/GlubQM3QqhUX2NOZg2zFPIHZ6DcpWrbICEJgCApF
U3Bfy1hlQdWZ7cxmsFvTUU1fs0ldkR+F/ceV/bxLGoHOi1iUJi9ybhzyKezvV6uV
fxLu9nLk0gZsgKFoTQrwjwe355BqKjDlvukCm0ivVc1mZ7c8nyX6mQwkCQputE2b
wXo9PtXFvQCFjDw3Setd1InIDPlocwqJtp5+CfEgpAXdO2+Q5Ss3dNr4YX71tXIe
c7BMQi4jsvkWBkruLqzj
=rC29
-----END PGP SIGNATURE-----
```
