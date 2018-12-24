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

Текущая версия 0.6.6:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.6/win-eos-voter-0.6.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.6/mac-eos-voter-0.6.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.6-amd64.deb
81dac8eb51d9b75877ef8111eb1b1593e9ce3ec83f9d329425a0b06975bc55dcab8de82db37aa45a70d32372dd87e20c560a815783dd58a195c497be0aa0f089 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
d2db3977c1afde2856285527a71e3dcefb7faa84e04ccd583dd82b328fbc078e1fd3321b1f9c8ad18196c558bc46565193f3826b600491954b09e91d2c785421 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
2554d854da5aff4c60403e08b28f6624a5f275ac604641c557a4ae004f0c028f9e2a63ebf431dd04aecaec99588a83f2cab828b6017ea47a89bfa14febef4a08 *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
1983a8f9080f18e11872c57e1814ce158701ff9c425cedf04ef38582f067eb18000034c04d1a46a16cee11cba9eb5fa2704f996ea1bbe4ad1c47b4046fa8b76e *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
40f61b42c29cff4f391ea7ade53ef92aa8a9152f011ed69af6ca5a39947246b9d71a510df78ed1775f59e07b9b8f5afd4374d74017523eabe4d4041eb86d887f *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
32c1c3d3d978c891db588e7c9c04c3f3e30d06e7362c88dd90608373e1988142cfa28c6f361b2c27f0fb53a705ae2f8871d57a03da15da651895ec1c44da2a66 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
720f6e3493923032098656cd391bf7cbf0ac26e0f585d68707f02c1660a0b6576dbf02646f2fafa8b7173a81a9f3d6480bbfdcde3e14184aab22b791aeab079e *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcHZfBAAoJECyLxnO05hN9TqUP/RiFhoduhUNspmBMaygUHB44
YIw1x92wn91TaN3PUnKmQe957edtLfkwY704BLcj3t9hbrtqJV+2yqpntolw7hOU
Wpo+loSdcgJlUh3fFNiQH+SNniXvIvGOCpzd4IBNPhPjMQQ2bgQC4YOdBZindodi
uPoPQMNsmg2/B/ZagiZzxg48u2Z2gw/S7P7MskAAZqR0nFDu/W6/Vk1XY8fXOtgc
4V3oa4vSyl7680z2K+mcPtPGb+k2RmIl+6vOfWnZtGStBBsMOFHf/wwcLRYO74S4
Y3clIVGadNeJ1+IUZXuvjobBMVMyylmNff50NUE/mBaf64DMxhTFi9ahnuWDNXzR
7pSp9aK8fgKeC3BQXb7ak7zpORB5DhC1ZwGvZmdyEWexiicLKVWwW8CcxI0yh61/
39RYSip3DtI10lVWX3LeopTTVwRgLxXPlPbUYd/dSdhSkOjSkvmamXn6/wjmipHt
DI3X1zKT6CHk8HKNp8Soab4GEJGk/BkK7lh7d5pHzRrmg8hgbLCDLpUCPP0WrK2b
glRk6DCMcNoP6TAXNMQWwve5RKNlJgRiW+5gGMi+AJbUht0LUFtF7+sXO7zF1HYd
zbyvruxLgrONe4xAjCfK9CDW/Zyu4XjXRalIIKiA2KlSX5XNUXojylkub2jwroAE
M8iF6RPLTWb4hFKtc2vu
=M6IG
-----END PGP SIGNATURE-----
```
