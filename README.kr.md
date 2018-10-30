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

현재 0.6.0 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.0/win-eos-voter-0.6.0.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.0/mac-eos-voter-0.6.0.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.0/linux-eos-voter-0.6.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
d4ef6a69f5e5c5bfacbd96f0009552a37ededa18663c7c002af3d19e22dda48a46f030c7294e91b6d6fbc3dfcf75b202a693563a97a944881001c01711b6d3ef *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
7722e90db10bd53984b9eb7e00ede8595bbab9e0ffbc72d0acf4e8ff79e6e771a64c3fe4e2514bc8d59bb34256e4c0072beb633fa713720507fcd62b7c2924b1 *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
577ba5d04fed39cd5425af8718e065fb712d9bf62854811beec233053ff5c2d1a66ad2baf50e079fb22cbd2aa0bb0929b513e7f44258ca986a71f340619eff3b *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7b7b5687b3c3f8fae4049cd4dee1b0b28a6018fb98422cee7d3501a3f0e949e5de0d0b98ef48d303731bd94a603a1a7cfdd717df2a3a4f35ad8b94bb83ee4426 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
shasum: linux-eos-voter-0.6.0-i386.deb:
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
fdd898c8e6a97857b72709bf01e21e74b77ee5dacf63972e7473a19296940a28c34ae2abc33d14c4b411159a58acd913e7304eafa483ff7c49303e7fd344e190 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
d5f38d3bfbe8a02010b2f1a633f21bc08af68b020ad747c0cc2f8a92ea4160ba80537061a9ca643b7ed6e8970a2f9369be0fd531d390940e1d4b0afc6ec6c0ac *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
16ca3f7e145348c4aa35fa0f581ff25a6e794d645e6d0028bcfd16a0dc628c1501951fcc7f27578a17b1e3aee190617c47f78f616123af4a813f12b600f72c48 *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
3fea6e514faa56eb3c2abca1d31bf857b652f0dd29a42a260d8af814f14443494368149f4cd1d4adaac4b43465f53e1ce4b845a2b95a4e99aa9a800ea7565e67 *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb2MQgAAoJECyLxnO05hN9OzgP/AiDx9Rt5V7F4bBlvN4LEHVG
y2XOnxodtPDyD3dPInn+bFnWpqIajjxSbhFwvnjokFmuuGKLtuY0oAKz1Xiravox
h5+Is8E67HgGia3scnL8qMpax6UXX9v56rQfGGUEPHUqXCRmbMhusEkP1jSCvsjQ
BICVnEWyGi4afXR05pAZFckqg+bQhbjvnimMH9UKZh5zFOcXW6HA4lgSKGRkcXC+
YwA3oRnGPetnDNhU9oPQuzmtFGe59HrU3cIEDer4rwzxo+e0dYor//7yWjZihYfR
ZmnS1Q4h47U3XkLRWbQBOmRZKgPAX/4Kv8bKRWearR7H1UQIRIeKuRhlg61gzxTW
Ee2oGs0F+waKbVXS2UDoVk94DUvOoGu4/PPUM/KIhYRMYuB39/pO6sxYWtmo+GEU
39PqrlSnCTr7YKe2xuOZNUQpI5CgcXJd+HphkEpbHsh8S+/Gv2m7QS9IGy00DOCV
R7sMRaXKEorFiwt1L2JHrB6HWElzH/zmDullH82T/E0q6wq+xi66Vlyj9OAoCUfU
NGRHZxftulaTX5zOxnRJvlzsRluTYHvt7Bzz+U4N0b0SZrHLlb7ul/LkPw9OWn3k
9YiFq6QYbXHc0NKLMgc9j3S14AYzEZTxEzcJUAm1dxI0jYPCc0M4UIv3ViRK4PhB
CvdJUdD65R2Q8sunVnB7
=SEwk
-----END PGP SIGNATURE-----
```
