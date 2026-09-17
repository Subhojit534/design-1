@echo off
title 3D Interior - Vite + Ngrok Tunnel Runner
echo ========================================================
echo   Starting Vite Dev Server (port 3000) & Ngrok Tunnel
echo ========================================================
start "Vite Server" cmd /k "npm run dev"
echo Waiting for Vite to initialize...
timeout /t 3 /nobreak >nul
start "Ngrok Tunnel" cmd /k "npm run tunnel"
echo.
echo Both Vite and Ngrok are running in separate windows.
echo You can check tunnels at: http://127.0.0.1:4040
pause
