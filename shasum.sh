#!/bin/bash

cd release

echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-amd64.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-amd64.deb
# echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-amd64.snap"
# shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-amd64.snap
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-arm64.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-arm64.deb
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-armv7l.deb"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-armv7l.deb
# echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-i386.deb"
# shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-i386.deb
echo "shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-x86_64.AppImage"
shasum -b -a 512 linux-anchor-beta-1.0.0-rc3-x86_64.AppImage
echo "shasum -b -a 512 mac-anchor-beta-1.0.0-rc3.dmg"
shasum -b -a 512 mac-anchor-beta-1.0.0-rc3.dmg
echo "shasum -b -a 512 mac-anchor-beta-1.0.0-rc3.zip"
shasum -b -a 512 mac-anchor-beta-1.0.0-rc3.zip
echo "shasum -b -a 512 win-anchor-beta-1.0.0-rc3.exe"
shasum -b -a 512 win-anchor-beta-1.0.0-rc3.exe

cd ..
