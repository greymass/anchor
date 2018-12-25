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

Текущая версия 0.6.6:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.6/win-eos-voter-0.6.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.6/mac-eos-voter-0.6.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.6/linux-eos-voter-0.6.6-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.6-amd64.deb
84a1e8a226b13e37022b9c7f83f409a71b75f519c1ab79592cccabe021fa65ba3bade4d126db1cc890150faf81b9d377d29a629c5ae75d9f95d445b7b07ad056 *linux-eos-voter-0.6.6-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-arm64.deb
4d7a3cec0f4a4418d6bb77dc52316ae90c9e9d0777f212eae376f18a9986ba6645ced7d92701fd9e144889538ac6e4f7ee74e3d9e5552b17fee5b9b367fec4c7 *linux-eos-voter-0.6.6-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.6-armv7l.deb
f8c9d41ed0014674d4595c0a8ef5cb6e9366d02f6eaa4112930d1806fd43e644954ea7187eae495cdee6fb78caf9cfd3b816d25fbb11938ea069d1bf46c72f1c *linux-eos-voter-0.6.6-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.6-x86_64.AppImage
4422275f2b0db0e1dd7a2f533c33dba7e4877c40fc5685af2da252a7de7117dbf2a3a96f3fada65f307c9019f2aaea60e90d8341b6c7a42a2fed8cffd4999746 *linux-eos-voter-0.6.6-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.6.dmg
5cf11187d3ac8df5ad188b4287d93b9e1feee93a31433d385fff2f139de297ae0ad77c336b1b67c09688eadc58353ca41dd2d1e02eb164358d73ab45fa8031c2 *mac-eos-voter-0.6.6.dmg
shasum -b -a 512 mac-eos-voter-0.6.6.zip
eec19a97cc58472e637efd722ba734e89a82b76d110eaa8e6ac37841ddcfbf6bffc89225f5ad16adc724d0f747b3da1e9f94680926312a01b6f7660ed065da05 *mac-eos-voter-0.6.6.zip
shasum -b -a 512 win-eos-voter-0.6.6.exe
a7e5e605640213114c43cbf38a4ea7438e3f53b3dc9cda9556308fef0d9c816b8cfdf1db012e0ebe51ffd91a49f930351f8b8bed4f68752a63f9d088ee16a465 *win-eos-voter-0.6.6.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcIXOxAAoJECyLxnO05hN9CogQAI/1/HwAly+bTzM321g4FirT
+qfFhh6lpfuwbMiJgTPnLUQdVe2WyfGhF35mAB8qCngIUO3wq69zAxa6duNsJHyl
MvcudxGbpe+JADD7zDqGiY9dw/MVCs21rFPLlBDHu7bytSQ2Pdh6Mp9xVlalZmgH
WFg6xBHLy6w2k+xCRUoqlK2qjoU8wkC5YmuTRuqC9UxlYVwnk1SW3Rhe8nuFISz5
20u/Cfe4bVQgWrU3HUpaL2PyhrfdmOlcxAKnsSlFrZzHjJRkQsgoPC1OG2X9C/zq
GV/8lHjCmZl51n2WVWZtAhmSPjwcbRLfKBLYDmDN7uKu8q4kVLWZ5882cRHYYwID
WY3cXnAAj8GjxNepDUd77kHsVw5iTLQq6+UPtV4ASGr0lVnrVt9/bbELpaqpS3LI
zXCRs0sBcCPU+zGJc1G1dsj7SJW6gmGxtQRYLJjeD2q63roX/bHViECvGJAcCVnY
wevKHTlIuKXfliqaavbNoiebVYBSTpnby0Ts5kb1O2WurnomgKoDYeTyKVopTWaA
jtSCkNrPw9dvShnoV5UeKMjJXnFTgdWQ5V/NX/YvLMvl1jdFl1Ciqb8KZu2h0B/X
MkmB+dvyM+/cR+H93LG/Q0lgItm1KQ5Z/JwQy3W7V25Ive3tIUQnax6N0tsnShci
H9AZyacToVn3M4hBJZlq
=uI8a
-----END PGP SIGNATURE-----
```
