@echo off
echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing dependencies from requirements.txt...
pip install -r requirements.txt

echo Installation complete!