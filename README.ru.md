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

Текущая версия 0.2.0:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter-setup-0.2.0.exe) 
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter-0.2.0.dmg) 
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter_0.2.0_amd64.deb) 
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.2.0/eos-voter_0.2.0_amd64.snap)

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
shasum -b -a 512 eos-voter\ Setup\ 0.2.0.exe 
9799e0fb5398bc4f8ec59a37f08122fd3ba2053066ef7616df85fceaed146c46fc996cfd83b5f13fd5e9f02ade3955f4b773c02cb04cb5a5b19244b91c6ac39c *eos-voter Setup 0.2.0.exe 

shasum -b -a 512 eos-voter-0.2.0.dmg 
3fcaaa9d42d62e34b044ddc40e0ea3183e8c62bc86cc852668e5924139f1cd4afe62cc6a82e5795d355b417245cad39e606067923feded512cb469bba2f748a1 *eos-voter-0.2.0.dmg 

shasum -b -a 512 eos-voter-0.2.0-mac.zip 
b06f9e9e9ff07cd1cd1d358004d4f6044fe5e29e07bf3466684d468542effd235ce13478c2a5a20b10b521fa46d9db550192a26e2bc7f01223e159161c0922df *eos-voter-0.2.0-mac.zip 

shasum -b -a 512 eos-voter-0.2.0-x86_64.AppImage 
742772b314108fa0f1b34aa825c9599859a5092de8a777db88e24dfec09c0dc78676a58482ed461d70bda7a9e30e371160d47632c3cfe4f55572d149ba7131db *eos-voter-0.2.0-x86_64.AppImage 

shasum -b -a 512 eos-voter_0.2.0_amd64.deb 
6237698738e364aa67820cfcbb3fd7d3e76eff42e5ccc12e7d3e9f9c46cb3d7331be9b2496d8bb2bc04a46466bc25fc68b27699c7ee8f9dd2865ca0b60075fce *eos-voter_0.2.0_amd64.deb 

shasum -b -a 512 eos-voter_0.2.0_amd64.snap 
fa9c1ab3eb9cf46c76ced8944c340f2e8f640a87da8117eaf9c85bff02e0d0c4093bd22fc52ab74494f48429d73a857b0a922e4ec40189706268aabe985e06a1 *eos-voter_0.2.0_amd64.snap 
```
