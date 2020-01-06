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

현재 0.7.12 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc3/win-eos-voter-0.7.11.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc3/mac-eos-voter-0.7.11.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc3/linux-eos-voter-0.7.11-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc3/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.12-amd64.deb
db3e39af4aa36711c5c0af4b5e63d5eaad091ca65da5540b40302d29b2a220a47234459557610706c8f4ec6eabec92bb5cd0beda51986bdbfad3d3b74c10009e *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
3ee2ca8f7e5cfc59cd40da84ec55e72732ee147cef35225a5f2d4e7047c3c71d38d7792e45b6423727cc7dc5769ee2bfa7f56e13323678b10641a2c27c780b70 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
ced69a3c32905299849c1b6ff68b282ccfd1d89659bb33f67fb7c16c30ef2af314a865da1f35d2e7c4f6a3e53ad9e6401c61a7225002515e797972b1f93ab190 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
19e03748b6d5e9d42ceddf60855727b37941bcf807d040c5705421ad5e9e11d80118fe5458107ea8316a4f1bd4b44ecca314bf47c3b18bdfb5cc0fc2a241a1a3 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
036f4217729acf50a4065698d5972dff92063653ea969a2c31320fe585ba308aaa7f1ca2143cbae415cea0f0f343d26f20fa5edc5ef9c14a8e1aa02208655461 *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
752debf045e6c0105e80fcf02f1b3218d3c44af4accc4cbd9d24f68937253ecd90161e8be497aa2ff16edaf051230d6fc4ac4df4d3c7b1f2f1c2260b62523275 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
bb36acad70b528d28ad096a53bd41b83cf6963dbc8578dcdc3b3929ae2ca9392003bca1fba46d0bcdca975744a1febdd6edd78cc5d6a9a675466a92ca2b700aa *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdteGYAAoJECyLxnO05hN998wQAJ58csR7u39piEpumRLiX9/Q
pGJ6Kmbq1SrmxvXsDOAUPJT53KWNSuTll526Joq/a/TlR7NEx/fxvVi+cOGnNCmj
HdxLNoaExeY5HCDV1/hc5x+3P0VDF5wIfrN2YHh+de0yNXmr7cr0lgoJlR19dzf2
LzlKd1+8DcLc5JyZ14+Fv7WKeFvWwEZNY4KtRNrEXhqv7wX9b1snKVy5AqxGEHoT
1bVdt8uiiwvDVlTTKEDkc6lDNkaY+V3C41CtQliSqjzbJmfJYbGDuh4xGo+kf2l4
OBSq38jfF23wSzP1JEzipPZHKsxlm0rA3RuXYLWOO9UP1AMR1esUGiQ7Q8+iBebK
SYsju5AYfgpyrgC7C0fop/IZsp0N7sr5Mp+OdjHrkOy6TNNDtVRdj9b2yQuKu6ds
UQe7MpLY/n/PRt2b05xMiIDNOe+Juf4vvWuARXGYec8nm7VI0v/Rf7F+BF0XNvgI
bI0wnlp8YPbkeCRvRv+IbzqhL/sYLBMay2j7C2czxxXnSlWcis3cSUDfFF4obw/g
SRxBag6/Yr0kXYN8vkwpjbkZXBqdL8fVC2RW9RZ1CXzCxyRyyQR/BAJg5xUIKuCz
b+RBC1Lbp0AsfN+NnnEl+QZNnnipz+S6yJFNjE5c1q/rbJSEE/jeUfJhstc80jpk
r41s5ya+FBzxIX3SLUsp
=vZcm
-----END PGP SIGNATURE-----
```
