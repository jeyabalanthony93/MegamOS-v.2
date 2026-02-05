@echo off
REM MegamOS v2.0 - Windows Setup Script

echo ================================
echo MegamOS v2.0 - Windows Setup
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker is installed
echo.

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker Compose is not available
    echo Please make sure Docker Desktop is installed and running
    pause
    exit /b 1
)

echo [OK] Docker Compose is available
echo.

REM Check for .env file
if not exist "backend\.env" (
    echo Creating .env file from template...
    copy "backend\.env.example" "backend\.env"
    echo.
    echo IMPORTANT: Edit backend\.env and add your GEMINI_API_KEY
    echo You can get an API key from: https://ai.google.dev
    echo.
    pause
)

echo.
echo Starting services...
echo (First run may take a few minutes)
echo.

REM Start services
docker-compose up -d

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.

timeout /t 10 /nobreak

REM Test API
echo Testing API...
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo NOTE: API might still be starting
    echo Check logs with: docker-compose logs -f backend
) else (
    echo [OK] API is running
)

echo.
echo Access your OS:
echo   Frontend: http://localhost
echo   API Docs: http://localhost:8000/api/docs
echo.

echo Useful commands:
echo   View logs:    docker-compose logs -f backend
echo   Stop:         docker-compose down
echo   Restart:      docker-compose restart
echo.

echo For detailed information, read:
echo   - QUICKSTART.md
echo   - DEPLOYMENT.md
echo   - API_DOCUMENTATION.md
echo.

echo Happy hosting! [Ctrl+C to exit]
pause
