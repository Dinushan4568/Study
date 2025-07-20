<?php
require_once 'db.php';
$result = $conn->query("SELECT user_id, username, role FROM users");
$rows = [];
while ($row = $result->fetch_assoc()) $rows[] = $row;
echo json_encode($rows);
?>
