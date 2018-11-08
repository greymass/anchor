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

현재 0.6.2 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
16a74ba15c579eb7861e95f8cc7bc62156ffb767f078a25a0b1b81482e99123948d38ced23060166800696365df96ebb53fbdb8ff56d6680f49089a9ae2ac019 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
4aa5af457d9a51b110b623c1ba1cc8338048f734c8122793973f342c0ef90a9172415eb81ff4aa7aee63459f77387007ba0d546e8700d62457dcad57c77ee85e *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
4304df7cb0282158dab2a364a6b6b944d45259d926238e812f1fb5de605f818304d4c98619973fb0e7c61c9e903dcf07a2bc071e5f7780f2ee40ba7123f7b874 *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
242ca936dc0da02a3f21f1b9f7febe3a86c2b6c4920ee93f0efae618bd55ea6c3d96de07339d0fa3ac2bcb6e9ce28475fe50667cdb16187f77691bad7c198302 *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
3dd5110f1348c18767fab178de5cf72649ceaed2d08657fc0905d85578d754e57f413f6a9dd608a05fb402c9e8ac02e9e5b9d3ccb41b0ab37bbcb791d8e5040e *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
a65e5526ae31eac5dda47d3aae1881fcc6686c79a2b76690de1e8561731252f249f6de1020fcaef46a307e1984cc2634e7aeadcb21cc65954b2f8ab0103e84dc *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
29e20ac9ced730f3cac14e2235a7fd86a43c8d311d601e1a3b50692c8d6dc3e4ef74471c4e43b56146a79caa0743df110cd2bdf8bc20a0cc17b22d84e9c457ad *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb42bwAAoJECyLxnO05hN91VkP/RKYjXbWebd2dPpBibtyHmUo
hS67shdhW8F8r5bxM0CFABLECBFK0K9ybMNCoZyn+BTMSFVtD89LE+ESNriGJ7/m
Zuldc+BF0c4kt0ZaTKOXASwM7wZQDxFaYL2zYrOgvYf03zf3HuvhTJ2/E0hx7t/q
2Iw/mdtkCKsBq3HJg4lAWBlUCaRGW5ssThls/GS0t5hCGzKsHIrEnEJupVQfZfuw
XdC/skQgLriBJaxNSh+XAfJtlHZ6es2r0q7odcwwGJKN+tWIx4JOLb+j5dsEGeH0
YqcKAOENHBxUSCOPSDbKZyKJiHhm2ZdenszFcN9mSGpOLI7TVAcXAIf9JnZl0XUU
vWRH+Wv1LL1zbb87kTtLYxu6ZebVud1p4NKLsX69zoUiRhhIW+cRtNTgd1wCeUnk
brXqB69yJ4VudpDtQp4/94/1XJdKRLSMOKlMsJDUSTg5r/yP9jKIaiY5JTCUlOF3
BII3UlXlpo+74j44lIGojYXqq48aSonL0lhjL2/vQlt5LZFSG4VLifGX6FFXks5J
+/EjgQI954Kxp/ylt9ThpwMFh0lcSJp99UAU52HEclEnKrVrCOWwLQP/syz59Qp9
ISY8yY6VMnaKMZU6wmev8SX1+SlXypSnbpYVMMZczAkqeeOcBaLQ30jx1NGhGDCk
uPz9iMMmX+MCoRNL0HI3
=Rw8R
-----END PGP SIGNATURE-----
```
