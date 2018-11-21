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

Текущая версия 0.6.3:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.3/win-eos-voter-0.6.3.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.3/mac-eos-voter-0.6.3.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.3/linux-eos-voter-0.6.3-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.3-amd64.deb
9646adb0c7a1532e9338412901d03c6d0e8fc632718bc86c9d96df508442b73dd919b768b64ff4c8aeda8ee1c8971d3e2b71670829e96f6311d85221970df1a1 *linux-eos-voter-0.6.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-arm64.deb
8b8cfa20e0434db698e03c2669749ef1cb7748aa7ab7e150825a86c333e9c117cb752100e27d701ac14f07747b431a77ab8e7c071579e2259dcf250c5ed79baf *linux-eos-voter-0.6.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.3-armv7l.deb
17b4fc9961ba15fb31a095ce54edf20794e560d04e9d7f49c4bbbcc37748312848abc0ba432bd89ca8259330632ad252cdda041ea4e848e9ece8f03affcbf8b8 *linux-eos-voter-0.6.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.3-x86_64.AppImage
e1a81736b3fd7bce442918430235ef7e3109ae0b7d95682aa41c26d961b5eaa0e89a0e126a6a673b1e9d0bc9970bfb28d5a161496e97db92402e59c341032847 *linux-eos-voter-0.6.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.3.dmg
1e9f8815266bd0287ecf531b64bbf702ca334a6b1e14564708eca800e33ea7080d04010e22989ed85b7a7cacac9713a4a03dab8821a6ae27507fe6f7248a161f *mac-eos-voter-0.6.3.dmg
shasum -b -a 512 mac-eos-voter-0.6.3.zip
652b8d7a6a3aeb55c277a4af1158e8fda03d2bc9dd626c19931a0b62bf9435e736c407b57d2835f4483c2088493bb7235844256597a60cc2e5cabbb7747206f3 *mac-eos-voter-0.6.3.zip
shasum -b -a 512 win-eos-voter-0.6.3.exe
97d85c252f6777c5eee56c701fbf61bc109b098c96c728f46f9dbcf715c592ccf6d9b199023d4288900a57ae04e86be8a5dfcdad8cb58243100b4873ed3e620e *win-eos-voter-0.6.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb9b0TAAoJECyLxnO05hN9mfUP/27p4i1FwjepCG8ZB/1ISCGC
ekVfgqY7a2CDdK10B9c134Noft/DBTzB/zgHo+hZF5Wz7JilJWQmQeycNSi32xzz
0tuZdV0YtDIKUL744SVeOElTGcP1O0P7Wy4q1yFiRHsdCkGyObY5oUeewJkKDphs
w4WUvYmASAmouo/r641DY9R1g1YluDuUK+DU4Q7g+Nhh/dD0H5QhSf776eFTwJz5
BV7WeJBGQhuVXWGj0s7phPxBSoLfYDNdyU5vGP5Kxhof/c24D0Msbdg6TLk93/OU
2VcYCJLmXpKjI5l7X01dI5+1xAK9JUvwTFQBJcTKA0N87FJa1dVNc5wcjUSOLZSC
Jr55LFBlvii9wA/kZUE4Y7vFCfRcWCyFqY8PftuFrfNmm+HqkAzaM14ML4cHQRk4
d1rIBmdLNK8TvBNJFMGsiCCmEBLcYc6KLjS2VCa5TA1la+nDhiShtxiRgNp37esj
yGeF10DPPcRbefOKJk3LYYvcrqwTWhbZArlMzqxpUGCNX83hWoFZOXkLu96+hXrK
5xfP+aJmGaAJoo/LCQobFn7UspR5TfpSCkGqL1/vPi//rKw+tb9uSz+ouAZ4sW3u
SaTsCXd2v9wyCO6KAg9neS+yhQ69azdtRLHjjwJEVnMFu91IdiqVBGA2J4F5StgY
cBD+wxvdxSKIxguWxsQH
=h4Qu
-----END PGP SIGNATURE-----
```
