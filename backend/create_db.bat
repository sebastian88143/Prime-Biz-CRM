@echo off
SET MYSQL_USER=root
SET MYSQL_PASSWORD=root123!
SET DB_NAME=prime_biz_crm_db
SET DB_USER=django_user
SET DB_PASSWORD=primebizcrm123!

echo Creating MySQL database and user...

REM Create temporary SQL file
echo CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; > temp.sql
echo CREATE USER IF NOT EXISTS '%DB_USER%'@'localhost' IDENTIFIED BY '%DB_PASSWORD%'; >> temp.sql
echo GRANT ALL PRIVILEGES ON %DB_NAME%.* TO '%DB_USER%'@'localhost'; >> temp.sql
echo FLUSH PRIVILEGES; >> temp.sql

REM Run MySQL and execute query from file
mysql -u%MYSQL_USER% -p%MYSQL_PASSWORD% < temp.sql

REM Delete temporary file
del temp.sql

echo Database and user created successfully!