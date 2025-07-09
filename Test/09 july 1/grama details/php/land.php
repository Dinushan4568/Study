<?php
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO land_records (land_id, size, location, usage_type, owner_nic) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sdsss", $data['land_id'], $data['size'], $data['location'], $data['usage_type'], $data['owner_nic']);
        $ok = $stmt->execute();
        echo json_encode(['success' => $ok, 'message' => $ok ? '' : $stmt->error]);
        break;
    case 'GET':
        $result = $conn->query("SELECT * FROM land_records");
        $rows = [];
        while ($row = $result->fetch_assoc()) { $rows[] = $row; }
        echo json_encode($rows);
        break;
}
