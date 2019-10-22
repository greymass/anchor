#!/bin/bash

cd release

echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-amd64.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-amd64.deb
# echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-amd64.snap"
# shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-amd64.snap
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-arm64.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-arm64.deb
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-armv7l.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-armv7l.deb
# echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-i386.deb"
# shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-i386.deb
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-x86_64.AppImage"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc1-x86_64.AppImage
echo "shasum -b -a 512 mac-anchor-beta-1.0.0-rc1.dmg"
shasum -b -a 512 mac-anchor-beta-1.0.0-rc1.dmg
echo "shasum -b -a 512 mac-anchor-beta-1.0.0-rc1.zip"
shasum -b -a 512 mac-anchor-beta-1.0.0-rc1.zip
echo "shasum -b -a 512 win-anchor-beta-1.0.0-rc1.exe"
shasum -b -a 512 win-anchor-beta-1.0.0-rc1.exe

cd ..
