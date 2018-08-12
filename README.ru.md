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

```
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb
a767a8a85de0a7b2e7cada4ea9c80ee5610117c8eb9b09b09305671577474a238b5ead10ed9cb32a132fc7ceadf935de4176822788ed4da88fdf015635663aab *linux-eos-voter-0.5.0-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap
1a14c2cfa69500f8534eed13a449835c153424b2a02337e3d7d0d13d1c88d50e4d10d20e2c78ab967653b4896848f3fc47fea4aef2a084076a028313a43bc2fb *linux-eos-voter-0.5.0-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb
7f20c47f724e71ae1c7b4bf130170b33803bfdf83e124bc9f7fd6ab21e5071c7a48a7e5447218cae1e6cd45f32303a314f2c47c32b9b9d2baf61bdb8677cb015 *linux-eos-voter-0.5.0-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb
389cf80e3e28e71bfcbd5b8850736b27722edb4063dfc6a450ae9f8a1240d7fd5e39fd13b4cdc6f3f4087e512df98e9e73b1c900e00495cf5608f4b1655ffe09 *linux-eos-voter-0.5.0-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb
91c0697bb0b50af607517690c2423f0c07f997eaf4f488800eb7abdb68e26d1c2b36c5c1622c1afaaba150701e864899a250b79679602b729ff8f48859762bb5 *linux-eos-voter-0.5.0-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage
cec2f578ddbb01508327b2c5dab4ee476c8ba141d8a7cc10c5fef3da1bcf83d6e9922588882baa06f00c4e49792c1b166eba14a3658733d8eb1b85aa7539f716 *linux-eos-voter-0.5.0-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.0.dmg
efdf141a65a65424783f394e712338e57b653e6322d7e08039fe796755211f4d8cde27fa9a0a120abbc338dd360f882f4388dd3022ab94831fea10c09f78e433 *mac-eos-voter-0.5.0.dmg
shasum -b -a 512 mac-eos-voter-0.5.0.zip
ed5a7e73a6f6b6e2716fbb8396713cd3184e17e640bc8b51a4b141b7f50e478b23d26374aed78670fc1d5bf4d5e4bcabc803dedb7679e83c02a5cc004910e603 *mac-eos-voter-0.5.0.zip
shasum -b -a 512 win-eos-voter-0.5.0.exe
6cac7e0cf78e02e10a91fc008cbef02dc4f51e013493d412f1bd412d732371ead7bd770979b890df8f09312ab53003c04787bc7beb1a5fb6ef61551333d74852 *win-eos-voter-0.5.0.exe
```
