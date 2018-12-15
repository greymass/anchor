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

Текущая версия 0.6.4:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.4/win-eos-voter-0.6.4.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.4/mac-eos-voter-0.6.4.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.4/linux-eos-voter-0.6.4-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.6.4-amd64.deb
feab3703416f6328d809d89e4f62388d407fbaaa975d5103890487d7b11627f901c6878fc7158bac0868d83e6973c90092352c61a834bbb7cd68968191e373e8 *linux-eos-voter-0.6.4-amd64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-arm64.deb
5e68149c7d1b762bf661ac887a99190d6b9d16731b01a43f4130eb18513a00671557a0796739d0cac2fb42f5749957c4c68d0bb9f700f357ae22fe7aab714d3f *linux-eos-voter-0.6.4-arm64.deb
shasum -b -a 512 linux-eos-voter-0.6.4-armv7l.deb
b208e4a84dd8657a26460a9cea07d5801a55f45caa1a3b47300cd00d562e0940cb704c69186cf564b099070731e033d2e7d295fa887071e4c63810862e216d2e *linux-eos-voter-0.6.4-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.6.4-x86_64.AppImage
2824c3de0db9cea23b4c02245364c8c9c13e214a5bbb84cb8ac7be3da6cf3839587a9a0114fcda7b84daaccdee0898f8305737c725e8017170a6098c66f2ccda *linux-eos-voter-0.6.4-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.6.4.dmg
cd16515e50e75513905bab6618f85216f6318ecd697d96771515d88039fa84a80ddbedd55183b69d22abfc56fbc7158e7dfad105ac067c552eaa7a7bed83ae6f *mac-eos-voter-0.6.4.dmg
shasum -b -a 512 mac-eos-voter-0.6.4.zip
29e5721b1400f4895e441ee424490142bc0c5bf6c8629f0a05d649e9d0e5db0254e6fe3ce6a15a341b565a59097c124e7e037564331a5b8b43cf695dc35b229c *mac-eos-voter-0.6.4.zip
shasum -b -a 512 win-eos-voter-0.6.4.exe
1d23b03369d6e7980b7fb35a066930e238098303c0fa45df58868aab0bbb9bc0513a84118e7febc5d163d466cedb992f8fe1d015648f1cfde63258123be3e0f7 *win-eos-voter-0.6.4.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.80
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJcFFXEAAoJECyLxnO05hN9EJUP/iOwpyf7yQIbZCNPi2t+YphX
tELmQpGWVCtaBsh8oKnQHd3SmTVIIaJAwY6GgDdHMcOaZcsWySkbJIyB+K+tnkQw
s/S+43Bo5wwGS6vFN5ibpd+dWywpsKTIZxz6HT/Q5+f2VyK+m4fcPF0aSrv0WkVI
kX7VcojR937RCqszJ/uxiiW1PL8GW+JYk7ikkkHoNbVTeyzuJsjK7Kb12W0XSg9U
LFstt69ZVpK7bgGXh8/s3V2wgz2xS4RfHZT2MkUZ8S9zM9AlQK1gAQixHdX2Blvp
UyRmEuLAxZT6uU6L+MZCJQgfNgTnQNtlxgx9NBTsXS/Rnp90jmasulvYdwjFcWqL
CLQ3SfzGjEYHonnUnwIGN4L04sYYLVP3YoJQlDVMT+tIwDHMfSWx5ch/5C4DgSQB
6v//kFeZY1gA9Znrvi7+TApfWroKbSITKoTIRSnU9lRRInq4HA/oDuwPzrbytzGD
hrrh5gi/VJQ5jfhnCjlnAkVCA7fIuqLGc20szlngOIE+PQM/CzN7PWQaxnV0wIk/
nYVFZ/T4tK1gMjmLPTF+4WZbOjAgt6MDrnoUuNwv6bx1LnZiBkPPkSnall9oB1oq
Pnemf79YQjwTwovHq94cZtvJryqnG2REA7a71K+KR05pZW2f5+nVAEecaOZJaSiK
aY9fCRXwjVencsfKq9nN
=CLtH
-----END PGP SIGNATURE-----
```
