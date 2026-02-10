@echo off
echo ========================================
echo Update API IP Address Tool
echo ========================================
echo.
echo Current IP configuration:
type "VisitorApp\src\config\api.js" | findstr "API_BASE_URL"
echo.
echo To update your IP address:
echo 1. Run 'ipconfig' in terminal
echo 2. Find "IPv4 Address" under "Wireless LAN adapter Wi-Fi"
echo 3. Copy that IP address
echo 4. Update the API_BASE_URL in VisitorApp\src\config\api.js
echo.
echo Press any key to open ipconfig...
pause > nul
ipconfig
echo.
echo Press any key to open the API config file...
pause > nul
notepad "VisitorApp\src\config\api.js"
