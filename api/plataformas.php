<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

// ✅ LISTAR PLATAFORMAS
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT * FROM PLATAFORMAS_PUBLICITARIAS ORDER BY pla_id DESC";
    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $plataformas = [];
    while ($row = $result->fetch_assoc()) {
        $plataformas[] = $row;
    }

    echo json_encode($plataformas);
    exit;
}

// ✅ INSERTAR PLATAFORMA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $d = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO PLATAFORMAS_PUBLICITARIAS (
        pla_nombre, pla_descripcion, pla_tipo, pla_icono_url, pla_api_disponible, pla_estado
    ) VALUES (
        '{$d['pla_nombre']}',
        '{$d['pla_descripcion']}',
        '{$d['pla_tipo']}',
        ".(!empty($d['pla_icono_url']) ? "'{$d['pla_icono_url']}'" : "NULL").",
        '{$d['pla_api_disponible']}',
        '{$d['pla_estado']}'
    )";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Plataforma creada correctamente"
    ]);
    exit;
}

// ✅ ACTUALIZAR PLATAFORMA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $d = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE PLATAFORMAS_PUBLICITARIAS SET
        pla_nombre = '{$d['pla_nombre']}',
        pla_descripcion = '{$d['pla_descripcion']}',
        pla_tipo = '{$d['pla_tipo']}',
        pla_icono_url = ".(!empty($d['pla_icono_url']) ? "'{$d['pla_icono_url']}'" : "NULL").",
        pla_api_disponible = '{$d['pla_api_disponible']}',
        pla_estado = '{$d['pla_estado']}'
    WHERE pla_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Plataforma actualizada correctamente"
    ]);
    exit;
}

// ✅ ELIMINAR PLATAFORMA
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM PLATAFORMAS_PUBLICITARIAS WHERE pla_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Plataforma eliminada correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
