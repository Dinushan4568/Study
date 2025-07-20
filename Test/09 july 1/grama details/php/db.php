<?php
require_once 'cors.php';
$host = 'localhost';
$db = 'gramasewaka_db';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed']));
}
?>
