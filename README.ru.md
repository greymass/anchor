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

Текущая версия 0.3.1:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.1/win-eos-voter-0.3.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.1/mac-eos-voter-0.3.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.1/linux-eos-voter-0.3.1-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.1-i386.deb
383d2e030ee927c76c54eeb6c6ce13913a0e39cb97a2ba297af15fab45913f96545b2025b986115d01a8ecab14e964749370990789e68ccdb19a6c5210933f5d *linux-eos-voter-0.3.1-i386.deb

shasum -b -a 512 linux-eos-voter-0.3.1-amd64.deb
1228f22a4edbfe689a30780b9f018bbe1de81e58384350f74039e56d10ec65cca747f7c91971df43d1fe92365fc7f38ebeceafb3b2bee750c267a021564ab6c0 *linux-eos-voter-0.3.1-amd64.deb

shasum -b -a 512 linux-eos-voter-0.3.1-arm64.deb
fd2786f97971a5a94c1e35ca3a95b6ba8c9d916906ca372e4d705dc7b6cd9f0298921725a6df3e6348cb31efc321bb5578086f8f7171a9af15b6dc0045ae59fd *linux-eos-voter-0.3.1-arm64.deb

shasum -b -a 512 linux-eos-voter-0.3.1-armv7l.deb
21be6be8e70020b2655bdcadaf399a2440d3e4c9988619d8a9d6c81e16151271ad1d5568452a219d02f2e9ff196e79e349f7ec876be0570e424165e3b0cc3c5d *linux-eos-voter-0.3.1-armv7l.deb

shasum -b -a 512 linux-eos-voter-0.3.1-amd64.snap
a8ac848ee23a67ec1749316d1d4fbd81c19525c6a39fc1b22da89676f26d0ceec35689ae3b6feaccec5e6e515466d8b087ede1c057d4b01fb97295faeff80dd4 *linux-eos-voter-0.3.1-amd64.snap

shasum -b -a 512 linux-eos-voter-0.3.1-x86_64.AppImage
e55be02a047054de711bf40d3feb238d12485a7f8f4329c4735ce434205f49ff47e95fa0ed32d42a7ee16bb3db7f8f1602530ecb5ef009331af2d91016ae79d8 *linux-eos-voter-0.3.1-x86_64.AppImage

shasum -b -a 512 eos-voter-0.3.1-mac.zip
19e5c689e51c9eb46037f179ef0d93e99b5c02d20d0d8b96171f13082b17253a2a6c53ad759d55807e8546e18f1fe90ace6b84d7ee98e157ccf5e858c1210f4d *eos-voter-0.3.1-mac.zip

shasum -b -a 512 win-eos-voter-0.3.1.exe
ca143a59ceee7b656254a4ee1c0bb3834ab54fd633a87dc3a4d742a3bec56ce0a0ba4ed4384e2c8571d36075acda6ef4cdf47df4e490efe798b8a95345aa1bd8 *win-eos-voter-0.3.1.exe

shasum -b -a 512 mac-eos-voter-0.3.1.dmg
63a962436a6ad63cc7a054d9ca0efa2c0d5c355f5f7b83161d10d1129be234407f46e7a96bcd8bfd107a8b7b05ccb8f0e95457ac38e3b6060985868d4457fdb7 *mac-eos-voter-0.3.1.dmg
```
