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

Текущая версия 0.2.2:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.2/win-eos-voter-0.2.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.2/mac-eos-voter-0.2.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.2/linux-eos-voter-0.2.2-amd64.snap)

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

```
shasum -b -a 512 linux-eos-voter-0.2.2-i386.deb
acc63feded2f88e9ff4f2752400bf1a482ca55b87b756aa7376ede3d28aaf72ae4c62da6528b6d2b0eab039195d627ddf80244dc6192d71c55c41cd8ab7de481 *linux-eos-voter-0.2.2-i386.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.deb
26704939f44f463881e2f6c3abcd9b1bb8d268db276fd233c5452468cacf574e1d88724f7e0d407bfea03deff1e6435f6891aa8ee0d045ff92b75f6cc98fe88b *linux-eos-voter-0.2.2-amd64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-arm64.deb
fc43236352d9f6bd661c93f154386b788b227df5ef1e81be7d0345c3a06ba0973561742191a92018091451127dd223bc22014d9a9ad7159b093aae0ea175ceda *linux-eos-voter-0.2.2-arm64.deb

shasum -b -a 512 linux-eos-voter-0.2.2-armv7l.deb
e83c04cef0fee0070f9f2f9e93ad38a357c8d7d3d9c49a0f9efd24c3ebe12ec85676365a6e24eb13a4d904e69c94f41cdda09abeecef6ccedd02c7553ae99acf *linux-eos-voter-0.2.2-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.2.2-amd64.snap
097942f10b2c4dca49356ff2e83d2c1bea01ef46a422bd1e2b26d64da8c643a78b72bbefb4a7a9aab8c5ef6ec869461d61c11e50cf1abfb01b6240da4d399bea *linux-eos-voter-0.2.2-amd64.snap

shasum -b -a 512 linux-eos-voter-0.2.2-x86_64.AppImage
9cc312436528a07d134dd58a9362c8638057354a83752b94f94104444c4d271fa1b38b689f5bc9b02ec43538721ff5f95cc23e6085ee5887d5be48cc58d155f1 *linux-eos-voter-0.2.2-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.2.2.zip
355e7d18f462d7586af58acdfa7aff4c363e78d78d76a3c2cec9e3525e1c75a79ad988122f9b12337bcc1dfa78dfddec1deb3973aeb7fa5472cb3c036a581e06 *mac-eos-voter-0.2.2.zip

shasum -b -a 512 win-eos-voter-0.2.2.exe
56afe1adfa4dfa1b753db6f87b71f6b929e72003b4db50504e97b67990da067c4157c99062297522c6af067af921106f73375d4974c8e565e44816feabebff78 *win-eos-voter-0.2.2.exe

shasum -b -a 512 mac-eos-voter-0.2.2.dmg
56d17e0561c9ce9d06f9d1d159f5a77889d4ebb08f20e675823d3529c97c82b8108159f5144e171665c793d7ea7dc65e5b2c4bfe195ec0ae10866608855714b3 *mac-eos-voter-0.2.2.dmg
```
