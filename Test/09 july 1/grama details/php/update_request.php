<?php
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO update_requests (requested_by, target_nic, field_to_update, old_value, new_value) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issss", $data['requested_by'], $data['target_nic'], $data['field_to_update'], $data['old_value'], $data['new_value']);
        $ok = $stmt->execute();
        echo json_encode(['success' => $ok, 'message' => $ok ? '' : $stmt->error]);
        break;
}
?>
