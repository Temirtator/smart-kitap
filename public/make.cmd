cls
::@echo off

taskkill /f /t /im  nw.exe
taskkill /f /t /im  StartKitap.exe

winrar a -afzip -m1 StartKitap.nw .\assets .\image .\static favicon.ico index.html manifest.json package.json
copy /b nw.exe+StartKitap.nw StartKitap.exe
DEL StartKitap.nw
cls
echo Build compelate
MOVE  StartKitap.exe ../../v2_sdk_build_64bit/
cd ../../nw_0.0.29_sdk
start StartKitap.exe
::winrar a -afzip -m1 C:\another_projects\v2_build\StartKitap.nw @filelist.txt

