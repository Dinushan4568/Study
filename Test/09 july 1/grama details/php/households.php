<?php
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO households (house_number, family_name, address) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data['house_number'], $data['family_name'], $data['address']);
        $ok = $stmt->execute();
        $msg = $ok ? '' : $stmt->error;
        if ($ok && !empty($data['members_nics']) && is_array($data['members_nics'])) {
            foreach ($data['members_nics'] as $nic) {
                // Only add if NIC exists in individuals
                $check = $conn->prepare("SELECT nic FROM individuals WHERE nic=?");
                $check->bind_param("s", $nic);
                $check->execute();
                $check->store_result();
                if ($check->num_rows > 0) {
                    $ins = $conn->prepare("INSERT INTO household_members (nic, house_number) VALUES (?, ?)");
                    $ins->bind_param("ss", $nic, $data['house_number']);
                    $ins->execute();
                    $ins->close();
                }
                $check->close();
            }
        }
        echo json_encode(['success' => $ok, 'message' => $msg]);
        break;
}
