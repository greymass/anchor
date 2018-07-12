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

Текущая версия 0.3.2:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.2/win-eos-voter-0.3.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.2/mac-eos-voter-0.3.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.deb
8022c1206e5a38b3d4f538cbf15a90fc1818c43e3cc0f58c7c73f9dc85e7cd12df20526a298611704d56d8a7429a7bcccc80aac5aba086729cd04f804f51a773 *linux-eos-voter-0.3.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.snap
bce76409ca941d368e7d865d3f6e893ff996e097c7e42a9dd159cb167bab68b8769b9d313b38633e89e1d6dcec180db49f67d8321a9e7a90be21b38958534430 *linux-eos-voter-0.3.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.2-arm64.deb
53e0f2a9c1fe5ff50ec3f8635c5f86aa611840292c1b902379354d6974f2636755059654d2305af43e968f2df90be75bd801125465d40307e3d851dc43a38c7d *linux-eos-voter-0.3.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-armv7l.deb
3c547be55efffc83aed3bb91fe6ffd8dab5b0b7460ed5608ac683c0aea4f3257028158eaa4e5db55bdff4d2e97dd0f277104540f5e2e36741db6f4384e27d90b *linux-eos-voter-0.3.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.2-i386.deb
845eb1acc6f5ac9300feeaaec82eb22dc2a4952ee7c7bda772cfee905b6480a5e2974c4be53853441351f33a83960b590aa16c8baaeb346df5ae79e1a177a67f *linux-eos-voter-0.3.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.2-x86_64.AppImage
e224d3618512d2e893e5ddc8cdb0f0e9082e33a8092a817c0ed79b89e2b6979b403c62ed0df012cd8bc13f4cb7dff31e162e09903073d0f4e14833f086106125 *linux-eos-voter-0.3.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.2.dmg
af8b152368a26c01447024fe2f52ec77e3da7c19d0a501cf274769eb7c59760f5fd48c77e95a812e5d15ebcba5e132061ec8ce37fe4893da75a4cdae76650716 *mac-eos-voter-0.3.2.dmg
shasum -b -a 512 mac-eos-voter-0.3.2.zip
7a30cf1390e1f1fa51f0a5cd0ef93f6c0978de3966d3bd5c24c2c66dff9dc00d6d7c3f6434a65c37789c6d86a661877da5388e22470b44327303502b3b62a573 *mac-eos-voter-0.3.2.zip
shasum -b -a 512 win-eos-voter-0.3.2.exe
d8c6b16a787302a83448ce294c66690573b235b5ebbd7afa9b168ed49f9090918030f6c2d161bc3217bf138f10969bb441385a6190e67f730feee8109ccbfa71 *win-eos-voter-0.3.2.exe
```
