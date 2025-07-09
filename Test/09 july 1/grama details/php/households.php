<?php
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO households (house_number, family_name, address) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data['house_number'], $data['family_name'], $data['address']);
        $ok = $stmt->execute();
        echo json_encode(['success' => $ok, 'message' => $ok ? '' : $stmt->error]);
        break;
}
?>
