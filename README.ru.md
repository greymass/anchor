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

Текущая версия 0.6.2:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.2/win-eos-voter-0.6.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.2/mac-eos-voter-0.6.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.2/linux-eos-voter-0.6.2-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.2-amd64.deb
16a74ba15c579eb7861e95f8cc7bc62156ffb767f078a25a0b1b81482e99123948d38ced23060166800696365df96ebb53fbdb8ff56d6680f49089a9ae2ac019 *linux-eos-voter-0.6.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-arm64.deb
4aa5af457d9a51b110b623c1ba1cc8338048f734c8122793973f342c0ef90a9172415eb81ff4aa7aee63459f77387007ba0d546e8700d62457dcad57c77ee85e *linux-eos-voter-0.6.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.2-armv7l.deb
4304df7cb0282158dab2a364a6b6b944d45259d926238e812f1fb5de605f818304d4c98619973fb0e7c61c9e903dcf07a2bc071e5f7780f2ee40ba7123f7b874 *linux-eos-voter-0.6.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.2-x86_64.AppImage
242ca936dc0da02a3f21f1b9f7febe3a86c2b6c4920ee93f0efae618bd55ea6c3d96de07339d0fa3ac2bcb6e9ce28475fe50667cdb16187f77691bad7c198302 *linux-eos-voter-0.6.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.2.dmg
3dd5110f1348c18767fab178de5cf72649ceaed2d08657fc0905d85578d754e57f413f6a9dd608a05fb402c9e8ac02e9e5b9d3ccb41b0ab37bbcb791d8e5040e *mac-eos-voter-0.6.2.dmg
shasum -b -a 512 mac-eos-voter-0.6.2.zip
a65e5526ae31eac5dda47d3aae1881fcc6686c79a2b76690de1e8561731252f249f6de1020fcaef46a307e1984cc2634e7aeadcb21cc65954b2f8ab0103e84dc *mac-eos-voter-0.6.2.zip
shasum -b -a 512 win-eos-voter-0.6.2.exe
29e20ac9ced730f3cac14e2235a7fd86a43c8d311d601e1a3b50692c8d6dc3e4ef74471c4e43b56146a79caa0743df110cd2bdf8bc20a0cc17b22d84e9c457ad *win-eos-voter-0.6.2.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJb42bwAAoJECyLxnO05hN91VkP/RKYjXbWebd2dPpBibtyHmUo
hS67shdhW8F8r5bxM0CFABLECBFK0K9ybMNCoZyn+BTMSFVtD89LE+ESNriGJ7/m
Zuldc+BF0c4kt0ZaTKOXASwM7wZQDxFaYL2zYrOgvYf03zf3HuvhTJ2/E0hx7t/q
2Iw/mdtkCKsBq3HJg4lAWBlUCaRGW5ssThls/GS0t5hCGzKsHIrEnEJupVQfZfuw
XdC/skQgLriBJaxNSh+XAfJtlHZ6es2r0q7odcwwGJKN+tWIx4JOLb+j5dsEGeH0
YqcKAOENHBxUSCOPSDbKZyKJiHhm2ZdenszFcN9mSGpOLI7TVAcXAIf9JnZl0XUU
vWRH+Wv1LL1zbb87kTtLYxu6ZebVud1p4NKLsX69zoUiRhhIW+cRtNTgd1wCeUnk
brXqB69yJ4VudpDtQp4/94/1XJdKRLSMOKlMsJDUSTg5r/yP9jKIaiY5JTCUlOF3
BII3UlXlpo+74j44lIGojYXqq48aSonL0lhjL2/vQlt5LZFSG4VLifGX6FFXks5J
+/EjgQI954Kxp/ylt9ThpwMFh0lcSJp99UAU52HEclEnKrVrCOWwLQP/syz59Qp9
ISY8yY6VMnaKMZU6wmev8SX1+SlXypSnbpYVMMZczAkqeeOcBaLQ30jx1NGhGDCk
uPz9iMMmX+MCoRNL0HI3
=Rw8R
-----END PGP SIGNATURE-----
```
