#!/bin/bash

cd release

echo "shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb"
shasum -b -a 512 linux-eos-voter-0.7.11-amd64.deb
# echo "shasum -b -a 512 linux-eos-voter-0.7.11-amd64.snap"
# shasum -b -a 512 linux-eos-voter-0.7.11-amd64.snap
echo "shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb"
shasum -b -a 512 linux-eos-voter-0.7.11-arm64.deb
echo "shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb"
shasum -b -a 512 linux-eos-voter-0.7.11-armv7l.deb
# echo "shasum -b -a 512 linux-eos-voter-0.7.11-i386.deb"
# shasum -b -a 512 linux-eos-voter-0.7.11-i386.deb
echo "shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage"
shasum -b -a 512 linux-eos-voter-0.7.11-x86_64.AppImage
echo "shasum -b -a 512 mac-eos-voter-0.7.11.dmg"
shasum -b -a 512 mac-eos-voter-0.7.11.dmg
echo "shasum -b -a 512 mac-eos-voter-0.7.11.zip"
shasum -b -a 512 mac-eos-voter-0.7.11.zip
echo "shasum -b -a 512 win-eos-voter-0.7.11.exe"
shasum -b -a 512 win-eos-voter-0.7.11.exe

cd ..
