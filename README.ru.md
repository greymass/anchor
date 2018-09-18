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

Текущая версия 0.5.2:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.2/win-eos-voter-0.5.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.2/mac-eos-voter-0.5.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.2/linux-eos-voter-0.5.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.2/linux-eos-voter-0.5.2-amd64.snap)

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
yarn install
```

Затем либо:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- Все: `yarn package-all`

Созданные файлы будут расположены в папке `releases` в корневой папке проекта.

### Запуск режима разработки

```
git clone https://github.com/greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Кредиты

Разработка этого приложения ведется членами команды [Greymass] (https://greymass.com), с тем чтобы заинтересованные стороны могли участвовать в управлении EOS.

### Подписи Выпусков

Чтобы проверить целостность выпусков, загружаемых с GitHub, ниже приведены результаты shasum для каждого из двоичных файлов:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.2-amd64.deb
fbeb348c4af96d117e1e0a9234a6b436a5c5dcdf48b2024645cdea0501bbbd3ebb671dfb95c73f63e8f0ddea9e605032afc89d23df8e8d446c68c4122e158998 *linux-eos-voter-0.5.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-amd64.snap
e5e1e84045510a4e610fd3e6c434795ad658dd7d530cf56f3da2d26d5639b5beeed5a1a3f6ae153958e0be0fb7226ce8948bb34106795ca798142f42b96eb193 *linux-eos-voter-0.5.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.2-arm64.deb
c2d1f283327e0edaf0c538518598d913d506f9d6ebe9775e8cc74939c01f90e808173ce10529bb68c77a479899dba482b8a23b68d80b581ce0bf309fe27a4555 *linux-eos-voter-0.5.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.2-armv7l.deb
85dbe1c5e6ef70c22ac43237751c1c2a1282260b93fbfb194316e9a7c3d2aed99b01bd760f35b7b9168c73b0879c373c2a6eeab77670df03c935bd8c0f406414 *linux-eos-voter-0.5.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.2-i386.deb
8c7ddb6969fbc53125ebc2869350f6455613906c66282fbb8bd7823a5d47bc7316f9607255ad7e814da6404c943d9467f426f9b2c5221cee98c836155a9775b7 *linux-eos-voter-0.5.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.2-x86_64.AppImage
0e41926e7a131a37d8381a5dfbae6473969c9894d1b958ce7b7f0168a5cfb83637916d9ae1e684075bbb8564d6f22c283dcac7ea45adf6fe84bca497b5475a16 *linux-eos-voter-0.5.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.2.dmg
71b88ff2e75b651767143323cec7057a766fd35fd9a8e8a0ecf98251d35fd5794099c293e1dbee5a90e7141a6fa063d5d08d65e1f4c40a4f3916bf71388f4585 *mac-eos-voter-0.5.2.dmg
shasum -b -a 512 mac-eos-voter-0.5.2.zip
33073469eeb7234d9262fdfe40e7d3f0199265e831cbc20d88986d02918ba6a295bc7533fd7d878ad18c03ae4d6d28b34d98976fe11f20f09dab94eb03de147e *mac-eos-voter-0.5.2.zip
shasum -b -a 512 win-eos-voter-0.5.2.exe
48461512a74cd1d0f9b6f7ed8009b7625900e4c1f26d57dcd8b369cf15ce8a806a0bd305f17a814a09a91ee0abc0872e451673319475b9828f2ab4d9da92f9ad *win-eos-voter-0.5.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJboYkHAAoJECyLxnO05hN9Xn8P/iy/dSbQ3yrSKbhQnXdb/seH
7V7q/9ndvulZHZUuMPTb3vSbKjdff49THKuWXrEw+owyhAywDkv+nUB+F7slNnFp
pJ4V/V4r0l2QNb34feo0k15WlcmV8LzAxvH4fPf2VllMiLHNJvmA6afFt5WpMPjl
W7iJI6upise1ceAfzwhPKYC3vdAgvcEmR2rmdaMPATnid7u61vnJnfmTt5DBOsj2
Qt7cSOQy9zURMywMcQ08uPojSIIGQgSyjiWn9MNWJ5n3yyXnQ5adbV8/po25HS3s
ihlt29kjwR9luf70SfkjWZT6kJGBa3gN5MFt8zJxnTkwjdCJhd8ugH2Brq3nTOD5
z3f+D8lWjFVSB+n78YWjIEc4SN29CSkJnXVZGxKEsOhYE3+/JDLm9lE53LsHNFBp
R1/YAS6t7LkiDeY0VnnOUAJ1jZPzq+hgoNmOFS93GWlSQT9wjgj8bu0akzKij4+x
y/o6TnHbp8DVFxzZvszARLMLBEpcSaM+dUwnha0O+1JlZhhE/lEuUk8VIjqbl7AT
yincUP9FIJLeC35vYcyFObht4VGKuq5OWm7coK/TXFB9SFc4+7cDRTKTnDHByLHc
wNyzad8kkwcGZ+O/kZdGtyHyy5FR84mI1NE1t6BVHQrJY5IKuunsKTg8RG6P7iEe
GuYChabPGlWXyG9Z23Iz
=T+K4
-----END PGP SIGNATURE-----
```
