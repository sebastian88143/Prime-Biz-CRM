@echo off
echo Setting up database...

:: Creating a database
call scripts\create_db.bat

:: Activation of the virtual environment
call backend\venv\Scripts\activate

:: Performing the migration
cd backend\prime_biz_crm_backend
call python manage.py migrate

:: Data Initialization
call python seed_data.py
cd ..\..

:: Deactivation of the virtual environment
call backend\venv\Scripts\deactivate

echo Database setup complete!
