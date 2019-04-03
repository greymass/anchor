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

Текущая версия 0.7.5:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.5/win-eos-voter-0.7.5.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.5/mac-eos-voter-0.7.5.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.5/linux-eos-voter-0.7.5-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.5-amd64.deb
aa135d96052585d818f7c47ef01599aa6d64344292228fe8e027973a2d870e5cc5bba6ec0fb8073ed87d5169e30f893c4a6746c7514458ba3b8832257ca0ba04 *linux-eos-voter-0.7.5-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-arm64.deb
dcab7bf7c943e848622f9a0ee5f4ee52927b6f055a153b05e203463394ad488a11d9bf29533e6b23b7bfdd0eea61f27ff25a1fc8db50bfe36aa8fea97405cc47 *linux-eos-voter-0.7.5-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.5-armv7l.deb
865ef4599f119e25c47ab490f7d2700979cb1397079eef1a52ec59451e1c7a98f3930d45626c533dd624ddffbb57b474a211f2f45563317d5d6fddff7147f534 *linux-eos-voter-0.7.5-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.5-x86_64.AppImage
405c1e7dbe98bf7e442a51143c3be5cbc0028d179f3417809e7f6bfd178cf6e0a509461264ec469335f46605518fdce59d3f26ab02f4d9c0e80e49abe7b2a743 *linux-eos-voter-0.7.5-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.5.dmg
5f3d0825530a98285fa0191c2c7a956f7d7ba741d5a3992900be95f9eee5cb4c81aa368567c2ebd4fa1d16e40a9f21a641dfa1ea6388cc569ca8763d9e1f84c0 *mac-eos-voter-0.7.5.dmg
shasum -b -a 512 mac-eos-voter-0.7.5.zip
de65d261a754791da6ec7d0a850e552e3d5a8d828cf837c9fa84a0aa0d05ddde61c59179d4a027122b66783db6351ae427917640f85266287d80e7a5003918ae *mac-eos-voter-0.7.5.zip
shasum -b -a 512 win-eos-voter-0.7.5.exe
bf6e1010371a8d5aed757dd0efb3e1b89d5c0a5a1604c7beb3074de367d1a350e1f2a4cf60ecfb9fade3960174557b062aabb88a498f68034cbeb5a046269d50 *win-eos-voter-0.7.5.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcpNwAAAoJECyLxnO05hN9awsP/ioJ5zINASlEZj7COiYrMDu+
yGDJUJdMZemcCQpHyvBFcV/SGgbZdVd9MM0yc28k7IESHi6kV3BhspexB0tU7Lsf
+KMLGOd2zlS0On9MnQdnrjJdSfxPvk+sguj9A5/y0nyzF+TgTHFXiz6nSPQJ8RVQ
Y0jXD8sy5ntp7/NJYJD+h4PKkb6CguAyJQ+rcd+dvO0cT0k6WP8pBGlIgRdB+Cm5
4OPss4rImS22OvmEVqgbaSsBS+yqqJ+fI7841J5M6iio5dRK14ynuVHpBj//t24E
wMcwKcfcn9bL3/KghJ0QAEDY0aUM5U0lwnuwutVMfNRWRmFnHV4Uglw1yectP7xN
cDFvBr3aUJg5DwxhnLo0vBua8Lq21QamUc584f94u8QC6YW9kQlMbmLsNAUh4XpU
jS2JELTqn026SsIni6QNlbsB7QrUpcW/k9rpu3mAmk9Hbc/GkkdwuYgTLQlnPuTJ
FvsfJ/yn/dkQw/ZM6QcFGtIBD08XyYiBOfcrY6B4cTC4cVxuK7oep1dmsMUKTO9u
KAocVUwV2XG8IONyNl0uBG3Z/UWcjVTl9BnJkl0zBQVOOJE2Ur7brmnIAs6Bg359
7TCWLtUwfIgMToZz3I0rFiYsuqufPieDbICayLlYdysRB8Ol5xTqt2sH2BDUGpLR
tO63ZSfugUz4R5y4YS4J
=gVCf
-----END PGP SIGNATURE-----
```
