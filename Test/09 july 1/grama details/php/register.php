<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';
$email = trim($data['email'] ?? null);
$nic = trim($data['nic'] ?? null);
if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
    exit;
}
// Check if username exists
$stmt = $conn->prepare("SELECT user_id FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username already exists']);
    exit;
}
$stmt->close();
// Check if NIC exists in individuals, else set to NULL
if ($nic) {
    $stmt = $conn->prepare("SELECT nic FROM individuals WHERE nic=?");
    $stmt->bind_param("s", $nic);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows === 0) {
        $nic = null;
    }
    $stmt->close();
} else {
    $nic = null;
}
$hash = password_hash($password, PASSWORD_DEFAULT);
$role = 'data_adder';
$stmt = $conn->prepare("INSERT INTO users (username, password, role, nic, email) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $hash, $role, $nic, $email);
$ok = $stmt->execute();
if ($ok) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
