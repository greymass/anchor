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

현재 0.6.7 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.7/win-eos-voter-0.6.7.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.7/mac-eos-voter-0.6.7.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.7/linux-eos-voter-0.6.7-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.7-amd64.deb
f2899ca957d9703ed6b1538e00c71d284762cbc22514b4a871811ad01092c8e3d50a925b237255b4853fdf4029c20a0b9bdbe839e9a41686465770c19e228d2c *linux-eos-voter-0.6.7-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-arm64.deb
25de79b05c683a6daa0f0f96d63f6974034ce0ccdd169f05c617a96516dc4f5ead2101408bcb60f9133e8e6ca11f467121abc51849e5fccc71a15b1254acbce0 *linux-eos-voter-0.6.7-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.7-armv7l.deb
cea54cd8be68cf8069924765a33d23182d74097f0eb3a4ef2fc0519fa06a2f5f33524bc7eb7ae71332a3cb3d98ed4e42b8c3f3c99cd14eec9de38a19db70ba73 *linux-eos-voter-0.6.7-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.7-x86_64.AppImage
646a208065bead3a44147dc04049e0ca0ea635fdaf8f97de12eda48d24b8371ce17fdf4365c1dce44ba5c18c144a4113321233754049b88fdedc05d12870170d *linux-eos-voter-0.6.7-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.7.dmg
755b651de8f0c7b160ac54c64178a8de2ea1dfb09e23f5a4c03f431e71a7459719e8c9aa4ca46bbcda93148fc0a7a65101371e20fbbb682cf47608be054fc784 *mac-eos-voter-0.6.7.dmg
shasum -b -a 512 mac-eos-voter-0.6.7.zip
8cff2b208f3fa250823787a319f9b9799b38ee233c7f237891a7a569a7bdc382a8ebaa62af8ede2247e5af71a3d9858db459e88b916278b01553a58cb484939a *mac-eos-voter-0.6.7.zip
shasum -b -a 512 win-eos-voter-0.6.7.exe
f06eee1cc307372219239eda2dfebb6436b8edb1ef8d16db47a9519aa7bd4c2b297f5198825e5702d177674206c53ed032b521783a74210178db8f4357dcf98f *win-eos-voter-0.6.7.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcNnY4AAoJECyLxnO05hN9/ZcP/ivas+Kk4tg2oklVdvSu+jGa
wQUM5HNo+qJMKStImJs1aCGbcXPeTnqakSxUhkgAoinktTskWTl+Ti4thaA5h8Pe
cYg8nhP0G4vnwITjnjMyi5LMRpyXDRFc9q7DA2jxB//ZQkvm3fGb0uZSCSfihpY2
trGGApBjbHCG+Vou/LcVrt/s7KyINOOueiavVCbgA16y9U+1thh+YYddGR4HMTwi
o22FkOw1+y3kA8/1npjsyT92U8pG1ilzGCRAMTUBE5Kndbmv6bdH04IzJmQ8oXvf
5L1vmQpg4BbAMXQT0npgAsxRMMoVmoxcM9UnXrWoROzSC5+5BuKLmrkuh9Moy2I8
I/bsRgy2VyrJwRzMi4aDw4qJNwf4166KSl4jHdPk29CupLDsJrfAXVdogLRSJTKC
nt7qNGSqg2SVL8ramMCp+7z9ioT5nxNwbcdCoWr5KorofzzTJXQ9SGc6Cmt5Oln8
DX5U04+r35vCt8GBdBPDF5Sx2ZRE8td33m0wSabvAZB9va/CXG0O5uFXnn6GklJb
/8rAUb9kfuQPykViy7oky6mwn8WO8bHd6bkaKinoVHCxVfw7ZPCghw8Fz59jkOdl
3TGJnerCfCuEEyzrD+ikBeAs/4toBaK+M8YiabM/5lI+SFwca+aZvUtGngZkjUQg
X+fPa5nLn+vheSCBrMFq
=Ybzo
-----END PGP SIGNATURE-----
```
