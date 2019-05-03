[![Версия](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![Проблемы](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
[![Загрузки](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymatss/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

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

Текущая версия 0.7.8:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.8/win-eos-voter-0.7.8.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.8/mac-eos-voter-0.7.8.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.8/linux-eos-voter-0.7.8-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.8-amd64.deb
ca6f4fbfaf64b38d85144178e2532c5909f4363ec7074a8b9afff7a15cfe146cbda540e8505055cedaf597bb0e308ff8aee9ec87d24cd381b3c116d4b175319a *linux-eos-voter-0.7.8-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-arm64.deb
0a5c4ee4bad59db02f13b4c1d0d147cb2cc8bd2eb83cf0786ac138b807b7b4edc212fd63d08cc54e3a555202fa4646da3cb1c03cf3c9b297199b8362d20a7eb1 *linux-eos-voter-0.7.8-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.8-armv7l.deb
2144970bbc0cf92728659c797e6a99708c566834f88c810131b04d11a4ef152d3e1a997f00e4ff22a27b02b1f701d96d6058bd1dc9977cdfc2c6a636273aacac *linux-eos-voter-0.7.8-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.8-x86_64.AppImage
fe7344ec93a7e769ce9f89ea96eacc4bea40a32614588cddc21405993307d548919289ddf14a8c1431c276604d84b3a85c2eb98c28f98e1d92bca1b4584e1f6a *linux-eos-voter-0.7.8-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.8.dmg
a1a1756069998822c8f566e420754f1922d81b7223d2e81962de0f1188e1ecb54d0bb4e22ff2574322e26a0338dd2027e2e4106b777687cf33332321032f7d4d *mac-eos-voter-0.7.8.dmg
shasum -b -a 512 mac-eos-voter-0.7.8.zip
5dfb2de40fc5e4ba0d41bc772643457a26b99259e1e2eb60b473882efb17cabcd93efa7f464c8f5ffef3e733aa9cd9b8b0d87ad9ae92ff4b098f797557d58586 *mac-eos-voter-0.7.8.zip
shasum -b -a 512 win-eos-voter-0.7.8.exe
d4c8f18a5483dcd434b04e8f80f29a0958cc1ed333282c02762a34ba6016ad51fef66a0580ee0203b23d8221588e36d8656c25d2c07a8c112fc492f7b9bfb0db *win-eos-voter-0.7.8.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcy6fzAAoJECyLxnO05hN9GTwP/3fOe+7jlltTLm6nWqmVTmsV
UaC/Wr6tEuyBR3bJloaTHAl7MghNYfoXEjmZSCO8KPzKYcXNTxSOBFeWQrltIupd
myijc+AGHf91h75dZ7KRg9ts9rFpQTF35Vu/F2eEEk2mIeKrP0f7V2GjAfD79eJJ
0x6OIjwgYvNoOp48ZxPcXpozhYgEnXD2fagIvaM0qOVuIautay/Mig8RYPdFrs9+
AtSrHbcxv/ILSf2UZnjgRfjgtF/5IwC9NMbYsrk+DS1x5nmdmfomOeRk70GyaCcS
FwovKDmA22uxooBYSKhBqwSfIoIty/etaS8rMzH/04A7/gHxk/7vOoPgX9FEVb7Q
WvN4893zubqagHLZUXuB4ExXqwfudLw6FlH49eB3gFXLIPIF88zwRqbfYXTCcyVF
z/nyhs2v4SxRTuTUbTMwE+N+W3tHClhHD46Mg7PMsVqB92qHq7Csgz2VGJJf4Fix
7qH/HvFeqFmSTNaTPR+ahBU637a4dxrSyzLOYgW7QAkVSrNlX2SE7dCshq2GWvOx
p6wiiLI8Ks2I1SmPOWXaXLNQZngjoKdPrar2Isu+WoSUorEq8VuoqDAKOI5v7MiD
vLfewsS/GrCyQaNdMxhA6k0KHlChncUbo50XQ/9IoDW0GvPalY9PSGLWvLznutJW
pjEiVUtm4AH8AbsjSjtx
=o4Wh
-----END PGP SIGNATURE-----
```
