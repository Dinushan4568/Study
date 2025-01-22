<?php
// db.php
$host = 'localhost';
$user = 'root';
$password = ''; // Default password for XAMPP
$dbname = 'village_management';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch all people based on Home ID or NIC
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = $_GET['search'] ?? '';

    if (!empty($search)) {
        $stmt = $conn->prepare("SELECT * FROM people WHERE home_id = ? OR nic = ?");
        $stmt->bind_param("ss", $search, $search);
        $stmt->execute();
        $result = $stmt->get_result();
        $people = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($people);
    } else {
        echo json_encode([]);
    }
}

// Function to add or update person details
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $home_id = $data['homeId'] ?? '';
    $name = $data['name'] ?? '';
    $nic = $data['nic'] ?? '';
    $address = $data['address'] ?? '';
    $job = $data['job'] ?? '';
    $age = $data['age'] ?? null;
    $dob = $data['dob'] ?? null;
    $marital_status = $data['maritalStatus'] ?? '';
    $education = $data['education'] ?? '';
    $grounds = $data['grounds'] ?? '';
    $skills = $data['skills'] ?? '';
    $other = $data['other'] ?? '';

    $stmt = $conn->prepare("INSERT INTO people (home_id, name, nic, address, job, age, dob, marital_status, education, grounds, skills, other) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), address = VALUES(address), job = VALUES(job), age = VALUES(age), dob = VALUES(dob), marital_status = VALUES(marital_status), education = VALUES(education), grounds = VALUES(grounds), skills = VALUES(skills), other = VALUES(other)");
    $stmt->bind_param("ssssssssssss", $home_id, $name, $nic, $address, $job, $age, $dob, $marital_status, $education, $grounds, $skills, $other);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Person added/updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add/update person"]);
    }
}
?>
