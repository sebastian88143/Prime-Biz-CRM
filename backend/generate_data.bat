@echo off

:: Database access settings
set DB_NAME=prime_biz_crm_db
set DB_USER=django_user
set DB_PASSWORD=primebizcrm123!
set DB_HOST=localhost

:: Running SQL script
mysql -u%DB_USER% -p%DB_PASSWORD% -h%DB_HOST% -D%DB_NAME% < seed_data.sql

echo Data inserted successfully into database!