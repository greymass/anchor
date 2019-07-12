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

Текущая версия 0.7.10:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.10/win-eos-voter-0.7.10.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.10/mac-eos-voter-0.7.10.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.10/linux-eos-voter-0.7.10-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.10-amd64.deb
9ee510d767ec5afb97ccb3ab317f89c00a2e370fbb26d2ef6fab6b9567994e3c89e917e02f65746df0345e0a7028e0e229c7729ea187032934b7ccca570b6b68 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
343f953590ef10b28f2ebd89e95645ddecd8965dfaa6f28775ffd14259d061ab6ec3afcd136f59d5f9c98d7fe13ff4369dd550de4ea2d0c69111b15fc9f1f71c *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
1d6a22843be3067ebb189089440248a8b4d74fbe2b5e2152aec5d4e6506d384f3e49d807f9dbb6c0da826b0cbacf72712e07e844afdd1fca14da5a0d3c7d034e *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
717362fab6491a850741f1a2a4fb2885eccb9f487ce49c9e9e4628dd6d7d680dc9259afc55b3f8de42d2508f3c6a30af49c9a7faa0ac21a4fc16c96c5749266a *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
7f420d9a7ada321934df43b09c29b61a8e58128a83cc87905b1affe463f99043b21db69884ac90aeca86560f5623c8db7f0571e52c9e0f51c648f52c6b7e4dee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
fbe79cfdab0da7c977477133f76adf38aa16f79e955ccbbfd72aa96bc56632abe7a7a90e74e1ff59eb0b33196d09353873c2420f55ea3a00cb39ed85a5e973ad *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
c36cdd4acde915f0368471c18981fb3594cfdcde853e5c40b8b65ed6c1db57f2f8fbc24186ffb1abc0699d2886c6f0de60e6b039fd3a1051a188076b57285e69 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJc8F1hAAoJECyLxnO05hN9UrsP/j9D5Hfqrn8qPJYiNagOX3qy
nj3WhJyKzgWFEUBjfLEh0fhmCfESwurylC+QQWhyNa4hhpDWDmWe2bR0XUs9TcUI
MBDWBh5RCU/8qIRROBUGqQRQw6YSU80DNOU/1yQQR0v8f0TOq0QJXNLD9I7WQO8p
P8AzSlNE70MS5crzzn7kCw5vuno28cPtyKJ9jNA+HwM95Hv7dj2fnQCtGm1WI0ON
aoZ2St5nG2oXwvLHL28LwtNCaeVctjaDyxuaASsGwaYaOE+tFOz6VQ8psGGp59p/
Z+LVjyxIgJ3zQu/AflrpmPtrg975j28GB1I+IFH2XVYV/pLoNAKj8+Q5vwNkMRL/
8NnWY53osDnuI/wlgQT0wGSjum4OUWRqOrQdz+TCvqa9Gy2pRgjxwlggszWP0EAL
KqlJlMUG7PUCOPVSsKJW4MhM8AwmHvRby208/ZLQEDfarPbGbLDpt8miQv2ZMoe5
/JhgovTLt4NI+p+7vpbgAJQ4f8YXTFDFuJ9q6C5LXhn+f8kc5Nvtm2HQuEadL6J8
CVKIh0nugoRoBu/1XfahWhmO532OQQe8SmtqS+8wtuxjpqH72xUCTDXZvJ09cMr1
FrWhVRY5TmM4muR1jnR42e9wBUa7aEyRQx7DBqreKNgxBG90j+4s+OWTTQPnYtWv
S1FUBiMIMDIIOjt8xyG3
=uZl4
-----END PGP SIGNATURE-----
```
