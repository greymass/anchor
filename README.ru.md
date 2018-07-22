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

Текущая версия 0.4.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.4.0/win-eos-voter-0.4.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.4.0/mac-eos-voter-0.4.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.4.0/linux-eos-voter-0.4.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.deb
345fe5f90a218fbb2b5d9638a9da56775aec1885a9bf059449f69ec54b54e036caf55becd0c05bf126519e82023f8079a2479deaf091de43fe9e2e33dbe7912d *linux-eos-voter-0.4.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-amd64.snap
f6e94469ec9ea4d9e3bcc22d29279722eb4586f5871b74781adcb395dab1c62d15b6ddb5b072cd9c23aad6cc2d0138d27e6bd5efcda27c13eae7f99db5f8dc61 *linux-eos-voter-0.4.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.4.0-arm64.deb
8ad0d51f4f2019a608093e120cf20814af757fe2d78ac38b7fa169767c3deea94ece99d2cabd8b89e3a6bbd10901a81377c5c8dac22c8f34096df5025b06364a *linux-eos-voter-0.4.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.4.0-armv7l.deb
ded0d6db8135ea404e1bda62b62ab4681bb38b9487bd14fdcb7f964c6140b350054bf5c0ce747c07d5ba975ed1952ba1ec588c3505dc7ff5ec2cfaed5c11f004 *linux-eos-voter-0.4.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.4.0-i386.deb
38259ca723b9104ca19f5006d94d994a1621b48ddfc8d632f835f02ba8faf0bbee23e79eccc7736506b91945710aa5d92f0b539250475c0a557662b1e6dfb009 *linux-eos-voter-0.4.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.4.0-x86_64.AppImage
80b960ffd41ea249574ec68d63bf3b6293cf8c5179fda7e6b9d39742b6e43f0eb303eb24f2b99361ce1181c4fc03afd43f370cb33a7945baf482d3eb8076d85a *linux-eos-voter-0.4.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.4.0.dmg
7fb73dea0829fdf070ed8f6e964b95967dac22e683c5707b2df06915663580cc4d741f9ce0b6da3d374f91ddbab7c18c6632b9573e8eadd35c81e25e0e46ca65 *mac-eos-voter-0.4.0.dmg
shasum -b -a 512 mac-eos-voter-0.4.0.zip
76685389d7c6210b536225ef63c7aa42c71d0eb51f2f1e44d178456f3d48ca5e0badc786bc05af50d7d0ecb5069a8aeabdf7f96d8bcf9916b2099a3377392386 *mac-eos-voter-0.4.0.zip
shasum -b -a 512 win-eos-voter-0.4.0.exe
77e3061e01bc6bfd3e62b54a11ff0f7638033ec5f0bd942f10b2359eeed615c1316df3bed1636d60618a7459bc2c5a2ad23cfdf6065ebd01cdf5b01058d8677b *win-eos-voter-0.4.0.exe
```
