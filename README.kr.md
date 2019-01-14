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

현재 0.7.1 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.1/win-eos-voter-0.7.1.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.7.1/mac-eos-voter-0.7.1.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.1/linux-eos-voter-0.7.1-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.1/linux-eos-voter-0.7.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.1-amd64.deb
45dedca9809ee0a280cf173785a1e828d70d031fb490dfe15143d724c000d90c5a616e6210d1fe73d9a5a2eb182da90dcb50d687fff8828e606552799738ea5e *linux-eos-voter-0.7.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.1-arm64.deb
b0c870363b2872d1aada4a087c7b116491c299bd4fea96f05e0d3e81f68e932e9b604dbb6e0073cd511f9c0b7aae03bf9ca281ac4b7a2858c8e64ef386d25dce *linux-eos-voter-0.7.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.1-armv7l.deb
89ed394b7e4f97c834eb883d4c96ee98516fd3f534973872c1c0ad48e380e2bb2157fbb4081cd9c1ff90cd0eb89f64367ba1091e0a078de8db41f89666aaf39d *linux-eos-voter-0.7.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.1-x86_64.AppImage
ec87d40caac53555643fb615de9674b8edefa8ef71b93c577a26c8b3c83f6273abd88809785c47217d10d96a37695a092d067c420b831c7ab13bb4adcdc001dd *linux-eos-voter-0.7.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.1.dmg
0004b2c1f7f3e4f123ebccc12012b21259d26d01a0a67be9b03216ab2846cb9d885bc0fb1ddc589f153d355290859349a3f181e3796bc069f6f36c42302a9ef0 *mac-eos-voter-0.7.1.dmg
shasum -b -a 512 mac-eos-voter-0.7.1.zip
3ffb82e66029af626f6cd099d4883b3be416fa21c824cb446cf80f58871e4b441b400446da0840462876cb2373c49de16750be07dd1c81c369b3d0070d989eca *mac-eos-voter-0.7.1.zip
shasum -b -a 512 win-eos-voter-0.7.1.exe
463f99128424622665111b9e7d9dbf09c871f3067df31d44343444771e9a9949a06536f46ee9079b46127bb8084a6f80ea2f953ca162012526e22662c2d65353 *win-eos-voter-0.7.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcO/J6AAoJECyLxnO05hN9IyUP/1I+N45d+/71Olmqf4o86c4H
F4MaZgc7rmaFMPemq/6vaGGvHRV1CYLEmE1Y5lFXNtVKR78X3SoEA49Uxi+ArYbN
g6YHwel1PtwksC46nDwicxtFf9XJxab7j0Qt9VkVPzWZDYMIu0SQeWHwDhKHpWyk
b/SfusjR+aubdeYbMw0r7cPMMKuhdy+u7oAhxJMUCcS7eTJZ7D3a7QK6awaJ5X7+
3y7Xy6XcmTULcctA3xjwMq5M/CcxLnTHfI3wNwJnKJb2u5WZFgsj6To1A9QAlcxJ
gklkJ5dvJxdHnHs2ed75oFVzsM7uzNzhJQgbQQpdskKmbJnMHkg6g+1RTIXDps4A
6VnQdib/34SwL2u51WX1T4tFCCWWe9MN54fj78li2iKbK2mQZ6DazJD8TEZ7QxCS
x/umbevTAryTvEzODLecN/PgUsjdSoctpTR8XQsIwR+0i6fNjEj3JN3DovwNzWuS
Lx1n6+Vf+el9DAABdL0ov73ONtc4ojdbXWtfaJJoXusAXOD9md0hwAMkk9c/VeuU
xtT2Rk2pwVKaXf31sxE7lwHI1nfATiMGuAPLUafrH0nmE+HfhnhzHEXqXCjkWgm+
AfJoi0lrOFUegvQN6HI0tnKsulExK0GMTutBVcfHEljTITENmaKAXwLcJciffWTy
r2qlPmomqiwimaxACafo
=XUHV
-----END PGP SIGNATURE-----
```
