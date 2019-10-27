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

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.12/win-eos-voter-0.7.12.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.12/mac-eos-voter-0.7.12.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.12/linux-eos-voter-0.7.12-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.12/linux-eos-voter-0.7.12-amd64.snap)

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
3543bfce0ac2e452ac82be539da1ea35ffecb5cd2802135362570f44a38fa46290fc42d5f80546024d3df0edef1bc90e90c6031452c2c102aa153933d6684de9 *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
1d70270a7f37f2e4caaa3fb2b5df761091dd6c711cb23aefe87965ec790b1cbdc46bc3079548d862e803e3e0e5887da69653b98959c3112aeee9fd4152f3d874 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
2e6f10ac7ba5b5c43d1f16935e62d34c922cdd48f4f31e6bb1d697e2e35cc3473b4e083e4bdcac34273b81aaf7255ec4acc2bb42f9c0cc3dca8b9bf516cc2f74 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
6fb76795a66231a8809acbad2709edf94789e7a0cf36a2fa3a9defc472c7f4d70ec4bb0d9e458d8330fa384b5c15d64c454cb429cf24de9a679dfd89febbf634 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
fc814169319bfdf91b52e2f5ac18115431734552f8c18dbf8f43367113641946b6670dcb7805c1cfd9c37604af5adc0013e4634732d6abc450819e0f7b26dc3b *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
eb6e193ce91e4e1992059067f985595d7ff4da2a50e8c25a1e1cbc3302937fbfcfd7e2b3117f776b690a9247f0392e4035e7f9c78e2c678497e0f308c6154309 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
97edf7aaac9a0265f8ae21d70ce021294ac427342353bb306f1b87cb19b10c1f8dbb50a1b51807587ae4c40dc92fbe06f70053343b93d54b2ec2675569dfef9e *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdQNYzAAoJECyLxnO05hN92H0P/315x1SHKABthYnHbDj70pqe
rkkHFNSfGD0kiAkeAqCh8gPxCcMnP1xqMlM4cMnY2OHwOt0jjmQxcixcIrWZdhmA
7wKTvLa/A2OfinRQ/+EX6K79iSTjbLYYDeuS9ko4eQNLcPFJ+gnEx0bjQZKaVtzs
A8ULSWXpWqOZ4mR9ZH8BkY9RO4zhFEZUzp4kmGGeJmDWKbRq5pGuH7713XKwewAY
ZuClxF5slcRcLvKx2H/IJgfYU4sPK8YhlPX3Kkr3spKJs3pctNyBUxsadmjKZ/1C
gXWKpjIbFOQTcoetYccdJe5fT7vdKZv7Fv7SszCRLAUEMyZxcTW7f6nj46hIKsIs
PWgWegdO6JCN09KC1zfslTv6UpJI6uSb42CPq49EcL1FKsJ2X2B4sA4GLmwmsQSx
DtEaZcOvnC46rCuuhEZx7EXRPcixdIuuJosqv6qn2KKSqU2e9oyLfcPKy0nQ7H+p
DBp+1kbEp5bd/QxSdaGE1ohOH2Tf1JNP+fWSXOiRh5987IC9xFOtl53hv+P/nTlP
KdUo5l2UsjR4qv1TrFUg1s/MeMk+36ZSMkN9zqIG/nyMn2/EwGftqb3xqflm0lu6
fcgm44kM1bx00DdRAseR+Wa8aZ5SR7ALKewvQU6+3br9hWS5lkv9vdpzdA7oWXHl
fcHjrk15VeLqUpVLiFM1
=7eTt
-----END PGP SIGNATURE-----
```
