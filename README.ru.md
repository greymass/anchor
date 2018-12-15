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

Текущая версия 0.6.4:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
8094d3daed5c7f2e024f5e9ae6113644d7ab3bbba87a8225ae4ee972c8970ae07f40058272371560ca3eafba20d1dcfd70b16a66688a140c28b485d1cfd30a04 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
e9e517c2a729050e8b998aeaf84818e83cbd94eddecac60d68b011a822ed2d8b8b0b83f4fc9ee95cc3c681fd98ca3275e228d3471132619090ae600b4386bfe7 *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
645a3ef146bfab32e185f4e8412bb4e477434d1770b002c8073b859710fc0d21b448f84a641598a8703d58f5cb9c68841c0642d3b11006b7f2dae35c7cdaac06 *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
0dee015c92303065480fa52b4a50c5afd58dc77b930fe2c50693760917efc1c4d7b9f6d288ec04ddd45e21c7c2735458e9093a5e8b40a7f74983b3901b240f4e *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
ba296668f48ec9f9bb53fdee35be856da00068b7b98bcee0d9d3de4fad73f02d1ad42bc306853a724df22ff148c659673db8135bf633d10add61d3a4167810af *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
6991dc61ab435b389a2903533ab635f835618092d9465f45a35ec904b3f4f41f9a1397059400f5a47cb5a0a3ad67075db93f2a105e648472953833abd6403841 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
4b8adf916b271d76ae402f4a10fc72b3653f4dbd4cd345429cdc16b1981d24641897a843c918c6ae7bbd2ad6651676b199e4a0e752d9037c8af97a95184e3f6c *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFE1DAAoJECyLxnO05hN90SsP/RNQl5VS7r/K1ACmURIPXhZ7
or/gKDdxKJyYIsoZBnV9a1flgCqTw8QY67LPiVdUWZcKNdzfsdrZ29CAtyHG8EyS
YWUvJ7UbjGNoQU2OLAk2714CZuFfOdxM47YVVJxhduZL/d49/H5XcmFTidpXqoVW
7I90UAiVkwPZckqmI8h30wIodtPhia0PiGkr9S3ekD7iUuou4Wxcoisxqb3ZpbXV
uuYoUJrFKJKN2ecNrRoF6yDWEudPislfdt5yHe/+6O3ceJf1Q2Wyul9YybH1oS1M
MShkcmmt9weB/lgHnIXPK9rRKyAq6OW24eOt4xB9DQMEy5P2do9BBdj5ba0gCdhR
qMA24V8vJDw0lAOdOEmeApntwOg4uBmmFX1tKLYruoIzj016ej/4uEXQEH3tNGDk
b76MJb0AmAdmQfHJjWK7V8+WGfhxeuDzzodd1270/xP8ahzmPcX3+vVnl7826/5h
MlvjN6VdUWLIVqItHloPErLa61LjkiZ78BPu89CcCzGbC85PuyZcLpcYywdfzS0M
bPXmT7nvV/Qnyav1GZemQFhbTRx/XTuHema3L45Sls6kJRTeoiOgIZfBjiCpTez8
sYycJ63TEvPlsJdusDU9uffokrV3fafWK9xiB7EoFjzt1Z0TUNCzkbRZVy1mw1tP
zJjiN3L8ZwFMyNgc1JwJ
=ht2L
-----END PGP SIGNATURE-----
```
