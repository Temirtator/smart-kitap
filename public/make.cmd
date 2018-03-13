cls
::@echo off

taskkill /f /t /im  nw.exe
taskkill /f /t /im  SmartKitap.exe

winrar a -afzip -m1 SmartKitap.nw .\assets replaceAndStartApp.bat step1.bat .\image updater.js .\static favicon.ico index.html manifest.json ..\package.json
copy /b nw.exe+SmartKitap.nw SmartKitap.exe
DEL SmartKitap.nw
cls
echo Build compelate
MOVE  SmartKitap.exe ../../nw_0.0.29_sdk/
cd ../../nw_0.0.29_sdk
start SmartKitap.exe
::winrar a -afzip -m1 C:\another_projects\v2_build\SmartKitap.nw @filelist.txt

