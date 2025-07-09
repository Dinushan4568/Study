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
        $stmt = $conn->prepare("INSERT INTO individuals (nic, full_name, short_name, gender, address, mobile, birthdate, job, married, image_url, qualifications, land_id, documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssssss",
            $data['nic'], $data['full_name'], $data['short_name'], $data['gender'], $data['address'], $data['mobile'], $data['birthdate'], $data['job'], $data['married'], $data['image_url'], $data['qualifications'], $data['land_id'], $data['documents']
        );
        $ok = $stmt->execute();
        echo json_encode(['success' => $ok, 'message' => $ok ? '' : $stmt->error]);
        break;
}
?>
