@echo off

:: Activate the virtual environment
call venv\Scripts\activate

:: Run the Python script
python prime_biz_crm_backend\seed_data.py

:: Deactivate the virtual environment
deactivate