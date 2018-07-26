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

Текущая версия 0.4.1:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.1/win-eos-voter-0.4.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.1/mac-eos-voter-0.4.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.1/linux-eos-voter-0.4.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.deb
7561c25d8931025434233ca10f31d0f63e2e0941870e57518ccb60fafdd42fe56ab6796fb557bfd97d0855d80d8ed3e328c007eecb7aa57d952da672edc5bfbf *linux-eos-voter-0.4.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-amd64.snap
db2efc19a06f9d51ba40aaaf06f28f93b9867296a2707adee98dd145871eb3cb57f9d12438f295c09481957b366f9e59346d0e42cf9208c852ca4ced1fbaa2f5 *linux-eos-voter-0.4.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.1-arm64.deb
4c5567a7917e951df14bb7ac9c53afacce8e4d7b93a8ff14024ec4b60651b4eaaae54f8418b25a91c22e6010c555d967bc5f8bfcf33a72822d04ce8b9f0e375d *linux-eos-voter-0.4.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.1-armv7l.deb
1956e33dd7f4a70c1fa1e008a9f652590a917c399902ad3acd47c4520499808bb5b027f3d14ed797eeda65eed4d6a89d0e8afc3df0eb093e3475eacf3388bf3e *linux-eos-voter-0.4.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.1-i386.deb
a77842c747d4a71f2d073db112e344bcbe2c006acdf02aa43cef2aebc159c418c393ffba7cb5f29a57c0d5e86a9a7b3bebe75c3d3882aabfdef0bab3d98ccdd2 *linux-eos-voter-0.4.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.1-x86_64.AppImage
c81d8ddb03a4c6ab5af8c00b7802dec4ea04dfe6044a9cd28e2c589a1011a33faf94bbe2ac1eecdde896f89dbf9031346687e3eb96fd553060f5eb5f72443778 *linux-eos-voter-0.4.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.1.dmg
82824383e2bae3338880d5f9278abd0dd97b0dbc6c4c640eec602c87c3ced1d2e65267dea66b211334a28f214a2e43c47c40016dc7b58e2cd2e0628a5f837b1a *mac-eos-voter-0.4.1.dmg
shasum -b -a 512 mac-eos-voter-0.4.1.zip
7cffcbeac3b89edc55376e95b014efdf4af25e5471128ecbce7ec4ac7cc0252e6ea61cf76a337536687c2278f939a6c25cf6aaf1d8a04252c26233c627a24729 *mac-eos-voter-0.4.1.zip
shasum -b -a 512 win-eos-voter-0.4.1.exe
2e535c7f0cc93cfba5f40cae5df3d8f294bed08e0dcc48bfe6d6176c667f7586032c19c22d0c8125acc048a87c28ad0a41ca1aaaaa7bf6ff7568e03a5926e1cc *win-eos-voter-0.4.1.exe
```
