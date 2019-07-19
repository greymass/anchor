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
d2b5db8a6d0b4e0963d392c72c400581959766cd5f27fa5032351ae6a95bc487fd30773d361226fdc2dd97e1d39433a54eacad72583d1a125d6b46e03e78ba94 *linux-eos-voter-0.7.10-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-arm64.deb
3aeea5e196c48f7a7c03669c25f99110cedabfded3df9f97e3318e079ccd216d10f603beb04f840911ddfaacc663d59a47e3539db4edf8616d6bfe4b4b5e83a3 *linux-eos-voter-0.7.10-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.10-armv7l.deb
a477912c77bb93edefed27a87b58cfa19673d308a68ee649f2e7dab8aa5734644ed51d758908851f0a71e78739547bcab39565136c4893ed150de47a5fab2d47 *linux-eos-voter-0.7.10-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.10-x86_64.AppImage
02bba946eb3deb63690387e6233a899c68491e588d7a1b95b62fb6f89210cc39e365bd6d318890363ade85a14f9ed8873dfff42e2d02e29d0fc6e9dcb6e14225 *linux-eos-voter-0.7.10-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.10.dmg
5e39d14a25338fc25972f0c89cfc98b4cc682b66fbe48e9888f9158ea2a6bb502de23454d8976014bbc76e26501d7ecfb9ad118e83ae9db75345689a464af7ee *mac-eos-voter-0.7.10.dmg
shasum -b -a 512 mac-eos-voter-0.7.10.zip
ed39a12df4a3fc8ca859371d34ceb86dd7516cb4f2a5290e3e6a2c652ddcacd7a5cd766bbccbea01387d05f46d608f4852c3b784099da063c5cd733f996039fa *mac-eos-voter-0.7.10.zip
shasum -b -a 512 win-eos-voter-0.7.10.exe
9e2df61a64b0ce00a13a005da1ce0d6f8526f4ab395465e4898268357be61bab4030875045c4c2b08ba14144500922a55d84cc92f534a0aabbcac2fd9943c9e8 *win-eos-voter-0.7.10.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.0
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdMimDAAoJECyLxnO05hN9PH8P/iKdFecdVwaTwRv/jygRtekg
p38xPNiN5xyQzm6KgW4tg8IHsof2GKD0l0In/IcPiMIm0Zrvqq/StxluJxk06ZJn
b8shvsZD3OHgFtvCVo4ldEisbn5d6G2VqG63nobeg3yofPDeKpR5V/0/9vkhQSos
XOZFhUw958oqU3jkR2dcgDsUZ7gISlu6Cq+jvbFuGuwpaeoKCyxCfA5tY3bUPUsK
C4nPZUl+Xstz4rd5T92R6x1SBTNEUUL6TrPK2R2VhkipMeHwpGALmeGDS2+Nan4D
4AI93h3vNzyutqTXrdm0mJJo3QPQjgnmy6FBew749Ho+km/qEiEwgHtTFNGdSjbz
Ok+J918CJaWpp4Esl/m4Z7BxTR6XlChWVnaurXhxNoeRoIOlLvFGWwg02IlxADBa
Ecz0dJ5cS+AxDHntUQjm0dBh+SSpXYvSdZ0Gx8+ftuS/vBkMc+i+5NDqtYbWGXqD
UG9LfitatUcsrSnsQ4CAdirAmXuZJR3nL3sn3meCRVWNgWi6kNn4voVAFALtjfT0
qkx9se9phO4uXKEbve90/i2UOwXHbLjol80LSkOL8AggzyuQozI+don5JR8cVmxA
F3zGNbc+OMKPoyB9HpFA0PPbG9/L3TBDawdAd6R44cXijWI9sPO07DaVA8dWtZKH
yYi6VxpfyL9HSnMr/4ch
=RUm2
-----END PGP SIGNATURE-----
```
