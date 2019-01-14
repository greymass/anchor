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

Текущая версия 0.7.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.7.0/win-eos-voter-0.7.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.7.0/mac-eos-voter-0.7.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.7.0/linux-eos-voter-0.7.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.0-amd64.deb
45dedca9809ee0a280cf173785a1e828d70d031fb490dfe15143d724c000d90c5a616e6210d1fe73d9a5a2eb182da90dcb50d687fff8828e606552799738ea5e *linux-eos-voter-0.7.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-arm64.deb
b0c870363b2872d1aada4a087c7b116491c299bd4fea96f05e0d3e81f68e932e9b604dbb6e0073cd511f9c0b7aae03bf9ca281ac4b7a2858c8e64ef386d25dce *linux-eos-voter-0.7.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.0-armv7l.deb
89ed394b7e4f97c834eb883d4c96ee98516fd3f534973872c1c0ad48e380e2bb2157fbb4081cd9c1ff90cd0eb89f64367ba1091e0a078de8db41f89666aaf39d *linux-eos-voter-0.7.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.0-x86_64.AppImage
ec87d40caac53555643fb615de9674b8edefa8ef71b93c577a26c8b3c83f6273abd88809785c47217d10d96a37695a092d067c420b831c7ab13bb4adcdc001dd *linux-eos-voter-0.7.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.0.dmg
0004b2c1f7f3e4f123ebccc12012b21259d26d01a0a67be9b03216ab2846cb9d885bc0fb1ddc589f153d355290859349a3f181e3796bc069f6f36c42302a9ef0 *mac-eos-voter-0.7.0.dmg
shasum -b -a 512 mac-eos-voter-0.7.0.zip
3ffb82e66029af626f6cd099d4883b3be416fa21c824cb446cf80f58871e4b441b400446da0840462876cb2373c49de16750be07dd1c81c369b3d0070d989eca *mac-eos-voter-0.7.0.zip
shasum -b -a 512 win-eos-voter-0.7.0.exe
463f99128424622665111b9e7d9dbf09c871f3067df31d44343444771e9a9949a06536f46ee9079b46127bb8084a6f80ea2f953ca162012526e22662c2d65353 *win-eos-voter-0.7.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcO/J6AAoJECyLxnO05hN9IyUP/1I+N45d+/71Olmqf4o86c4H
F4MaZgc7rmaFMPemq/6vaGGvHRV1CYLEmE1Y5lFXNtVKR78X3SoEA49Uxi+ArYbN
g6YHwel1PtwksC46nDwicxtFf9XJxab7j0Qt9VkVPzWZDYMIu0SQeWHwDhKHpWyk
b/SfusjR+aubdeYbMw0r7cPMMKuhdy+u7oAhxJMUCcS7eTJZ7D3a7QK6awaJ5X7+
3y7Xy6XcmTULcctA3xjwMq5M/CcxLnTHfI3wNwJnKJb2u5WZFgsj6To1A9QAlcxJ
gklkJ5dvJxdHnHs2ed75oFVzsM7uzNzhJQgbQQpdskKmbJnMHkg6g+1RTIXDps4A
6VnQdib/34SwL2u51WX1T4tFCCWWe9MN54fj78li2iKbK2mQZ6DazJD8TEZ7QxCS
x/umbevTAryTvEzODLecN/PgUsjdSoctpTR8XQsIwR+0i6fNjEj3JN3DovwNzWuS
Lx1n6+Vf+el9DAABdL0ov73ONtc4ojdbXWtfaJJoXusAXOD9md0hwAMkk9c/VeuU
xtT2Rk2pwVKaXf31sxE7lwHI1nfATiMGuAPLUafrH0nmE+HfhnhzHEXqXCjkWgm+
AfJoi0lrOFUegvQN6HI0tnKsulExK0GMTutBVcfHEljTITENmaKAXwLcJciffWTy
r2qlPmomqiwimaxACafo
=XUHV
-----END PGP SIGNATURE-----
```
