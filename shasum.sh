#!/bin/bash

cd release

echo "shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb"
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.deb
echo "shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap"
shasum -b -a 512 linux-eos-voter-0.5.0-amd64.snap
echo "shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb"
shasum -b -a 512 linux-eos-voter-0.5.0-arm64.deb
echo "shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb"
shasum -b -a 512 linux-eos-voter-0.5.0-armv7l.deb
echo "shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb"
shasum -b -a 512 linux-eos-voter-0.5.0-i386.deb
echo "shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage"
shasum -b -a 512 linux-eos-voter-0.5.0-x86_64.AppImage
echo "shasum -b -a 512 mac-eos-voter-0.5.0.dmg"
shasum -b -a 512 mac-eos-voter-0.5.0.dmg
echo "shasum -b -a 512 mac-eos-voter-0.5.0.zip"
shasum -b -a 512 mac-eos-voter-0.5.0.zip
echo "shasum -b -a 512 win-eos-voter-0.5.0.exe"
shasum -b -a 512 win-eos-voter-0.5.0.exe

cd ..
