<?php
require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM individuals");
        $rows = [];
        while ($row = $result->fetch_assoc()) $rows[] = $row;
        echo json_encode($rows);
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $land_id = isset($data['land_id']) && trim($data['land_id']) !== '' ? trim($data['land_id']) : null;
        if ($land_id) {
            $stmt = $conn->prepare("SELECT land_id FROM land_records WHERE land_id=?");
            $stmt->bind_param("s", $land_id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows === 0) {
                $land_id = null;
            }
            $stmt->close();
        } else {
            $land_id = null;
        }
        $stmt = $conn->prepare("INSERT INTO individuals (nic, full_name, short_name, gender, address, mobile, birthdate, job, married, image_url, qualifications, land_id, documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssssss",
            $data['nic'], $data['full_name'], $data['short_name'], $data['gender'], $data['address'], $data['mobile'], $data['birthdate'], $data['job'], $data['married'], $data['image_url'], $data['qualifications'], $land_id, $data['documents']
        );
        $ok = $stmt->execute();
        // Auto-add to household_members if house_number is provided and exists
        if ($ok && !empty($data['house_number'])) {
            $house_number = trim($data['house_number']);
            $check = $conn->prepare("SELECT house_number FROM households WHERE house_number=?");
            $check->bind_param("s", $house_number);
            $check->execute();
            $check->store_result();
            if ($check->num_rows > 0) {
                $ins = $conn->prepare("INSERT INTO household_members (nic, house_number) VALUES (?, ?)");
                $ins->bind_param("ss", $data['nic'], $house_number);
                $ins->execute();
                $ins->close();
            }
            $check->close();
        }
        echo json_encode(['success' => $ok, 'message' => $ok ? '' : $stmt->error]);
        break;
}
