<?php
require_once '../config/db.php';

$conn = getDbConnection();

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(['message' => 'Erreur de connexion à la BD']));
}

// Lecture des données JSON envoyées par le front-end
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['fields'])) {
    $fields = json_encode($data['fields']);
    $sql = "INSERT INTO forms (fields) VALUES ('$fields')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Formulaire sauvegardé avec succès !']);
    } else {
        echo json_encode(['message' => 'Erreur lors de la sauvegarde : ' . $conn->error]);
    }
} else {
    echo json_encode(['message' => 'Données invalides']);
}

$conn->close();
?>
