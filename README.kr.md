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

현재 0.7.4 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.4/win-eos-voter-0.7.4.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.4/mac-eos-voter-0.7.4.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.4/linux-eos-voter-0.7.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.4-amd64.deb
ec117530d7a7cd540e1fc649d1c6914817e900a492651765518b1b65624d6ee0dfc907ae9b8ee0fe2087cad66e392a4bcf233c5e113191792cd648d9356bef8e *linux-eos-voter-0.7.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-arm64.deb
5ff0fcea3ae45400fd2179d28b54d8a282c8b36682d013e78a3dea1c21261d48c9a5412e72e4cd51b220fc44adda192958a5ad0f992027eee49c12d7bc5f0759 *linux-eos-voter-0.7.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.4-armv7l.deb
ed1e61e8ecf846321d8ef5d2df1bdc80e90e4a97544eb7cf9351b4753ee84b75ba420c1d7f106846f7d04138cf41dee67e951387e454b930ebff6ec112914254 *linux-eos-voter-0.7.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.4-x86_64.AppImage
4301bbc3b05d67239fa2d2bd20eb5f83c55ab339ce362ddf3c0e1903ef2eecceb916c1bb713ebcbfe2a45e08a39561f56fe18613dd5d2a8a032f10de35bac86a *linux-eos-voter-0.7.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.4.dmg
3059fddd190ab7e1c727984f8ae6ce676c56c6fca33ee7631396565a8c158a11351edefcbb85dad7bdcd602399337261582d1495e3129450925092586e7923ba *mac-eos-voter-0.7.4.dmg
shasum -b -a 512 mac-eos-voter-0.7.4.zip
1228177f2f15d83e52c029dda3ac86f851b8ca1022ea96f197235c7894b2a8456dfb195bf189303cd766d369fc2d6d84c749faa41f39aaaf032c3fd3857fc07a *mac-eos-voter-0.7.4.zip
shasum -b -a 512 win-eos-voter-0.7.4.exe
3b7b11c18c6377ba804815666197a4964cacb90d19b69a78427013c0940c38d8667aa44a9ed72e421a7103dcb567b9ec5aef7f5f112e76c6a30d22ac99a73040 *win-eos-voter-0.7.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcfCJhAAoJECyLxnO05hN9t/MP/1gGGEMKyQPJmFHsh3u4Sb3/
K6QLT3osrwlh61evgqjXa1whstd1ZaD8GFABPhVIBhYveoygoQSQEfyw2gpcT/dF
7Agg4f6T/vF6OfcfZFUZHN81hQ761G8aZT4mkGXFXG6IJNsHojkM8aeQ6BKMY9uf
HH10HM8L02/KeKUxdDwe38MOvcWPYd3ECCX39Gr7qMmcgz1Hz2HqfI98oH4pxVTy
FrCnsjL3pOVrF9AkCtPvi+FEqgDcmXrkzB7EgSr/O37tn04Tdx7yD44m8evFepkv
N6KKHJda6XW1xar1BWn/FpQf+389XZDtwMdepZP83w8f5UuvD3ADKr8/cVeo3+M1
OzP5WhBHTdbCKLzyg0QUEfME2UHfMTJPBJfC4HjWtbJ5xudyhZa6UtFkiYeDABfM
jq1Xal591ffbkXFVakLfImn5txoM2ib8eQ9efCXje/sKvoKyvS/q6wzNLDZkQ726
akFzBIC3Mvfr1qjrUKXrjzVfq9bKVTEX7uWYgc2jdoskxOESwTaQA9nLtwks2HsY
YwH/CM2TqAZrNlsjRYzRigFZdL1WJV0S+8dlDjZZqMOgYHmv4f7Jb5PXUAKC9qDH
hUSRC3ZDla+OszCKX+nlK9CdNFmkOSlFx0+vr+4XxJtmqrFIzyEVz066fht6W3U1
f5dS4mcxa6gxfr3WLBzh
=OUdW
-----END PGP SIGNATURE-----
```
