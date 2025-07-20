<?php
require_once 'cors.php';
$serverName = "localhost\\SQLEXPRESS"; // Or your SQL Server instance name
$connectionOptions = [
    "Database" => "gramasewaka_db",
    "Uid" => "your_sql_username", // <-- set your SQL Server username
    "PWD" => "your_sql_password"  // <-- set your SQL Server password
];
$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn === false) {
    http_response_code(500);
    die(json_encode(['error' => sqlsrv_errors()]));
}
