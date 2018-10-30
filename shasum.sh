#!/bin/bash

cd release

echo "shasum -b -a 512 linux-Sqrl-0.5.3-amd64.deb"
shasum -b -a 512 linux-Sqrl-0.5.3-amd64.deb
echo "shasum -b -a 512 linux-Sqrl-0.5.3-amd64.snap"
shasum -b -a 512 linux-Sqrl-0.5.3-amd64.snap
echo "shasum -b -a 512 linux-Sqrl-0.5.3-arm64.deb"
shasum -b -a 512 linux-Sqrl-0.5.3-arm64.deb
echo "shasum -b -a 512 linux-Sqrl-0.5.3-armv7l.deb"
shasum -b -a 512 linux-Sqrl-0.5.3-armv7l.deb
echo "shasum -b -a 512 linux-Sqrl-0.5.3-i386.deb"
shasum -b -a 512 linux-Sqrl-0.5.3-i386.deb
echo "shasum -b -a 512 linux-Sqrl-0.5.3-x86_64.AppImage"
shasum -b -a 512 linux-Sqrl-0.5.3-x86_64.AppImage
echo "shasum -b -a 512 mac-Sqrl-0.5.3.dmg"
shasum -b -a 512 mac-Sqrl-0.5.3.dmg
echo "shasum -b -a 512 mac-Sqrl-0.5.3.zip"
shasum -b -a 512 mac-Sqrl-0.5.3.zip
echo "shasum -b -a 512 win-Sqrl-0.5.3.exe"
shasum -b -a 512 win-Sqrl-0.5.3.exe

cd ..
