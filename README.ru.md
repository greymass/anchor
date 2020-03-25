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

Текущая версия 0.7.12:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc8/win-eos-voter-0.7.11.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc8/mac-eos-voter-0.7.11.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc8/linux-eos-voter-0.7.11-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v1.0.0-rc8/linux-eos-voter-0.7.11-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.7.12-amd64.deb
db3e39af4aa36711c5c0af4b5e63d5eaad091ca65da5540b40302d29b2a220a47234459557610706c8f4ec6eabec92bb5cd0beda51986bdbfad3d3b74c10009e *linux-eos-voter-0.7.12-amd64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-arm64.deb
3ee2ca8f7e5cfc59cd40da84ec55e72732ee147cef35225a5f2d4e7047c3c71d38d7792e45b6423727cc7dc5769ee2bfa7f56e13323678b10641a2c27c780b70 *linux-eos-voter-0.7.12-arm64.deb
shasum -b -a 512 linux-eos-voter-0.7.12-armv7l.deb
ced69a3c32905299849c1b6ff68b282ccfd1d89659bb33f67fb7c16c30ef2af314a865da1f35d2e7c4f6a3e53ad9e6401c61a7225002515e797972b1f93ab190 *linux-eos-voter-0.7.12-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.7.12-x86_64.AppImage
19e03748b6d5e9d42ceddf60855727b37941bcf807d040c5705421ad5e9e11d80118fe5458107ea8316a4f1bd4b44ecca314bf47c3b18bdfb5cc0fc2a241a1a3 *linux-eos-voter-0.7.12-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.7.12.dmg
036f4217729acf50a4065698d5972dff92063653ea969a2c31320fe585ba308aaa7f1ca2143cbae415cea0f0f343d26f20fa5edc5ef9c14a8e1aa02208655461 *mac-eos-voter-0.7.12.dmg
shasum -b -a 512 mac-eos-voter-0.7.12.zip
752debf045e6c0105e80fcf02f1b3218d3c44af4accc4cbd9d24f68937253ecd90161e8be497aa2ff16edaf051230d6fc4ac4df4d3c7b1f2f1c2260b62523275 *mac-eos-voter-0.7.12.zip
shasum -b -a 512 win-eos-voter-0.7.12.exe
bb36acad70b528d28ad096a53bd41b83cf6963dbc8578dcdc3b3929ae2ca9392003bca1fba46d0bcdca975744a1febdd6edd78cc5d6a9a675466a92ca2b700aa *win-eos-voter-0.7.12.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJdteGYAAoJECyLxnO05hN998wQAJ58csR7u39piEpumRLiX9/Q
pGJ6Kmbq1SrmxvXsDOAUPJT53KWNSuTll526Joq/a/TlR7NEx/fxvVi+cOGnNCmj
HdxLNoaExeY5HCDV1/hc5x+3P0VDF5wIfrN2YHh+de0yNXmr7cr0lgoJlR19dzf2
LzlKd1+8DcLc5JyZ14+Fv7WKeFvWwEZNY4KtRNrEXhqv7wX9b1snKVy5AqxGEHoT
1bVdt8uiiwvDVlTTKEDkc6lDNkaY+V3C41CtQliSqjzbJmfJYbGDuh4xGo+kf2l4
OBSq38jfF23wSzP1JEzipPZHKsxlm0rA3RuXYLWOO9UP1AMR1esUGiQ7Q8+iBebK
SYsju5AYfgpyrgC7C0fop/IZsp0N7sr5Mp+OdjHrkOy6TNNDtVRdj9b2yQuKu6ds
UQe7MpLY/n/PRt2b05xMiIDNOe+Juf4vvWuARXGYec8nm7VI0v/Rf7F+BF0XNvgI
bI0wnlp8YPbkeCRvRv+IbzqhL/sYLBMay2j7C2czxxXnSlWcis3cSUDfFF4obw/g
SRxBag6/Yr0kXYN8vkwpjbkZXBqdL8fVC2RW9RZ1CXzCxyRyyQR/BAJg5xUIKuCz
b+RBC1Lbp0AsfN+NnnEl+QZNnnipz+S6yJFNjE5c1q/rbJSEE/jeUfJhstc80jpk
r41s5ya+FBzxIX3SLUsp
=vZcm
-----END PGP SIGNATURE-----
```
