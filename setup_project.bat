@echo off
echo Starting project setup...

:: Installing frontend packages
call scripts\install_frontend.bat

:: Backend configuration
call scripts\setup_backend.bat

:: Database creation and migration
call scripts\migrate_db.bat

echo Project is ready!
pause