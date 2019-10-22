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

Текущая версия 0.7.11:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc1/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
3543bfce0ac2e452ac82be539da1ea35ffecb5cd2802135362570f44a38fa46290fc42d5f80546024d3df0edef1bc90e90c6031452c2c102aa153933d6684de9 *linux-eos-voter-0.7.11-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
1d70270a7f37f2e4caaa3fb2b5df761091dd6c711cb23aefe87965ec790b1cbdc46bc3079548d862e803e3e0e5887da69653b98959c3112aeee9fd4152f3d874 *linux-eos-voter-0.7.11-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
2e6f10ac7ba5b5c43d1f16935e62d34c922cdd48f4f31e6bb1d697e2e35cc3473b4e083e4bdcac34273b81aaf7255ec4acc2bb42f9c0cc3dca8b9bf516cc2f74 *linux-eos-voter-0.7.11-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
6fb76795a66231a8809acbad2709edf94789e7a0cf36a2fa3a9defc472c7f4d70ec4bb0d9e458d8330fa384b5c15d64c454cb429cf24de9a679dfd89febbf634 *linux-eos-voter-0.7.11-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
fc814169319bfdf91b52e2f5ac18115431734552f8c18dbf8f43367113641946b6670dcb7805c1cfd9c37604af5adc0013e4634732d6abc450819e0f7b26dc3b *mac-eos-voter-0.7.11.dmg
shasum -b -a 512 mac-eos-voter-0.7.11.zip
eb6e193ce91e4e1992059067f985595d7ff4da2a50e8c25a1e1cbc3302937fbfcfd7e2b3117f776b690a9247f0392e4035e7f9c78e2c678497e0f308c6154309 *mac-eos-voter-0.7.11.zip
shasum -b -a 512 win-eos-voter-0.7.11.exe
97edf7aaac9a0265f8ae21d70ce021294ac427342353bb306f1b87cb19b10c1f8dbb50a1b51807587ae4c40dc92fbe06f70053343b93d54b2ec2675569dfef9e *win-eos-voter-0.7.11.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdQNYzAAoJECyLxnO05hN92H0P/315x1SHKABthYnHbDj70pqe
rkkHFNSfGD0kiAkeAqCh8gPxCcMnP1xqMlM4cMnY2OHwOt0jjmQxcixcIrWZdhmA
7wKTvLa/A2OfinRQ/+EX6K79iSTjbLYYDeuS9ko4eQNLcPFJ+gnEx0bjQZKaVtzs
A8ULSWXpWqOZ4mR9ZH8BkY9RO4zhFEZUzp4kmGGeJmDWKbRq5pGuH7713XKwewAY
ZuClxF5slcRcLvKx2H/IJgfYU4sPK8YhlPX3Kkr3spKJs3pctNyBUxsadmjKZ/1C
gXWKpjIbFOQTcoetYccdJe5fT7vdKZv7Fv7SszCRLAUEMyZxcTW7f6nj46hIKsIs
PWgWegdO6JCN09KC1zfslTv6UpJI6uSb42CPq49EcL1FKsJ2X2B4sA4GLmwmsQSx
DtEaZcOvnC46rCuuhEZx7EXRPcixdIuuJosqv6qn2KKSqU2e9oyLfcPKy0nQ7H+p
DBp+1kbEp5bd/QxSdaGE1ohOH2Tf1JNP+fWSXOiRh5987IC9xFOtl53hv+P/nTlP
KdUo5l2UsjR4qv1TrFUg1s/MeMk+36ZSMkN9zqIG/nyMn2/EwGftqb3xqflm0lu6
fcgm44kM1bx00DdRAseR+Wa8aZ5SR7ALKewvQU6+3br9hWS5lkv9vdpzdA7oWXHl
fcHjrk15VeLqUpVLiFM1
=7eTt
-----END PGP SIGNATURE-----
```
