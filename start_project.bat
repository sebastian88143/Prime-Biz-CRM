@echo off
echo Starting the project...

:: Running the backend in a new console window
start cmd /k "cd backend && call venv\Scripts\activate && python prime_biz_crm_backend\manage.py runserver"

:: Running frontend in new console window
start cmd /k "cd frontend\prime-biz-crm && npm run dev"

echo Servers up and running!
pause
