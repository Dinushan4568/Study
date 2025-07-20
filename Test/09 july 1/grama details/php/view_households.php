<?php
require_once 'db.php';
$rows = [];
$sql = "SELECT h.house_number, h.family_name, h.address, GROUP_CONCAT(hm.nic) as members
        FROM households h
        LEFT JOIN household_members hm ON h.house_number = hm.house_number
        GROUP BY h.house_number, h.family_name, h.address";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $row['members'] = $row['members'] ? explode(',', $row['members']) : [];
    $rows[] = $row;
}
echo json_encode($rows);
