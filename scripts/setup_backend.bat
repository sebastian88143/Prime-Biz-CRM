@echo off
echo Setting up backend environment...

:: Creating and activating a virtual environment
python -m venv backend\venv
call backend\venv\Scripts\activate

:: Dependency installation
pip install -r backend\requirements.txt

echo Backend setup complete!
