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

Текущая версия 0.5.1:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.1/win-eos-voter-0.5.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.1/mac-eos-voter-0.5.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.1/linux-eos-voter-0.5.1-amd64.snap)

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

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-eos-voter-0.5.1-amd64.deb
001d9e8b38dafc31bdab360dc758c51e7a978fc80b87ce1e03e55cfd0f99110704ead1add62b1cd4eb550f6da0aed1492ade06c57269d607ac6ace0d1d5cb0fb *linux-eos-voter-0.5.1-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-amd64.snap
229de9fdab1a3c9e1c660530774522cd6cb7829575f7ec6767dce3c20464c5bd5a61621153ee492c1df7b9756b6e594fdb06b4c9341fa5e18c46480644718bc3 *linux-eos-voter-0.5.1-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.1-arm64.deb
eec8f67aab3cc0f46a6c3181cd2819a68c83d470a838b11856ae5e4aac43f01063a832986a960f93b84cfdaa619f283b95fff4a021725bb05f6d9c82e3bd1746 *linux-eos-voter-0.5.1-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.1-armv7l.deb
a2ca519da2c3559c448eab5a94406e891462d4b9e12c9b74e944f350e5741dc8ef05c653102a439d69cde2804fe37315580c054a68423bf542ec5002622011e3 *linux-eos-voter-0.5.1-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.1-i386.deb
9ce361225aceff3a65732d607a792b83ffe6d59f78b0b6e2a8d58e479de4299ef32161d10fe09a28b126a9a25010a4ea4ed816c8c400427b3d03eaa3e9e75c22 *linux-eos-voter-0.5.1-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.1-x86_64.AppImage
a8797a5d838539efc007808c2d3112cc2833b182b22f5aa63bd63a6f09583aaeeb22db153e79156bd73e8ef63a7c176e2b96891e36c05a9ce7b5c3fb0214017e *linux-eos-voter-0.5.1-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.1.dmg
1e34bf2a0f57a7bdfb9292129cfb03b7aebe0a73c868afc72d23a8ac8896846a96bc4ea17241172c64c4857107cd73b27b08b078983a6ed5659f05d25aa1f97e *mac-eos-voter-0.5.1.dmg
shasum -b -a 512 mac-eos-voter-0.5.1.zip
89640896cb92f9991c2d4cc09a9700d8b7939790460bd40af3093a07b861cc13ecaf4609fa131f700ecc5a8421199006b54863e5641ce4aa613eb57f8915fcb5 *mac-eos-voter-0.5.1.zip
shasum -b -a 512 win-eos-voter-0.5.1.exe
06e24034bd3f0ca36357d289b48ed22b0a707848025ec45adddac126fced5b6b1111fb83b0d5b7c117492c7929bde0a78a786185e943c971dd0667a0538bdd4d *win-eos-voter-0.5.1.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbfeIlAAoJECyLxnO05hN9IpQP/1LzHhhaV65jGJAYp20j6XX9
yzdl4d2iEbMyPRdN9bs98sV57CVHS6g3delHawXOatogZsOaQKRC8fEiAg77EJAG
3siPqwiIBJ6eYUk9lnUGFaCQcroA07yOfLq1yybg9fVzAKiYe5TCBDlsXPUreGu6
1AiNgE+ajJiX9WNv1NyPHpxTsBtrYbJk5wVw0t/SV8oX4si7OfxiEINMnWxq94ph
CTzmkH36H8Sc5iXkJU4sAyNTtTyOhmj+d/MrbjZMfusvlMRC3Z6yraHvTX5zuyop
6HrlbwA7PBCRnqz6VAoCv7w7b/bWCBcB2Ldrwsf6L3zRm1thsqsnpuLb2hJEZAib
bLshvj0WIfgI6O5wXkC2cx+Wknm+2a9uFQW8kElaXXNZYNreH5y5VjU0FkUVYTa9
Gjl8wPPvKIk6oxlRXu9FjbO66b/3ZfABtB8t28ik74TfgBLIlHlaDzMe6qVr8xrh
6nST5qeSZpooZ+J+KbRl9GVk8Upzg3tPOoJlU6+efJJqwWVl2GMEZFS3NI12wdzW
ICBq/+uRK20TTMoz9K1OI6IaCIOOPigItRQxQbt0aLgJSqswyEmyN83PptxCuaNl
ZzZj8uEVSTPBEuqhyb2dguIv6Ln7VaFuPOmWnOBzB1/3wqZUTi0Mtr+0jxlXrz5T
Q69/2TUDEepbkQD9HBMO
=6SX2
-----END PGP SIGNATURE-----
```
