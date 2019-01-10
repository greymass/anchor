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

현재 0.6.8 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.8/win-eos-voter-0.6.8.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.8/mac-eos-voter-0.6.8.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.8/linux-eos-voter-0.6.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.8-amd64.deb
7cec380eadf243789c209c13c5abb75c6056118d6b2e566245a4e7e33dba1572feab6ee4255e0ae353c2b49b85b9dbcb7a95525d4524380bd707497c949c12b5 *linux-eos-voter-0.6.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-arm64.deb
8737c70289e9779e662f069505b2ac05c41df3bd0a5891b3859a530461a6eae016a3419498d60b3e1d56728535106f7c6a8d19283a1f572c5fc34a927857e040 *linux-eos-voter-0.6.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.8-armv7l.deb
9280b6b880c8b1133f0a7905d9ab9e38ff1a7db4f69bc143a88d17738d33f545568dda6f9b6d31d5beddd62ec248eb787e002050f568d246862311c785356e2b *linux-eos-voter-0.6.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.8-x86_64.AppImage
66666a5b9e9fe0970af50c866e7e065177b27e866a448bfefab73b27cece82a0081279c934bc2ab91b630091fdc7aededd39de7cbca8f578ef5c2332c55b6370 *linux-eos-voter-0.6.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.8.dmg
38469b173548ca7f33ca250812aae74127edc93e45f4411e2230a3967320b409356107ec79be39342505d34eef9eeff9caa30e60d3c9f578e4aa7d936a7ede37 *mac-eos-voter-0.6.8.dmg
shasum -b -a 512 mac-eos-voter-0.6.8.zip
904b4463667cb873f7b89fe2cb606c95a7f39e1a76e1ddede0320f9bba4165bfb1a647c6f2707d34bdf32783c2c61b84711d8240a055c4b97eb1302efb785330 *mac-eos-voter-0.6.8.zip
shasum -b -a 512 win-eos-voter-0.6.8.exe
36b5fe426bd450f7f0d1c57cbe86f80ee47508fd4db483e3abb728a6e51eb6e24652ee4f857845418dac2efde5dbb20892a2ec36507b2d77de7931dbd53ff30e *win-eos-voter-0.6.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNutDAAoJECyLxnO05hN9KeUQAJ2x09eWhlwhp1hGVeqftLR3
riczwU0aChPY4HLSZ4VNaK9Llag60tc1yhz5dVB9+m5nblbB4h4gDFBIBZ30Wh0f
sM8DDFDg3Tou6lxLx2qPKN6PEl4lhoY9h8sxgsd0X88/EkgLY6ihfhID+r55T/nB
tsVIaufadm3rNVAkoixrMfb1hu0FkLrjfXwA1v/h8lU/4u2q2nUd1XaEvqBofoas
4jQPmBB6MdoNTL32eig8Z1N2aItRuzqBnkEOpwGARkSdh2aUhQFp1DCNmyaImEdI
/kc/1Wbxg0mTvb6ld5yOo4lz+LmBDwUkJYntIHWmiaOw24SdeOEAmmM4ew7o+XRh
aeuPuF43Rp+VNqrz0QNa/tdVRRzbLOc0i4/fXYZ3a/dUwHV4JNoLoiYyzpwFexJX
vNFOUGrNYFqM9ikX5+R9E95cF/gJJzV2BtTPD0xwprUluYda15XFlTs+Sc6Hsxq3
JTBcuccHeiwQ/tnJFa9aXc/EEzuuSdP6ehkc5PdFm4a316lTLDOwcyt/tw/5DVvN
wSK60uEFz+HO+mKn3coXQGtoAczMSLnNvGKGBIowDr3EzRVt6gUgnQV9DzVm9x6R
pdATD32QHBYfxVpCW/y72hV/jtSDEniPJRr9wFD2L8IlWNPY2X5MKVDQlrXEXtTX
sEmjPVwH0rkCgWQApRm1
=DXcJ
-----END PGP SIGNATURE-----
```
