<?php
require_once '../config/db.php';

$conn = getDbConnection();

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(['message' => 'Erreur de connexion à la BD']));
}

// Récupération des formulaires
header('Content-Type: application/json');
$sql = "SELECT id, fields, created_at FROM forms ORDER BY created_at DESC";
$result = $conn->query($sql);

$forms = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $forms[] = $row;
    }
}

echo json_encode(['forms' => $forms, JSON_PRETTY_PRINT]);

$conn->close();
?>
