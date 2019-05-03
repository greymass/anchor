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

Текущая версия 0.7.8:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
c4580cf4fea96e0ec6e043c0f44834f968da732502809248f2d6e237048fdd4b547872bc3a34e816a054156c8b8a06125ec298f1d7f5f253649f510ccd12b6ad *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
f9d22567d27dbb788a9e74cab809ce75d18c4c0fe8f2b27decc885978a3e53a17d3ea6b7b097781581a6897e691a3d1606c8e659f1130d0ac822f527c30f74f8 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
f99b22932337dddf68687058479ee3ae7c26acf57b39f33673e9bc97679d90c82460023a8a472032950c384486cb317a9da1a956fd3eb621863b1ae83a577704 *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
cccb80c21cfa9cb134e1708ce1797d094f9c56ed47081b75e15b624e5af96ac7f14883da04c26cf817c2bd7d28a41d4e6c306fdb07abd0ca8dd1d072bc44c815 *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
9f8c2d69075f118627272f8e0df89db0fcaafb59f6bc61441575effa4f2cada48e0e595b6e8d22a3ba1e2c55a7a6985462517b2eee8c4e242207936e1413a02f *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
c4a13a6e9382991aa99a311a888e7c5c86f360694ceb2aee1c0b99c1c8a3dbed2b3a5602ce4ef8a1b8b540129fa9b52c5b7b331ad33525eb7d66678491c8baf6 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
a706ced71a10d6e201d28bec8961743ad6045e466c4bac5bf8fa5fd958c494eb132055c6205154f44df157696a80e13dd628e2c40df6356cce064c17eac9b0b9 *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcyjRIAAoJECyLxnO05hN9EWAQAJyYjJjkcwgjQUxpdrlpiLyt
1cSkq26FYuQGsP2AB2hmOLerHI2wdVqziJ8CYOmFYLzXZa71R1xZcDUaUrNILN+J
7Y9nJ/Gwscdes0llVVlewYH+ZBRTd3GbWymIaS7UiL4NlAl0fuEnXm5qvb+HBY4X
zYTsQDYgYkmzH32VRf9c7O+F3oPnKVi+sy7mp22b1bEoa+6TjodmsKYmFXrC4gn2
8NESCP6sPemUZTkhqahcvegUAIdDMVhVy/eBw+grJyZYADAY0CfqGUvHARgT9IuF
r44frw237Rdv0n7GPFHTcBAy6wDi8G1GbjO2cvyQzgc4p8IZaKs865Z/kzK4Sff/
4j9IZfVbxQPNJ0jEaPDGKDvfKIym92ydY/LYsr4Sj09dP/0K4ifINsd9bs9Tm1or
jTkp5AYNd+ghWJ95RMMavBUIOyL4DiIIERf7VwcmZ7T+lPFByLxqA+5mAyp43DR1
ydbK5J3ZyBGYX0MrnznDVjsF+JVv/+LHZXtiRnMROxAXXchEVWBNWWQaEQaVHGpO
48g30SjMYgLt6aRwpHIkzYxzf/cJrxMriFdov4O6CSYYtNHmDtmvYB/Upx/hlvSU
hbHDKTG8OSxU8jlFVcFUBuF0wD7IDWr9uG9JnvDYiVxCX42QUVb66YbSg85JoWo1
C71trwt/RMUTiaAHBnun
=UNws
-----END PGP SIGNATURE-----
```
