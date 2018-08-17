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

Текущая версия 0.5.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.5.0/win-eos-voter-0.5.0.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.5.0/mac-eos-voter-0.5.0.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.5.0/linux-eos-voter-0.5.0-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb
59cab9caed4ccbfac9b4cdb943e464c710e4012e0e6132a74a1c537bbe581e9d383183bf02aef026834753067a48ce04fb0341175fe2ffeaf67d0be9eac0b481 *linux-eos-voter-0.5.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap
3b58c7eea6bbce47a437c15d8694c65937cbf3bf13b16d674d64eedd8e74d0e02e7d2e5f52094cbff93e97da1be53599104ce7c12cc81d0f2e93cc2411598e0e *linux-eos-voter-0.5.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb
deaeef2212769808d486cea2cda6a2453be8e0b422a7779c83a74106a3362b5912fc01be44df07f5a74da0023c304eeace188592f4dfdd38f8f7d980b55516bf *linux-eos-voter-0.5.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb
555ef8da0202e508665c95be300b723e2e5e0678d3e6e2a32336e6d80665341a618c30688a40db6bf1eabc7496f0b10780ff4b16888736520c5755a4556bf2d7 *linux-eos-voter-0.5.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb
e3e3d38bc4f8b98484d412f4bcb22fd3e453f50ec79e85a33005295d7891ecfc4db06c81054ddc6843a399bec727917808629e42acd3277fe2ce835d0a880bc4 *linux-eos-voter-0.5.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage
e3412b0016b7e90f4a8293b0068788fe656edb652202bce0c150d9e658c8c77f182585bdbd10b995d31c495d818c65ab7140230c1766db44f688d25013f6e50c *linux-eos-voter-0.5.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.0.dmg
8207d0197a3890707e3e545e105314e26b809d741ad60fced73f23e69f30b0548adc1a5ac8cc1c6b65d5d1f93e812dd2f9b8be40495c4c7df788a2d36050e838 *mac-eos-voter-0.5.0.dmg
shasum -b -a 512 mac-eos-voter-0.5.0.zip
e71c5e0d2312ea8b8ed175b26f43410f171742b2a7060fcaf5478dd9cda861cd1d67d06600b266c517b11118a5bbcaaa8ce470bb2d6bfbe118c0836ef88506e2 *mac-eos-voter-0.5.0.zip
shasum -b -a 512 win-eos-voter-0.5.0.exe
3a41ffd33e4acf94ea391c0ab3006c928eb2840b5c2187d8eb703bd66ae6c782fe39abeccb959638a7c7ea895e13f5c7277bab85cbf574b54249488694c571e5 *win-eos-voter-0.5.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbdhs1AAoJECyLxnO05hN9PQgP/1U0pJl8Z3JqokIHL2qeyt23
9a+bXHl9lwXlqyCdLfN3AMJay5+k1VmMeENG9mqcrTIZ/cS7bVDUMzL/B1nuV0NL
ioAeMCD59CYO/lUenY+ap0W72VDr5nZ+DotxBm1q9NMROh7FZNzRTMlD2s6VUQr3
iYs1K54l/3frK20xHVtnjv791xSPoVxoDTc6tlm4Nph7KRr1PD6Lwsc79yh8lTHm
u5G4xEYkyJp5i2yaFU6XOi51hP8rb0AskL2/KtSZWXIlKf+D6r/3Y5l3y6O2y3F4
rCO0k27IrkjNfo8AxLRVYtRJHhv6RjN5eiJucll2EadAnAiTrlTxcMVqqM6OUv3G
bczcXJwYiBx6Cc87WdQEBDA17zKklWEmtM+8OtqE81BjZbHSiOjqm5LCJduc/Xmy
inCL1iry8NsJ0XeoxVE3Wpfne7319Ujc6BebxmQQrx/4xXQIcaLjOil7eDC3c4PI
u/1Rdy41WpPrmitJffce8b6jAK+eC4g5SC3Jbb69Mz5CMFz11g0tj/ItqvNTumTF
p5Yereg772hWAte+DRQxpmL3K48MaoCO+5/TjC4D4rb6oMZgtsNnqRs3cIBetbVg
25RglmbZj3lH+p2kWZPRtId/x1Ch3VAt7vrQvU1eFuLf2WqNtAZfoAyCHTnkM2b8
5C5cKNJi2ktMY+iUdmOs
=mEQD
-----END PGP SIGNATURE-----
```
