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

현재 0.5.1 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.5.1/win-eos-voter-0.5.1.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.5.1/mac-eos-voter-0.5.1.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.1-amd64.deb
001d9e8b38dafc31bdab360dc758c51e7a978fc80b87ce1e03e55cfd0f99110704ead1add62b1cd4eb550f6da0aed1492ade06c57269d607ac6ace0d1d5cb0fb *linux-eos-voter-0.5.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-amd64.snap
229de9fdab1a3c9e1c660530774522cd6cb7829575f7ec6767dce3c20464c5bd5a61621153ee492c1df7b9756b6e594fdb06b4c9341fa5e18c46480644718bc3 *linux-eos-voter-0.5.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.1-arm64.deb
eec8f67aab3cc0f46a6c3181cd2819a68c83d470a838b11856ae5e4aac43f01063a832986a960f93b84cfdaa619f283b95fff4a021725bb05f6d9c82e3bd1746 *linux-eos-voter-0.5.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-armv7l.deb
a2ca519da2c3559c448eab5a94406e891462d4b9e12c9b74e944f350e5741dc8ef05c653102a439d69cde2804fe37315580c054a68423bf542ec5002622011e3 *linux-eos-voter-0.5.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.1-i386.deb
9ce361225aceff3a65732d607a792b83ffe6d59f78b0b6e2a8d58e479de4299ef32161d10fe09a28b126a9a25010a4ea4ed816c8c400427b3d03eaa3e9e75c22 *linux-eos-voter-0.5.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.1-x86_64.AppImage
a8797a5d838539efc007808c2d3112cc2833b182b22f5aa63bd63a6f09583aaeeb22db153e79156bd73e8ef63a7c176e2b96891e36c05a9ce7b5c3fb0214017e *linux-eos-voter-0.5.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.1.dmg
1e34bf2a0f57a7bdfb9292129cfb03b7aebe0a73c868afc72d23a8ac8896846a96bc4ea17241172c64c4857107cd73b27b08b078983a6ed5659f05d25aa1f97e *mac-eos-voter-0.5.1.dmg
shasum -b -a 512 mac-eos-voter-0.5.1.zip
89640896cb92f9991c2d4cc09a9700d8b7939790460bd40af3093a07b861cc13ecaf4609fa131f700ecc5a8421199006b54863e5641ce4aa613eb57f8915fcb5 *mac-eos-voter-0.5.1.zip
shasum -b -a 512 win-eos-voter-0.5.1.exe
06e24034bd3f0ca36357d289b48ed22b0a707848025ec45adddac126fced5b6b1111fb83b0d5b7c117492c7929bde0a78a786185e943c971dd0667a0538bdd4d *win-eos-voter-0.5.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbfeIlAAoJECyLxnO05hN9IpQP/1LzHhhaV65jGJAYp20j6XX9
yzdl4d2iEbMyPRdN9bs98sV57CVHS6g3delHawXOatogZsOaQKRC8fEiAg77EJAG
3siPqwiIBJ6eYUk9lnUGFaCQcroA07yOfLq1yybg9fVzAKiYe5TCBDlsXPUreGu6
1AiNgE+ajJiX9WNv1NyPHpxTsBtrYbJk5wVw0t/SV8oX4si7OfxiEINMnWxq94ph
CTzmkH36H8Sc5iXkJU4sAyNTtTyOhmj+d/MrbjZMfusvlMRC3Z6yraHvTX5zuyop
6HrlbwA7PBCRnqz6VAoCv7w7b/bWCBcB2Ldrwsf6L3zRm1thsqsnpuLb2hJEZAib
bLshvj0WIfgI6O5wXkC2cx+Wknm+2a9uFQW8kElaXXNZYNreH5y5VjU0FkUVYTa9
Gjl8wPPvKIk6oxlRXu9FjbO66b/3ZfABtB8t28ik74TfgBLIlHlaDzMe6qVr8xrh
6nST5qeSZpooZ+J+KbRl9GVk8Upzg3tPOoJlU6+efJJqwWVl2GMEZFS3NI12wdzW
ICBq/+uRK20TTMoz9K1OI6IaCIOOPigItRQxQbt0aLgJSqswyEmyN83PptxCuaNl
ZzZj8uEVSTPBEuqhyb2dguIv6Ln7VaFuPOmWnOBzB1/3wqZUTi0Mtr+0jxlXrz5T
Q69/2TUDEepbkQD9HBMO
=6SX2
-----END PGP SIGNATURE-----
```
