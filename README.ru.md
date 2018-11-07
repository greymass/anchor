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

Текущая версия 0.6.1:

- [Windows Installer](https://github.com/greymass/eos-voter/releases/download/v0.6.1/win-eos-voter-0.6.1.exe)
- [macOS Package](https://github.com/greymass/eos-voter/releases/download/v0.6.1/mac-eos-voter-0.6.1.dmg)
- [Linux (deb)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.deb)
- [Linux (snap)](https://github.com/greymass/eos-voter/releases/download/v0.6.1/linux-eos-voter-0.6.1-amd64.snap)

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

shasum -b -a 512 linux-eos-voter-0.5.3-amd64.deb
e55fc9fb53d0e8bd25f4e972a5fd8563086af50b6d6386b6597e9fbf39bfa7704d43f1778f236fe5e56b548eb7ce8a01ebd16884e787d68661475057636ec55e *linux-eos-voter-0.5.3-amd64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-amd64.snap
02ba35cd83b00d13f3417c2ec7e4de1beae4f12f86cf156131683a067faa44b54c859e76f8aa6d57c245fc1d21437e347c1e1be077d2a319329967a67db23b30 *linux-eos-voter-0.5.3-amd64.snap
shasum -b -a 512 linux-eos-voter-0.5.3-arm64.deb
bfe806be8914feee01c319d107249f02f755e93b5ae270ed32ef25ae69d48bfb04379d65329ac5209baf2ff082c98c17de668d7f735826fdd6177550d50b4431 *linux-eos-voter-0.5.3-arm64.deb
shasum -b -a 512 linux-eos-voter-0.5.3-armv7l.deb
fe3ee24882e1ceb68e44536785d6d2cf1b2290a20bf1d721ffa3e36de46e7bae89de43e3bc29b2762b81abc1d1a0b68d0f494d6532305aa9433aebbadfaddba9 *linux-eos-voter-0.5.3-armv7l.deb
shasum -b -a 512 linux-eos-voter-0.5.3-i386.deb
7feffaeb0b6c1439b6be3a3ca6589eecf318cde40d1ac6bf16dbaefa52ef3b45b3a46ed1f5e0274922c119e32915855b533f85a71ca03474a826030269a44108 *linux-eos-voter-0.5.3-i386.deb
shasum -b -a 512 linux-eos-voter-0.5.3-x86_64.AppImage
8a73895f0709880de8b9b61693a28ed9813978001b6be7a63e599f52c091003f5bda7c7c69191270e4f25c2ec4b3d2cc22d49b777d206353bd4095b505b32bb6 *linux-eos-voter-0.5.3-x86_64.AppImage
shasum -b -a 512 mac-eos-voter-0.5.3.dmg
272104b0bd785137c399426dae6d3a555501f7fdcd2625114522d1230346639467e6ca803207f7af976a32a4d66277d202528eb1329a31a877b1dc79dac45eda *mac-eos-voter-0.5.3.dmg
shasum -b -a 512 mac-eos-voter-0.5.3.zip
1f8a6d4c294b29a291427a71939e6d31ee5474927f644776a008af806e1a2221c98ca97fba924a6b6c6d1bdc9290a56011a6cc00ea23d9c8ff5557319bd67584 *mac-eos-voter-0.5.3.zip
shasum -b -a 512 win-eos-voter-0.5.3.exe
83cbbd44bd5bc54f41b12b2ac2948fdbf21d0932cb4e845e6d3ff5adc02fb1e039763b3a3a08e9cdf556c8e234af492bc9178897699b6012017200c798fc2e98 *win-eos-voter-0.5.3.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovsMAAoJECyLxnO05hN9BVwP/AxPWZjzf6cMz+ryLAf7G98A
9kTnXYmI0I41+hrFaS+icPQokrAPadVLixq4vlzVV9/I4NDYM5AJr1rpx6ERGg2E
eBUMhXu49WXdSjjocfWSqCBO86ZABUai++J4Lv/AKe58xTvyoId5MxyI7azmKY7A
RT7myUCSGRqIX50bpkMa+1DbfZ8TpnymUnOqqpRjVi15RJ8DQUpDGQEK/Et2MIse
8VlqYJ3A3cbZvyaZEQBMa8EhA09AzFopFSCu2CBuTLx3/eGUtkW8/r9eenWWiZUb
/H+ktu1A95ejBENVFwTIHoOCEdgyh7Ipy0PqZqJegAfbPAO0wLda+0F4eePUqm6/
5PE72dy92zh5DPzVpTgEvfcbJIG+V0SLtlWnchaob2nA4TSaJMWMKuA55aM5OVAy
YBEePBzZzn8MDQ7G2aig7lUweE48aJk/h+y90yW0eA58XEhwrhXzsE1+QHY6pnSz
Da2Zt2eD1paB87Sj0o86vmVFdT1FJHMdsIP62S2TEkNT0QyIMOVPR3AO/51dUi2h
nohLutKJqIHWo1klLRWQ7ywfU5uA4OZT27iuTvXNs5s9fh1aN2nZ8/pwI7kTxFt0
8d9YMayUcjspE5BXdLKBu1eMmOHqiyF76yRtvoezXwv8EuSN15S0tMEv78LDR4N8
Nje+JUP0wUL0+9Vnm27v
=HGmk
-----END PGP SIGNATURE-----
```
