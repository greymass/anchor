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

Текущая версия 0.7.3:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.3/win-eos-voter-0.7.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.3/mac-eos-voter-0.7.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.3/linux-eos-voter-0.7.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.3-amd64.deb
3d0358e1fe63e5739218f748f2436b8f8754e9442dff8e3a7a0081a8ecabd41ab276bdf6cf0246344fc7f635cdc72cf0f2a583c2c392afb8a6eb14d4f087bde4 *linux-eos-voter-0.7.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-arm64.deb
8968ba9f9c5ad2d61da1bf6bc4624317a9accf93d9988143f1871259a1f25bb11115a457334da894393d8d859505f54359518fd7a2b9ab985105d63ec589af64 *linux-eos-voter-0.7.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.3-armv7l.deb
b8eb83776671b0b5df6bdb2aed74ee12e5922d00c6012fbcc7d0eb9da32ff9eddc672eaecfc6a5dd7074d190e18d94b6cf0db324a5e1fb8c974fdd12e036132f *linux-eos-voter-0.7.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.3-x86_64.AppImage
b9242ba351b839994b3d0aeeb5c937cf2ef624c859c24aea07ae3c8d5a42530dc984c7c50f71963bc8227be101a278c83f070b5044af9d9a2bc9e456e0c92ff7 *linux-eos-voter-0.7.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.3.dmg
91005c6409de1468a948f63638caa21b6323342debf1a71262d56d6efa7a7bf1ad9bb920c680649a304c9a9d57e87f6376f82b0574e51c51f44393fdd440b95b *mac-eos-voter-0.7.3.dmg
shasum -b -a 512 mac-eos-voter-0.7.3.zip
cca60b96d8fc41eddd22d421f353bc9929499245fe62fb42de4f8baf21e9445635ddeebf305908f82876b6de04aa7d8cc818e0b654833fcfcd0e78c9c1273314 *mac-eos-voter-0.7.3.zip
shasum -b -a 512 win-eos-voter-0.7.3.exe
f7f9b00c82ae668979a4f4ad9bc8d76f59a0e5a102154cc170e4c0d6433ae3f6e21c996c112f57e95e90574195e3d879684f32280595486862dc794c215f8742 *win-eos-voter-0.7.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcUMZtAAoJECyLxnO05hN907MQAJ+tDGrVaSjHWSyRxP31hRLF
v3E/FIYV8IKMGgnMfayXe/9TKKCMZ/hDS6qglD4azOIWDGztcaI+pVpQ2DL7CL7I
QRKVxxUREvZh5GPUmWsHdFgnbWAL0fWXd8M6YGRRilcKnIAr0ylAV9/YJifr/DWi
8+/OnWCwuSlz1IIiq2XfkBn5uvDOa5HuK5X3IQYVfqVsYk5C6oYHsB00U79mjyoD
GUF69SSBNxY6BmmdvBekT1NDmzDflt2KxTrkxRLxvAFV5181X2iKkopSSg8WO6Sr
la4GqH0IyysiP+a/xwe5G7Q1zNVW5Gxy7UPPRMb/IenzjerNn5IapmcOrklhM2Oa
VDTAJxXkI+4wnvxdXGg/LkBI/bFNp2hJLJXNXALIumTHcFHXUQ6+p3HOR+bg3wQc
aPPvoBqy7GOgzcMw2EL+IN7cMzvhAkuJebXbo+CqmZKDqHTIg0qT4InpMl3AAbgt
Hlu1fuAKqplRm7z8c6To+GcObsbuasPMZPL2+qG8tBsYTx7JeDXilL4T6TLRwU2H
hXPg6JKMbiXr0kk4t+spNjaV5yFaWF3wtxLFnK58MZdwEn78JtEGyZPGYn43jv+X
hkdQzepf/9C2q2Hqmwme1CWhqSTb5Ymo6yIW/RxOklJpEc988Tp1QPfcUtx/HZmB
rvwtIqMk5qpvt4Weq0sq
=xnpA
-----END PGP SIGNATURE-----
```
