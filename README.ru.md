[![Версия](https://img.shields.io/github/release/greymass/eos-voter/all.svg)](https://github.com/greymass/eos-voter/releases)
[![Проблемы](https://img.shields.io/github/issues/greymass/eos-voter.svg)](https://github.com/greymass/eos-voter/issues)
[![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greymass/eos-voter/master/LICENSE)
[![Загрузки](https://img.shields.io/github/downloads/greymass/eos-voter/total.svg)

[English](https://github.com/greymass/eos-voter/blob/master/README.md) - [한글](https://github.com/greymass/eos-voter/blob/master/README.kr.md) - [中文](https://github.com/greymass/eos-voter/blob/master/README.zh.md) - [日本語](https://github.com/greymass/eos-voter/blob/master/README.ja.md) - [Русский](https://github.com/greymass/eos-voter/blob/master/README.ru.md)

# eos-voter - Голосование за Производителей Блоков и кошелёк

`eos-voter` - это ограниченный функциональный выпуск лёгкого кошелька, предназначенного для блокцепи EOS. Это приложение может использоваться для подключения к удалённой конечной точке API EOS для голосования за производителей блоков и выполнения основных команд кошелька.

[! [eos-voter cкриншот] (https://raw.githubusercontent.com/greymass/eos-voter/master/eos-voter.png)] (https://raw.githubusercontent.com/greymass/eos-voter /master/eos-voter.png)

### Особенности

- ** Голосование за Производителей Блоков **: выбрать и проголосовать за производителей блоков. Обратите внимание, что пользовательский интерфейс для голосования за производителей блоков не является инструментом исследования; это простой интерфейс, обеспечивающий безопасный способ голосования.
- ** Передачи Токенов **: Передача EOS или любых другой токенов которые есть на вашем балансе.
- ** Резервация процессорных мощностей и пропускной способности сети **: Закрепление токенов EOS для резервации ресурсов сети. Закреплённые токены предоставляют права на использование ресурсов сети, и учитываются при голосовании за производителей блоков.
- ** Локальный кошелек **: установите пароль при импорте личного ключа, чтобы создать локальный кошелёк. Этот ключ будет зашифрован локально, используя этот пароль. Этот пароль потребуется каждый раз, когда вам нужно разблокировать кошелек.
- ** Временное использование **: если вы предпочитаете не хранить ваши ключи в приложении, просто выберите не устанавливать пароль. Когда приложение закроется, ваш ключ будет забыт.

## Получить eos-voter

### Релизы

Текущая версия 0.1.6:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-setup-0.1.6.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter-0.1.6.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.1.6/eos-voter_0.1.6_amd64.snap)

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
git clone git@github.com:greymass/eos-voter.git eos-voter
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
git clone git@github.com:greymass/eos-voter.git eos-voter
cd eos-voter
yarn install
yarn dev
```

### Кредиты

Разработка этого приложения ведется членами команды [Greymass] (https://greymass.com), с тем чтобы заинтересованные стороны могли участвовать в управлении EOS.

### Подписи Выпусков

Чтобы проверить целостность выпусков, загружаемых с GitHub, ниже приведены результаты shasum для каждого из двоичных файлов:

```
shasum -b -a 512 eos-voter\ Setup\ 0.1.6.exe
2ebb82264d79407e195b7b40a4ce348b2faf512dbec8de25fe4fd3dea73aa8aaa59f80d89befec0a3a8e1abe412465a9f16dfc5655422ac760a64bca3dfdf452 *eos-voter Setup 0.1.6.exe

shasum -b -a 512 eos-voter-0.1.6.dmg
2ccd96843bdc4d2fa866ce98479e5ef4374c9828077521c25ab3a2bb528b6dd60e890e6787440c5479e57f22aa192fcf9e443997dd519eb442226aded240611e *eos-voter-0.1.6.dmg

shasum -b -a 512 eos-voter-0.1.6-mac.zip
4a99e29669494c2f551f1a03bcd64cf74337b3c3409a1a0d5071d672233e58925b1d9cafc05165d13b1f4f7b942523bf16237aee291663a2e023dbd7ea153045 *eos-voter-0.1.6-mac.zip

shasum -b -a 512 eos-voter-0.1.6-x86_64.AppImage
a2179b9f9ce2f2e3e9dd4c353541eb7b19c52accf87086293ae198203130fff3a5d9d534cf30536ec631562a21a39fe7bd2021599f29402184608d49e4fc1be2 *eos-voter-0.1.6-x86_64.AppImage

shasum -b -a 512 eos-voter_0.1.6_amd64.deb
90b07efe663801c8cac0e4514b770134a67af41af3c07cf43295b806d388db1b620a3f2058e8b995f95cfa76f0eff539c8d3cdef964cfd0456e72fcc3c515473 *eos-voter_0.1.6_amd64.deb

shasum -b -a 512 eos-voter_0.1.6_amd64.snap
a18899000dfff5eee61dce6f6b6e799b028ecc5fc1ff6edbaf67b5dc2e08409500e1563df0aa5743d42adebfc69de59dae569802c80294424c2208bfe8d34c0f *eos-voter_0.1.6_amd64.snap
```
