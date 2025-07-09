<?php
require_once 'db.php';
session_start();
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user'] = [
        'id' => $user['user_id'],
        'username' => $user['username'],
        'role' => $user['role']
    ];
    echo json_encode(['success' => true, 'role' => $user['role']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>
