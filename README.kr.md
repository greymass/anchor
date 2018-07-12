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

현재 0.3.2 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.3.2/win-eos-voter-0.3.2.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.3.2/mac-eos-voter-0.3.2.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.deb
715b3d4a446bab2e1d9278b6783d911509bd87f31c905b556ba94f98830dce9c920d6663eb1ca588fbcc8f0b6646a75d6ab0daad1edfe23672dcbb2bc45ab5fc *linux-eos-voter-0.3.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.snap
ba3e60950dd9d87a46e35179d178eecb08ed6f2f46829c04cee4f8f61a04be65ec6e367b340a8d81060e96ff30ede7769bb38a993022aa13bfa823a421537147 *linux-eos-voter-0.3.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.2-arm64.deb
056cff9e11066d6cb7ec97cda586daa572c3d71e62f76603055fe2ffc477417051b3b6c4c573b08fa01551cb1294d025e1818fd40de94bb1eefd971259a5c9e3 *linux-eos-voter-0.3.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-armv7l.deb
e6c7bc7e2b958c8a85c5db568ab8fc409d7c324eff5136dc2e98e3caa761b74ff69a188b42c47fcb7da3b867e276e4962e8f6b3734bb1db9f0c48a5f42ab7d66 *linux-eos-voter-0.3.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.2-i386.deb
92b908f5906553877856640de7eb39256f4451f38f7cdd1178443fe302cad9272a325974b5a5e14df5074018a4c6a525e896cabefffaf4e3e5850726f599dfad *linux-eos-voter-0.3.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.2-x86_64.AppImage
9e46b5a1753ade0d26cfc7f17829ea476cebbc32596ce4637e827e41f245c6c1914952926606c58b27e4d27f99465914c7c88686e8e85c154ce68db9bfac0f4a *linux-eos-voter-0.3.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.2.dmg
0f8e1e8e69291c0686bd95fa25846aaa5f0fa8a4bf193cece54d1ac09aa51acd3bfc7f1eda2485992b9df083bb03b4e2cac62ef71f798f8646a8f3c499ca36c9 *mac-eos-voter-0.3.2.dmg
shasum -b -a 512 mac-eos-voter-0.3.2.zip
23877286bd0f98d8747d23fe49521ccd52963ba49d6b24283083a61ca591ab6a015190184641f35d04cb5d8d8fd45210c5861d7709b95d6492d79c7b8d5ba216 *mac-eos-voter-0.3.2.zip
shasum -b -a 512 win-eos-voter-0.3.2.exe
7c919e9f7d600abd57113544a4b13d7153e2fce95795093f7e57fcd6e37e802e6a429d2e69a78ab9860127524fc70802e785a428deac3eab79b09b4b12ae08ed *win-eos-voter-0.3.2.exe
```
