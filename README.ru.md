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

Текущая версия 0.5.3:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.3/win-eos-voter-0.5.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.3/mac-eos-voter-0.5.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.3/linux-eos-voter-0.5.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
3acbaba16be8f9f3159933aea50e5ffe39e4c9daa8a2ce820b3424f5e630093ea80b74ba78b8f50d6e1a96cb650fc2c619b24e7d4f3eb3685353d9d2b1507dbe *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
166697e3cbb2a7d1a2d0b04a90876d4cf22d0f08596dda4f0998dff8f6f9f965084d72ef247f776936fc0d483e49845f38596eb0ba3b899c19ef499985bb48d1 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
3d63b30b288f8e4fc65455dab6c3d9c64d2806eeae25b023f50d8e0704eb3d9f40668a53972569b22dc24e63d7f78ab01128e7dff5c04a290d2088a749866c9c *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
768c5e525efa87d02f541156ae50adfdb1d26c4b6a50fb5e1a70e29d5fdba71abe4eb550feb5f83dee4ba6c29e50ef47b235359a1db49871dbaa0c1e9f426369 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
78ccc6118607a8c548ece91316111a40cb1493268cb806dc4c82298002156461d4dfd5f48e540e1270d3c1efe8a4acd0cd0b7853c961465d76bdc3f264b4c96d *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
56fb53f17a6e1d2582a26b4ec9567a31ff886f76d64468a575de118c54c63cd72e38797a6d62212a3bc006d06f317fd8fa8e3bab55946737949ae7a963deb757 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
e375ba191a7aec80b850d44d4127efe4ec3921b39770f7345867e2328cc0e637078499c374386a3909ea2d47f00c2ce7e6c3f557da9641e7af9752cf615de761 *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
69c47c2641ceaa1530108637692cd714efffbbbe15b2835bd07611a94808e7f4c036d142cb02699839be285980e3db5402e49585167924d2ef5d3c0ad8ed2c54 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
445c20134561e8191dba778b71a4688c7c1fdc0b39148c839d68aa1ccb6b0b1f82226365590ae50378fcb416019de3d69677253a5404db55d3aef465d7ee7e11 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovcmAAoJECyLxnO05hN95C4P/3PYiF/AY4BnVUmGVNw6ADQu
W6bOFaNGBtKm7a1mhiBraNrfWmYtVbpW356iqZU6ERFQ7pFMu3v8ri7NDNUJFG1r
cZMgxnDyPccRa4bl000ayCfOpbLh3hnV9nKMFCCDLw3vdr9pQlHUkasWNoZym870
uXBQQqlb3yegwk/0eNhu1e5veLlrXe/6Q+NmEQ0XoS17dUYYwUKWTgHvnj3A/n/O
HjX3MBsGEvxxkGzgWJwgWze/u32HuGbL+0wiKfVmpZ2QvHnJbybuH0c3vmqi9eCU
HkraI5HxfJb/Wl0wJCUVwZZ7LfsL1AmlIv3Y5bC/J7l97Xwtz54enV6sdUFBo2vJ
n59/j0rI391mKgbXX+NyL1wL0oaZgogv+3BmmxF3g1M/1uTNVUyElKAHiOfOkAss
IxXdW/FANfEj6CiO7lLrs5W/GlubQM3QqhUX2NOZg2zFPIHZ6DcpWrbICEJgCApF
U3Bfy1hlQdWZ7cxmsFvTUU1fs0ldkR+F/ceV/bxLGoHOi1iUJi9ybhzyKezvV6uV
fxLu9nLk0gZsgKFoTQrwjwe355BqKjDlvukCm0ivVc1mZ7c8nyX6mQwkCQputE2b
wXo9PtXFvQCFjDw3Setd1InIDPlocwqJtp5+CfEgpAXdO2+Q5Ss3dNr4YX71tXIe
c7BMQi4jsvkWBkruLqzj
=rC29
-----END PGP SIGNATURE-----
```
