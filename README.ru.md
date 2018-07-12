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

Текущая версия 0.3.2:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.3.2/win-eos-voter-0.3.2.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.3.2/mac-eos-voter-0.3.2.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.3.2/linux-eos-voter-0.3.2-amd64.snap)

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
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.deb
715b3d4a446bab2e1d9278b6783d911509bd87f31c905b556ba94f98830dce9c920d6663eb1ca588fbcc8f0b6646a75d6ab0daad1edfe23672dcbb2bc45ab5fc *linux-eos-voter-0.3.2-amd64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-amd64.snap
ba3e60950dd9d87a46e35179d178eecb08ed6f2f46829c04cee4f8f61a04be65ec6e367b340a8d81060e96ff30ede7769bb38a993022aa13bfa823a421537147 *linux-eos-voter-0.3.2-amd64.snap
shasum -b -a 512 linux-eos-voter-0.3.2-arm64.deb
056cff9e11066d6cb7ec97cda586daa572c3d71e62f76603055fe2ffc477417051b3b6c4c573b08fa01551cb1294d025e1818fd40de94bb1eefd971259a5c9e3 *linux-eos-voter-0.3.2-arm64.deb
shasum -b -a 512 linux-eos-voter-0.3.2-armv7l.deb
e6c7bc7e2b958c8a85c5db568ab8fc409d7c324eff5136dc2e98e3caa761b74ff69a188b42c47fcb7da3b867e276e4962e8f6b3734bb1db9f0c48a5f42ab7d66 *linux-eos-voter-0.3.2-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.3.2-i386.deb
92b908f5906553877856640de7eb39256f4451f38f7cdd1178443fe302cad9272a325974b5a5e14df5074018a4c6a525e896cabefffaf4e3e5850726f599dfad *linux-eos-voter-0.3.2-i386.deb
shasum -b -a 512 linux-eos-voter-0.3.2-x86_64.AppImage
9e46b5a1753ade0d26cfc7f17829ea476cebbc32596ce4637e827e41f245c6c1914952926606c58b27e4d27f99465914c7c88686e8e85c154ce68db9bfac0f4a *linux-eos-voter-0.3.2-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.3.2.dmg
0f8e1e8e69291c0686bd95fa25846aaa5f0fa8a4bf193cece54d1ac09aa51acd3bfc7f1eda2485992b9df083bb03b4e2cac62ef71f798f8646a8f3c499ca36c9 *mac-eos-voter-0.3.2.dmg
shasum -b -a 512 mac-eos-voter-0.3.2.zip
23877286bd0f98d8747d23fe49521ccd52963ba49d6b24283083a61ca591ab6a015190184641f35d04cb5d8d8fd45210c5861d7709b95d6492d79c7b8d5ba216 *mac-eos-voter-0.3.2.zip
shasum -b -a 512 win-eos-voter-0.3.2.exe
7c919e9f7d600abd57113544a4b13d7153e2fce95795093f7e57fcd6e37e802e6a429d2e69a78ab9860127524fc70802e785a428deac3eab79b09b4b12ae08ed *win-eos-voter-0.3.2.exe
```
