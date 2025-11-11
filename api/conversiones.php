<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

// ===========================
// LISTAR CONVERSIONES
// ===========================
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT c.*, cam.cam_nombre, anu.anu_nombre 
            FROM CONVERSIONES c
            LEFT JOIN CAMPANAS cam ON c.con_cam_id = cam.cam_id
            LEFT JOIN ANUNCIOS anu ON c.con_anu_id = anu.anu_id
            ORDER BY c.con_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $conversiones = [];
    while ($row = $result->fetch_assoc()) {
        $conversiones[] = $row;
    }
    echo json_encode($conversiones);
    exit;
}

// ===========================
// INSERTAR CONVERSION
// ===========================
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $cam_id = $data['con_cam_id'];
    $anu_id = $data['con_anu_id'] ?? 'NULL';
    $fecha_hora = $data['con_fecha_hora'];
    $tipo = $data['con_tipo'];
    $valor = $data['con_valor'] ?? 'NULL';
    $id_transaccion = $data['con_id_transaccion'] ?? '';
    $origen = $data['con_origen_trafico'] ?? '';
    $dispositivo = $data['con_dispositivo'] ?? 'Desktop';
    $ubicacion = $data['con_ubicacion_geografica'] ?? '';

    $sql = "INSERT INTO CONVERSIONES 
            (con_cam_id, con_anu_id, con_fecha_hora, con_tipo, con_valor, con_id_transaccion, con_origen_trafico, con_dispositivo, con_ubicacion_geografica)
            VALUES ('$cam_id', $anu_id, '$fecha_hora', '$tipo', $valor, '$id_transaccion', '$origen', '$dispositivo', '$ubicacion')";

    $db->consultar_informacion($sql);

    $insertado = $conn->affected_rows ?? 0;

    if ($insertado > 0) {
        echo json_encode(["success" => 1, "message" => "Conversión creada correctamente"]);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al crear conversión", "error_sql" => $conn->error]);
    }
    exit;
}

// ===========================
// ACTUALIZAR CONVERSION
// ===========================
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cam_id = $data['con_cam_id'];
    $anu_id = $data['con_anu_id'] ?? 'NULL';
    $fecha_hora = $data['con_fecha_hora'];
    $tipo = $data['con_tipo'];
    $valor = $data['con_valor'] ?? 'NULL';
    $id_transaccion = $data['con_id_transaccion'] ?? '';
    $origen = $data['con_origen_trafico'] ?? '';
    $dispositivo = $data['con_dispositivo'] ?? 'Desktop';
    $ubicacion = $data['con_ubicacion_geografica'] ?? '';

    $sql = "UPDATE CONVERSIONES SET
                con_cam_id='$cam_id',
                con_anu_id=$anu_id,
                con_fecha_hora='$fecha_hora',
                con_tipo='$tipo',
                con_valor=$valor,
                con_id_transaccion='$id_transaccion',
                con_origen_trafico='$origen',
                con_dispositivo='$dispositivo',
                con_ubicacion_geografica='$ubicacion'
            WHERE con_id='$id'";

    $db->consultar_informacion($sql);

    echo json_encode(["success" => 1, "message" => "Conversión actualizada correctamente"]);
    exit;
}

// ===========================
// ELIMINAR CONVERSION
// ===========================
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];
    $sql = "DELETE FROM CONVERSIONES WHERE con_id='$id'";
    $db->consultar_informacion($sql);

    echo json_encode(["success" => 1, "message" => "Conversión eliminada correctamente"]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
