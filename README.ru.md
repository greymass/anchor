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
7565c92cc47fe587d0d07757abc62a8eada15586c96e55d585bf7689ba80815613095895a54402b1b489fbbb3dab56ace4ec28dcec4be3dfe390555d48ce1f4a *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
03f072ed36916249c1d4e221e6e8791a106946e292d16404064e704be6b75616c097cc15fb9710540c4701123e5faeb9f7afb60e4eef19b13a511b75c3ef641b *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
a14fbdc2c76def46ab6cc47c8612c2927b09091f9d1087877bc422e1e1062741b8f08b671fb74ed3f50c00748f33cb155e3b433929b3ba60f4277be9c49cc26e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
d76dad659929d2311cfdff980ca060aeb93e38be8ae9474f45ae47dcc83a556875671b4b3827bae704a3ddb80152aba76272e37162113c30dd5818129dfde981 *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
7169ce28962a2e4b45c2010b7886f215133e3c3e0f99dc81f674e55a30ab5806d21ba987bd9fcd2612ff668c2d077a3de7b887d7acc9fa7acdd3569c8d865d33 *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
bc9954891f48cb0606e7051cb96b98e5592c8fdfe2bcc6c32411da41c0ca47e971211e2dd5eb601c452f813206fd63135659ae9b2c7b1213065d0d2c5ac960e2 *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
a51234b9068e3beca91b89995da754857e7834b4015e5d378d870004511bedaf4c1b75e2c3c52db1e95c5cf8fd35fa1b47d2c27e435919d8b1520a28329ad824 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFGKFAAoJECyLxnO05hN9sZgP/iy0fF52PGjNN8RBwGzRJFy3
1nTmOIIHdW+cJf67gVG9NcTqyqB14CO2aIJRegjbUWQFn42//GkCKhHXyNLiy63k
zXX1sy+hn0zNa5jOzZjCsOrPA/jg4keUMU/LdwNkzAuESUXy5GRzrUAGHScdmrSq
4lTfjBS8h1OPDURMBk375V4V1W+88uSwapbLGXjLfDqMpmPS05mNf+N29w9sOTgI
V+c5tgS2EEKSMoCQoDYvlWsTvcZUaMG/IghyruSi1KYh5CPJ2aXGoj3VZ9GVgply
ePxS/8HEEpzkTPUpn/QxLa0cz1Dpz9pXWdz0Z/+3IAymrY/bkGcDfnbc1nZMwM4Z
xGbHMlJ8Fvr8lc6Vwwe4bLCaq1NnkXnC4eVYNpNNxQvtv9bAjaeUzZ1VXS+BPrft
rD2cu7NKr+xt8QSqUg8jQFh/mP9odhLa2qGSegGfm92SwIye6kzLcb+DsskVd4uJ
T+Y6gqDCaq62tchq7waNzl3PoqFv+wkmgqceJaltacVqElF9vlBU1SlSRt/wO7+h
/ErR3sBRM8KMoJDBlTVolG+teWnR9RmSB79SyyHxSMindYKho+GNyb3G0hJS7USy
8qUD4yJh4+WRkskVu4A7mjxOxNaJIcmjG+bbhTjOIgaaz9VCVBX/GXRlDjuqPWwE
Zyym0JHDsppfgfMh0brG
=TkGu
-----END PGP SIGNATURE-----
```
