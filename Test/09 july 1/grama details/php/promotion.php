<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$new_role = $data['new_role'] ?? null;
if ($user_id && in_array($new_role, ['admin','gramasewaka','data_adder'])) {
    $stmt = $conn->prepare("UPDATE users SET role=? WHERE user_id=?");
    $stmt->bind_param("si", $new_role, $user_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Update failed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
