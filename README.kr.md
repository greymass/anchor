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

현재 0.7.3 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.3/win-eos-voter-0.7.3.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.3/mac-eos-voter-0.7.3.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.3-amd64.deb
bea81fe2e68cda5609a9e322fc54d44d774c3f0204dcbe874bb0a021d8d408db2ba375aeab984e5cc44886a66608168f6889b57f1dffce6cc266f3edc1c83d92 *linux-eos-voter-0.7.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-arm64.deb
ebc6cc2b876cc1e37e47aeb5472cf51f6a58d8299dc0cd491423c7de6a31b8cb179198ac50e4a3601c48ae87b366fddb1a89e1c7eae57c7428dfc01b60550989 *linux-eos-voter-0.7.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-armv7l.deb
d3d39e6aa3fbb0aab564ebbb4a9da21d34bda928e5b42eb6fbba62fcf3fba678710aeade713125b24b8294f3f68f236f3c32cda53e0f251135f3bd329bf236de *linux-eos-voter-0.7.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.3-x86_64.AppImage
771a355b2a87c8078a10ee6bded05a87a892c47f7e2e8483ad889a70b6b81300a257c07ff99551c3bad99dc5b7e83eaa90d55fc07ab5ae5fcbd3cdf0ce0349e2 *linux-eos-voter-0.7.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.3.dmg
6dcde6ffcec4d249768e2e5c3b954123c6f4e034e9098785f66343e2277de2533697050b9aaec684a33c2ea7c40d60fca104f86bf6809ec4cc4c41d2bfac3272 *mac-eos-voter-0.7.3.dmg
shasum -b -a 512 mac-eos-voter-0.7.3.zip
df15d10696995558e39dd919cf86b019678d7defd6bb778b36787330d35ab32ec21aa0cb4d922f3fa0fa09b98f315d1b99713e63d3251423861f783178d2a158 *mac-eos-voter-0.7.3.zip
shasum -b -a 512 win-eos-voter-0.7.3.exe
04c58dc9c238e9c0535a9347dcabc3364966a0d1473e98a2e13434cf3199fca0491f51b9a945ea2326c8ae203b04f533d730f9aa904168dcfea5b365a2c24a4d *win-eos-voter-0.7.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcdvV8AAoJECyLxnO05hN9oYQP/1KSQ2orKzFu7GQy7pLUxxaF
XGBixNm0dqwgaD9UABr2wx0uWW0zAaeZXy5AUNt6I6EdKNFT/R608vG/dFOqVd84
qJpFs5ZDFEu/8/4zSJdznINWf8HurETmySI/QcbaypysLrx3JO5igF4Omr/YD0Lx
++stIuw+Xxv3UM08PpQm3QQQ8xWwv4mVcVdJeOh61QGXoN9w/uf0rX4TuULLNAex
qcW86alypYEak4ubf8+5gz8bvOSFqETnd/Z1mD4wrVYZdBKLRXFswj5iwS3hHJcj
9o/njv6lugDY4RqczkeTRQLJNIvE84NurkhHK2uVSHHBdWEy6wn4oajuCkfDKy7e
odtJthGzZjefGlSU/h4gXbP5rLPJ6dsEhPXFzsIxWDzuxaAwqzpIdnaFDxVB18oj
dlH9hG3OEbyZXmrpsBVN9J3tULESP8rKUHVwvlBjcmtnnnGr33zA0Q8CEuEqT71r
rZuZSp8FdepQOzzOk/oDEvlq2IlDVdsim0Ka0UC7e/tI2NikjAXrMFdI0SVArWU1
ZP3an36DAoxX1VB8AeMU5NxuzfURKgs+ZvRWnv7HokZG0FFTdp+JPtqcu/qGGfXa
gcEHQ9NyQRgKQty3IdL55m8ubw3zke3vxgDdKo3V7w+DaXzUo6kBB9hk5izGT+0+
v5p5a9nKvG7CDLyJLXNx
=fmUA
-----END PGP SIGNATURE-----
```
