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

현재 0.4.0 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.4.0/win-eos-voter-0.4.0.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.4.0/mac-eos-voter-0.4.0.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.snap)

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

```
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.deb
345fe5f90a218fbb2b5d9638a9da56775aec1885a9bf059449f69ec54b54e036caf55becd0c05bf126519e82023f8079a2479deaf091de43fe9e2e33dbe7912d *linux-eos-voter-0.4.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.snap
f6e94469ec9ea4d9e3bcc22d29279722eb4586f5871b74781adcb395dab1c62d15b6ddb5b072cd9c23aad6cc2d0138d27e6bd5efcda27c13eae7f99db5f8dc61 *linux-eos-voter-0.4.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.0-arm64.deb
8ad0d51f4f2019a608093e120cf20814af757fe2d78ac38b7fa169767c3deea94ece99d2cabd8b89e3a6bbd10901a81377c5c8dac22c8f34096df5025b06364a *linux-eos-voter-0.4.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-armv7l.deb
ded0d6db8135ea404e1bda62b62ab4681bb38b9487bd14fdcb7f964c6140b350054bf5c0ce747c07d5ba975ed1952ba1ec588c3505dc7ff5ec2cfaed5c11f004 *linux-eos-voter-0.4.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.0-i386.deb
38259ca723b9104ca19f5006d94d994a1621b48ddfc8d632f835f02ba8faf0bbee23e79eccc7736506b91945710aa5d92f0b539250475c0a557662b1e6dfb009 *linux-eos-voter-0.4.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.0-x86_64.AppImage
80b960ffd41ea249574ec68d63bf3b6293cf8c5179fda7e6b9d39742b6e43f0eb303eb24f2b99361ce1181c4fc03afd43f370cb33a7945baf482d3eb8076d85a *linux-eos-voter-0.4.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.0.dmg
7fb73dea0829fdf070ed8f6e964b95967dac22e683c5707b2df06915663580cc4d741f9ce0b6da3d374f91ddbab7c18c6632b9573e8eadd35c81e25e0e46ca65 *mac-eos-voter-0.4.0.dmg
shasum -b -a 512 mac-eos-voter-0.4.0.zip
76685389d7c6210b536225ef63c7aa42c71d0eb51f2f1e44d178456f3d48ca5e0badc786bc05af50d7d0ecb5069a8aeabdf7f96d8bcf9916b2099a3377392386 *mac-eos-voter-0.4.0.zip
shasum -b -a 512 win-eos-voter-0.4.0.exe
77e3061e01bc6bfd3e62b54a11ff0f7638033ec5f0bd942f10b2359eeed615c1316df3bed1636d60618a7459bc2c5a2ad23cfdf6065ebd01cdf5b01058d8677b *win-eos-voter-0.4.0.exe
```
