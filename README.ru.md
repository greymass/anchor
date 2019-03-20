[![Версия](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![Проблемы](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
[![Загрузки](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymatss/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

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

Текущая версия 0.7.6:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.6/win-eos-voter-0.7.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.6/mac-eos-voter-0.7.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.6/linux-eos-voter-0.7.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.6-amd64.deb
426381e0251a0218d3f07fbaedf6204cd2724e739a2350b811da9e20a75fe8786f65fbb51c0596100faebe1d102d0645316484c4ab18e64b81cf3128c26e9297 *linux-eos-voter-0.7.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-arm64.deb
2bf5a90300ebbdc9335282296af90e39e827a8e59d8d509a25272ec5f02e4bfeb151bc76c575ba2a5ddd176ec1c47d8c23211711e335ee9c445758f49669ef39 *linux-eos-voter-0.7.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.6-armv7l.deb
825b71330c2f49da0b1e20be3e62182decab805cb7c48455a16c4ae16b6e075b787cc22a2b2bea43b0a74d2eea0c42c0b95352bcab07ebde65c84a012fc1c643 *linux-eos-voter-0.7.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.6-x86_64.AppImage
e3c0a549204b988e16443c9b04c7e86029c7640091e8c1e9c6e70f6780ce6fb3d436731bcee505831231bd691462de7dfc10d4098e94cd9d3b3dc2b572ac0ad6 *linux-eos-voter-0.7.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.6.dmg
ffbd403ed41efbdd4d9c76d40d620594522c69723e0731bce14a1facdd13742c708bd3524ee7c121961dcf37ff28ea45372283b4a9ac7a910466ac9af8597570 *mac-eos-voter-0.7.6.dmg
shasum -b -a 512 mac-eos-voter-0.7.6.zip
560924b5097411b81742f4b840a5f6f0873ec55bdab820695e4afec6d7dfc4a1fe84d08c1664edc43e47302f6a082f608079978618c65ba334936ed5130f86ba *mac-eos-voter-0.7.6.zip
shasum -b -a 512 win-eos-voter-0.7.6.exe
59c1d612b5a8518659c28fd155ee1e8b7420929c0fc55d64f7e2eec4d9cf17d30af0d0560cb788c6853f48ea88333626286e0a08e11cc5b4383dc4f61b52f83a *win-eos-voter-0.7.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcp9AgAAoJECyLxnO05hN9HsgP/2Ct8rrz21xoBLSSZzisLmUS
SFsuzQGSXMi53izfUWCL/6Ruj/U2Ptm6ShNz49eyxej+UQGlOEZIcomhAocGvH8q
f59xkuFnHWJU1BVBLYUDWF9BQG/wt58VAqC75UnYsm6GI/ksthVJ+2b7PyWTdVyP
3mcwouy5JlEuKVuBN4S/doDoT58vSQAY27fx0E1O7VdVFeZp0VV4Wg8IgBrD4bbx
5Xvt6j4d72IpJRp5p3Jj+EVLvGz3rzAjJWv7aAzCnSHrLaCeR3Chq1/sgkrNQYw7
GSfG8IbitqxM8I7mGO9xkLCPn7/EdoQHXsbHJj+PEtKTlKMHfyKpyFPxlygz+JU0
6Ikqxr7VfpbSh/pBJXxizfnHAHNxEiBB1Nytl17gbjZfjCTfPIvDgAFiDJTvEbqm
uZL/YBAn8rUfOCD72MdDK9aYODR2elS+J8iDl238v/1b7FIxd/bwarWCB0bCdUfT
Nq86nhjo2ROaATdnr4TZZaFeF2KnJ9J9hSbThv0XKZqFBP4rjracSvj5aiL/3AwP
9JwUNfJKvF3ardAP+q1k9fJUhbh4DjpXqUf60Q8k++XzSxxYkpI+gUyhkKWGPQsp
aPjB1n+34N3KVbnA/a5JuQgGftxuQJ27leAHLaPxLaReIUNn6jHmn9wTTWkINWRq
zWN8uuctBk5y6egCWkwQ
=pFla
-----END PGP SIGNATURE-----
```
