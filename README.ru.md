[![Версия](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![Проблемы](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
[![Загрузки](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

# eos-voter - Голосование за Производителей Блоков и кошелёк

`eos-voter` - это ограниченный функциональный выпуск лёгкого кошелька, предназначенного для блокцепи EOS. Это приложение может использоваться для подключения к удалённой конечной точке API EOS для голосования за производителей блоков и выполнения основных команд кошелька.


[![eos-voter screenshot](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)](https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)

### Особенности

- ** Голосование за Производителей Блоков **: выбрать и проголосовать за производителей блоков. Обратите внимание, что пользовательский интерфейс для голосования за производителей блоков не является инструментом исследования; это простой интерфейс, обеспечивающий безопасный способ голосования.
- ** Передачи Токенов **: Передача EOS или любых другой токенов которые есть на вашем балансе.
- ** Резервация процессорных мощностей и пропускной способности сети **: Закрепление токенов EOS для резервации ресурсов сети. Закреплённые токены предоставляют права на использование ресурсов сети, и учитываются при голосовании за производителей блоков.
- ** Локальный кошелек **: установите пароль при импорте личного ключа, чтобы создать локальный кошелёк. Этот ключ будет зашифрован локально, используя этот пароль. Этот пароль потребуется каждый раз, когда вам нужно разблокировать кошелек.
- ** Временное использование **: если вы предпочитаете не хранить ваши ключи в приложении, просто выберите не устанавливать пароль. Когда приложение закроется, ваш ключ будет забыт.

## Получить eos-voter

### Релизы

Текущая версия 0.7.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.0/win-eos-voter-0.7.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.0/mac-eos-voter-0.7.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.snap)

Последняя версия всегда будет доступна на странице выпусков этого репозитория:

[https://github.com/greymass/eos-voter/releases](https://github.com/greymass/eos-voter/releases)

Чтобы определить, какой файл вам нужен, если вы ...

- ** Пользователь MacOS **: Загрузите файл DMG (`eos-voter - ***. Dmg`) или ZIP (` eos-voter - *** - mac.zip`).
- ** Пользователь Windows **: Загрузите файл EXE (eos-voter - ***. Exe).
- ** Пользователь Linux **: Загрузите файл SNAP (`eos-voter - *** -_ amd64.snap`) или DEB (` eos-voter - *** -_ amd64.deb`)

### Безопасность: закрытые ключи

При использовании `eos-voter` все транзакции подписываются внутри приложения, и ваш ключ никуда не передается. Если указан пароль локального кошелька, приложение также сохранит и зашифрует ваш ключ для дальнейшего использования, используя шифрование AES-256. Текущая схема шифрования пароля / ключа [в настоящее время находится здесь] (https://github.com/aaroncox/eos-voter/blob/master/app/shared/actions/wallet.js#L71-L86).

### Конечные точки

Мы предлагаем публичный список узлов в этом репозитории для использования с этим приложением:

[Https://github.com/greymass/eos-voter/blob/master/nodes.md](https://github.com/greymass/eos-voter/blob/master/nodes.md)

Этот список будет обновляться с течением времени и на него можно ссылаться из окна начального подключения в приложении.

### Самостоятельная сборка

Если вы хотите собрать приложение самостоятельно, убедитесь, что у вас есть nodejs / npm / yarn, уже установленные локально.

** Примечание **: Если вы собираете это приложение в среде разработки Windows, потребуются дополнительные действия.

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
cd app
npm install
cd ..
```

Затем либо:

- MacOS: `npm run package-mac`
- Linux: `npm run package-linux`
- Windows: `npm run package-win`

Созданные файлы будут расположены в папке `releases` в корневой папке проекта.

### Запуск режима разработки

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
npm install
npm run dev
```

### Кредиты

Разработка этого приложения ведется членами команды [Greymass] (https://greymass.com), с тем чтобы заинтересованные стороны могли участвовать в управлении EOS.

### Подписи Выпусков

Чтобы проверить целостность выпусков, загружаемых с GitHub, ниже приведены результаты shasum для каждого из двоичных файлов:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.7.0-amd64.deb
7cec380eadf243789c209c13c5abb75c6056118d6b2e566245a4e7e33dba1572feab6ee4255e0ae353c2b49b85b9dbcb7a95525d4524380bd707497c949c12b5 *linux-eos-voter-0.7.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-arm64.deb
8737c70289e9779e662f069505b2ac05c41df3bd0a5891b3859a530461a6eae016a3419498d60b3e1d56728535106f7c6a8d19283a1f572c5fc34a927857e040 *linux-eos-voter-0.7.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-armv7l.deb
9280b6b880c8b1133f0a7905d9ab9e38ff1a7db4f69bc143a88d17738d33f545568dda6f9b6d31d5beddd62ec248eb787e002050f568d246862311c785356e2b *linux-eos-voter-0.7.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.0-x86_64.AppImage
66666a5b9e9fe0970af50c866e7e065177b27e866a448bfefab73b27cece82a0081279c934bc2ab91b630091fdc7aededd39de7cbca8f578ef5c2332c55b6370 *linux-eos-voter-0.7.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.0.dmg
38469b173548ca7f33ca250812aae74127edc93e45f4411e2230a3967320b409356107ec79be39342505d34eef9eeff9caa30e60d3c9f578e4aa7d936a7ede37 *mac-eos-voter-0.7.0.dmg
shasum -b -a 512 mac-eos-voter-0.7.0.zip
904b4463667cb873f7b89fe2cb606c95a7f39e1a76e1ddede0320f9bba4165bfb1a647c6f2707d34bdf32783c2c61b84711d8240a055c4b97eb1302efb785330 *mac-eos-voter-0.7.0.zip
shasum -b -a 512 win-eos-voter-0.7.0.exe
36b5fe426bd450f7f0d1c57cbe86f80ee47508fd4db483e3abb728a6e51eb6e24652ee4f857845418dac2efde5dbb20892a2ec36507b2d77de7931dbd53ff30e *win-eos-voter-0.7.0.exe
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
