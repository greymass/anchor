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

Текущая версия 0.3.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.0/win-eos-voter-0.3.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.0/mac-eos-voter-0.3.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.0/linux-eos-voter-0.3.0-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.0-i386.deb
e713e624711d2ee3d36a3b8ab9b3bf8ad59be1e4c179c2bb78a3bac5b146b2be32fbf859bfcb5e60ba658e8aca89d026d4856942765e0f44bfe11dcaf0ac33f9 *linux-eos-voter-0.3.0-i386.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.deb
d785502fdf8d31c8b6cea10ef8c64a516621fd92282903fd2cabe4fb0e090f4afcbbf7473ee730e46e6c8dc02c31e850162b2fb4c6ed587f89773bb499238385 *linux-eos-voter-0.3.0-amd64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-arm64.deb
eec1efa387c01a18a7ea6f23936ba22396d67d0706de9d40c171117825d463d216f4d0207ff0902372eb2e46022d5bd588ee214802ba88d64b112847df311777 *linux-eos-voter-0.3.0-arm64.deb

shasum -b -a 512 linux-eos-voter-0.3.0-armv7l.deb
55b97236ac80f1f4565b4d74c33e20d6c35e7fbf8ea12f71c023a1a1a5d99412e0496d95efae61dbfb66a4880f2a09940754d653647608cc0d832de271e2d61e *linux-eos-voter-0.3.0-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.3.0-amd64.snap
3c2cc744eb4c54be508f95cf89ec4b4c05ba81c3d05e15f7689df5d69fa2b8a607a6abcd5934a2f34202342b5bfa052a545ec252822a292e9c160094424182ad *linux-eos-voter-0.3.0-amd64.snap

shasum -b -a 512 linux-eos-voter-0.3.0-x86_64.AppImage
e475bf94f6629e5841b57baab10837c3720bb89270db7e53393464305a76b46c9b87d66b8f57c6caacc78291494d65c0f891b59ac0f099eb9b31946b851fff0b *linux-eos-voter-0.3.0-x86_64.AppImage

shasum -b -a 512 mac-eos-voter-0.3.0.zip
5692fe1c8c4860f0dff1a5df444258aefc1959709febcddf025e4387e99aa9554d71c6a9839c9ac15d5e0d9e2e79eaf03265a9060dc20325bb03c3c374fd9783 *mac-eos-voter-0.3.0.zip

shasum -b -a 512 win-eos-voter-0.3.0.exe
a7fa929d14820c5534a2b633146dc223396705c9059130504c450fecd061ad789f0c9338c58946cb0a19dac73045d430e1598c387338390f7c1d589cbd50a475 *win-eos-voter-0.3.0.exe

shasum -b -a 512 mac-eos-voter-0.3.0.dmg
bc3a28ae0354bb677fb5a775f1c4d5d624fae519bad5f49f3d9d70161d2e0c2dd19cef6a24b25ec0e0823bf1aafda7a422a9c2178c3bf784138173818b63d6b6 *mac-eos-voter-0.3.0.dmg
```
