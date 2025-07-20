# Gramasewaka Village Management System

## How to Migrate and Connect to SQL Server 2008 (Windows Offline)

### 1. Export MySQL Database Schema and Data
- Use phpMyAdmin or MySQL Workbench to export your `gramasewaka_db` database as an SQL file (you already have `gramasewaka_db.sql`).

### 2. Prepare SQL Server 2008
- Install SQL Server 2008 and SQL Server Management Studio (SSMS) on your Windows PC.
- Create a new database named `gramasewaka_db` in SQL Server 2008.

### 3. Convert and Import Schema/Data
- Open your exported `gramasewaka_db.sql` file.
- Manually edit the SQL file to:
  - Replace MySQL-specific types (e.g., `varchar`, `text`, `enum`, `tinyint(1)`, `AUTO_INCREMENT`, `ENGINE=InnoDB`, etc.) with SQL Server equivalents (e.g., `nvarchar`, `int`, `IDENTITY(1,1)`, `CONSTRAINT`, etc.).
  - Remove MySQL-specific commands (e.g., `SET SQL_MODE`, `/*!40101 ... */` comments).
  - Convert `enum` to `nvarchar` or use a lookup table.
- In SSMS, run the modified SQL to create tables and import data.
- Alternatively, use a migration tool (like MySQL to MSSQL migration wizard) to automate this step.

### 4. Install SQLSRV PHP Extension
- Download the Microsoft Drivers for PHP for SQL Server (SQLSRV and PDO_SQLSRV) matching your PHP version and architecture from https://docs.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server.
- Copy `php_sqlsrv.dll` and/or `php_pdo_sqlsrv.dll` to your PHP `ext` directory.
- Edit your `php.ini` and add:
  ```
  extension=php_sqlsrv.dll
  extension=php_pdo_sqlsrv.dll
  ```
- Restart Apache or your web server.

### 5. Update PHP Connection Code
- In `php/db.php`, replace the MySQLi connection with SQLSRV:
  ```php
  <?php
  require_once 'cors.php';
  $serverName = "localhost\\SQLEXPRESS"; // Or your instance name
  $connectionOptions = [
      "Database" => "gramasewaka_db",
      "Uid" => "your_sql_username",
      "PWD" => "your_sql_password"
  ];
  $conn = sqlsrv_connect($serverName, $connectionOptions);
  if ($conn === false) {
      die(json_encode(['error' => sqlsrv_errors()]));
  }
  ?>
  ```
- Update all PHP scripts to use `sqlsrv_query`, `sqlsrv_prepare`, `sqlsrv_fetch_array`, etc., instead of MySQLi functions.

### 6. Update All PHP Queries
- Change all MySQLi query/prepare/execute/fetch code to use SQLSRV equivalents.
- Example:
  ```php
  $sql = "SELECT * FROM users WHERE username = ?";
  $params = array($username);
  $stmt = sqlsrv_query($conn, $sql, $params);
  $user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
  ```

### 7. Test the Application
- Open your application in the browser and test all CRUD operations.
- Check for any SQL errors and fix queries as needed.

### 8. Security Note
- Always use parameterized queries to prevent SQL injection.
- Make sure passwords are hashed using `password_hash` and `password_verify` (or equivalent in SQL Server).

---

## Summary
- Export and convert your MySQL database to SQL Server format.
- Install and enable the SQLSRV PHP extension.
- Update all PHP code to use SQLSRV functions.
- Test thoroughly.

If you need sample code for any step, or a conversion example for a specific table or query, let me know!
