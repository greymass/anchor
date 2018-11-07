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

Текущая версия 0.6.1:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.1/win-eos-voter-0.6.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.1/mac-eos-voter-0.6.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.0-amd64.deb
834f1409690c338191f9c8a6a2bcee8291d81977897e7e62e9614deaf5642cf44b640ded97b811f61c18e535563e1e5acb69e4de2fe8fe6bbc855467e5f0fd2b *linux-eos-voter-0.6.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-amd64.snap
c7c6ebcedbda30de98f19ad3cfe5f956a58cefc091a1d9c2d0d5109f913f75f33707a62803e33f9a7630dca2c6b01e1910318a04ad052ea8a55b7dd95277fdad *linux-eos-voter-0.6.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.6.0-arm64.deb
5f7b9fe7bc918f6d244e80610a87d20e40784578c0d5fb82ef782181b5c50d48eb027551874948047362cae89ed8fb6107139f4b9434ec3f7fe39103fe0484c8 *linux-eos-voter-0.6.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.0-armv7l.deb
7ef5a3c6eefbbc0700dfce13f3914010c517d9f6891e94532a97088dc4edfe34ed995339c65d9dfed97299639fef0eefde27e924d9a43832d32a6745f289d042 *linux-eos-voter-0.6.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.0-i386.deb
7f587daef9e984ff8f03e3c9d50e570c6d40dfd239d5e3be817607b0658a72cbb219fca07afad8a103b885ccd7259124aada5e0de1ccfacb03e704a0aeb4227d *linux-eos-voter-0.6.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.6.0-x86_64.AppImage
b08d32b1663f1a2caace8346bcaaf36e51e22fa5c3d181788e899685c815491681bc82cf7173308729a9f24e2ad154ef250d51b2caa629a0405a58c6a4a8daf6 *linux-eos-voter-0.6.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.0.dmg
cccad2fd292cfe75df904b7fab34d34583686c41de5f2b362d6895547903138bc94c9016fc1c95781eecd0f93217562c282f0e054838c9807367249f6032c79a *mac-eos-voter-0.6.0.dmg
shasum -b -a 512 mac-eos-voter-0.6.0.zip
9fdc0fdbb27273b6248825ae1afd03869f2960ea4287c2619aec9504f8da1faeebd8cabc6a0117697b3a13492f9e08ce2f224be23c3580800d3b12b26adb992e *mac-eos-voter-0.6.0.zip
shasum -b -a 512 win-eos-voter-0.6.0.exe
39b19425059abdf24446d5e6c22b7b095d2fddad2c121c028190a71a283ff741d1c1d4f802c9397466fdbdaab4a6a726694af1e8b6b8c3ce401dd7f6134152fc *win-eos-voter-0.6.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb24KnAAoJECyLxnO05hN9zGIP/RTQX8liCmMpV7roUVkJREVL
Ghw19r9CwPuhq1T0MXK/l+GjstM3nxSJKh1CPOty6Rc+LBt/HEEDhYsXVCQQCOZv
6Crnh0xHcJoaz6e2QQ5U4yex2gA2hTb0Hi0pxC190UtXfFWBA/oa2TqSx1q4MGaF
8KYF7mLxnAa3oQJn9NRzbWoVR1xbz9kEByg0GeUoOAoXZ9ALoB7ifH6+oVimfGzR
yVhbl3AhZB/4UcatJQJ/vXrstO4WoHWH30JeAcmyzejCvHMCP82/vNjNSP6/Bo7W
BbvDsl6yo+Drd7XIXlrk/nmzn1tm8c/ycPLXZpHPdK7KLoyUDa0NZVK8E/xKD+Mg
reeghorqaRwXz50ViU4Mv4HPuHAWYCvG91iVEjdBoqsMVLnrNsWPGj7JOsR6Ezv9
zuLADBh7p2FVePhYX7ILS9gJh97XJCVSAbdx5J9TxzftUS01YkSFm12Mf8cosgtt
sV6LQDXBjtnqBdY07Kl9Dt5uPzLyxKbukV0tQeJgE+a8EYUoqwVbmQcTjPm+HLnt
gdnbQ7iOX230C5/th0lRMS9nOyb7/7rtwCQsxlRLrZyxo5jCtZqwAUGTZQxkFwcV
0Gzx7DFMvqpaXvin4mRv7rJbSVlNkX/Kuw7tnxNXzSfjdFOfw0QxLttRKwrsR51i
19c5zb8CG+OEXb0MiEks
=poWJ
-----END PGP SIGNATURE-----
```
