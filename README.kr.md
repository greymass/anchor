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

현재 0.7.11 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.11/win-eos-voter-0.7.11.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.11/mac-eos-voter-0.7.11.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.11/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
d2b5db8a6d0b4e0963d392c72c400581959766cd5f27fa5032351ae6a95bc487fd30773d361226fdc2dd97e1d39433a54eacad72583d1a125d6b46e03e78ba94 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
3aeea5e196c48f7a7c03669c25f99110cedabfded3df9f97e3318e079ccd216d10f603beb04f840911ddfaacc663d59a47e3539db4edf8616d6bfe4b4b5e83a3 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
a477912c77bb93edefed27a87b58cfa19673d308a68ee649f2e7dab8aa5734644ed51d758908851f0a71e78739547bcab39565136c4893ed150de47a5fab2d47 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
02bba946eb3deb63690387e6233a899c68491e588d7a1b95b62fb6f89210cc39e365bd6d318890363ade85a14f9ed8873dfff42e2d02e29d0fc6e9dcb6e14225 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
5e39d14a25338fc25972f0c89cfc98b4cc682b66fbe48e9888f9158ea2a6bb502de23454d8976014bbc76e26501d7ecfb9ad118e83ae9db75345689a464af7ee *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
ed39a12df4a3fc8ca859371d34ceb86dd7516cb4f2a5290e3e6a2c652ddcacd7a5cd766bbccbea01387d05f46d608f4852c3b784099da063c5cd733f996039fa *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
9e2df61a64b0ce00a13a005da1ce0d6f8526f4ab395465e4898268357be61bab4030875045c4c2b08ba14144500922a55d84cc92f534a0aabbcac2fd9943c9e8 *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdMimDAAoJECyLxnO05hN9PH8P/iKdFecdVwaTwRv/jygRtekg
p38xPNiN5xyQzm6KgW4tg8IHsof2GKD0l0In/IcPiMIm0Zrvqq/StxluJxk06ZJn
b8shvsZD3OHgFtvCVo4ldEisbn5d6G2VqG63nobeg3yofPDeKpR5V/0/9vkhQSos
XOZFhUw958oqU3jkR2dcgDsUZ7gISlu6Cq+jvbFuGuwpaeoKCyxCfA5tY3bUPUsK
C4nPZUl+Xstz4rd5T92R6x1SBTNEUUL6TrPK2R2VhkipMeHwpGALmeGDS2+Nan4D
4AI93h3vNzyutqTXrdm0mJJo3QPQjgnmy6FBew749Ho+km/qEiEwgHtTFNGdSjbz
Ok+J918CJaWpp4Esl/m4Z7BxTR6XlChWVnaurXhxNoeRoIOlLvFGWwg02IlxADBa
Ecz0dJ5cS+AxDHntUQjm0dBh+SSpXYvSdZ0Gx8+ftuS/vBkMc+i+5NDqtYbWGXqD
UG9LfitatUcsrSnsQ4CAdirAmXuZJR3nL3sn3meCRVWNgWi6kNn4voVAFALtjfT0
qkx9se9phO4uXKEbve90/i2UOwXHbLjol80LSkOL8AggzyuQozI+don5JR8cVmxA
F3zGNbc+OMKPoyB9HpFA0PPbG9/L3TBDawdAd6R44cXijWI9sPO07DaVA8dWtZKH
yYi6VxpfyL9HSnMr/4ch
=RUm2
-----END PGP SIGNATURE-----
```
