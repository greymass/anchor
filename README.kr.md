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

현재 0.6.1 버전 다운로드 :

- [Windows 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.1/win-eos-voter-0.6.1.exe)
- [macOS 사용자](https://github.com/greymass/eos-voter/releases/download/v0.6.1/mac-eos-voter-0.6.1.dmg)
- [Linux 사용자 (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)
- [Linux 사용자 (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
834f1409690c338191f9c8a6a2bcee8291d81977897e7e62e9614deaf5642cf44b640ded97b811f61c18e535563e1e5acb69e4de2fe8fe6bbc855467e5f0fd2b *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
c7c6ebcedbda30de98f19ad3cfe5f956a58cefc091a1d9c2d0d5109f913f75f33707a62803e33f9a7630dca2c6b01e1910318a04ad052ea8a55b7dd95277fdad *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
5f7b9fe7bc918f6d244e80610a87d20e40784578c0d5fb82ef782181b5c50d48eb027551874948047362cae89ed8fb6107139f4b9434ec3f7fe39103fe0484c8 *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7ef5a3c6eefbbc0700dfce13f3914010c517d9f6891e94532a97088dc4edfe34ed995339c65d9dfed97299639fef0eefde27e924d9a43832d32a6745f289d042 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
7f587daef9e984ff8f03e3c9d50e570c6d40dfd239d5e3be817607b0658a72cbb219fca07afad8a103b885ccd7259124aada5e0de1ccfacb03e704a0aeb4227d *linux-eos-voter-0.6.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
b08d32b1663f1a2caace8346bcaaf36e51e22fa5c3d181788e899685c815491681bc82cf7173308729a9f24e2ad154ef250d51b2caa629a0405a58c6a4a8daf6 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
cccad2fd292cfe75df904b7fab34d34583686c41de5f2b362d6895547903138bc94c9016fc1c95781eecd0f93217562c282f0e054838c9807367249f6032c79a *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
9fdc0fdbb27273b6248825ae1afd03869f2960ea4287c2619aec9504f8da1faeebd8cabc6a0117697b3a13492f9e08ce2f224be23c3580800d3b12b26adb992e *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
39b19425059abdf24446d5e6c22b7b095d2fddad2c121c028190a71a283ff741d1c1d4f802c9397466fdbdaab4a6a726694af1e8b6b8c3ce401dd7f6134152fc *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb24KnAAoJECyLxnO05hN9zGIP/RTQX8liCmMpV7roUVkJREVL
Ghw19r9CwPuhq1T0MXK/l+GjstM3nxSJKh1CPOty6Rc+LBt/HEEDhYsXVCQQCOZv
6Crnh0xHcJoaz6e2QQ5U4yex2gA2hTb0Hi0pxC190UtXfFWBA/oa2TqSx1q4MGaF
8KYF7mLxnAa3oQJn9NRzbWoVR1xbz9kEByg0GeUoOAoXZ9ALoB7ifH6+oVimfGzR
yVhbl3AhZB/4UcatJQJ/vXrstO4WoHWH30JeAcmyzejCvHMCP82/vNjNSP6/Bo7W
BbvDsl6yo+Drd7XIXlrk/nmzn1tm8c/ycPLXZpHPdK7KLoyUDa0NZVK8E/xKD+Mg
reeghorqaRwXz50ViU4Mv4HPuHAWYCvG91iVEjdBoqsMVLnrNsWPGj7JOsR6Ezv9
zuLADBh7p2FVePhYX7ILS9gJh97XJCVSAbdx5J9TxzftUS01YkSFm12Mf8cosgtt
sV6LQDXBjtnqBdY07Kl9Dt5uPzLyxKbukV0tQeJgE+a8EYUoqwVbmQcTjPm+HLnt
gdnbQ7iOX230C5/th0lRMS9nOyb7/7rtwCQsxlRLrZyxo5jCtZqwAUGTZQxkFwcV
0Gzx7DFMvqpaXvin4mRv7rJbSVlNkX/Kuw7tnxNXzSfjdFOfw0QxLttRKwrsR51i
19c5zb8CG+OEXb0MiEks
=poWJ
-----END PGP SIGNATURE-----
```
