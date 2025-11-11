<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

// LISTAR ALERTAS
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT a.*, c.cli_nombre_empresa 
            FROM alertas a
            LEFT JOIN clientes c ON a.ale_cli_id = c.cli_id
            ORDER BY a.ale_id DESC";
    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $alertas = [];
    while ($row = $result->fetch_assoc()) {
        $alertas[] = $row;
    }

    echo json_encode($alertas);
    exit;
}

// INSERTAR ALERTA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['ale_cli_id'];
    $nombre = $data['ale_nombre'];
    $tipo = $data['ale_tipo'];
    $condicion = json_encode($data['ale_condicion']);
    $destinatarios = json_encode($data['ale_destinatarios']);
    $metodo = $data['ale_metodo'];
    $activa = $data['ale_activa'] ? 1 : 0;

    $sql = "INSERT INTO alertas 
            (ale_cli_id, ale_nombre, ale_tipo, ale_condicion, ale_destinatarios, ale_metodo, ale_activa)
            VALUES ('$cli_id','$nombre','$tipo','$condicion','$destinatarios','$metodo','$activa')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Alerta creada correctamente"
    ]);
    exit;
}

// ACTUALIZAR ALERTA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['ale_cli_id'];
    $nombre = $data['ale_nombre'];
    $tipo = $data['ale_tipo'];
    $condicion = json_encode($data['ale_condicion']);
    $destinatarios = json_encode($data['ale_destinatarios']);
    $metodo = $data['ale_metodo'];
    $activa = $data['ale_activa'] ? 1 : 0;

    $sql = "UPDATE alertas SET 
                ale_cli_id = '$cli_id',
                ale_nombre = '$nombre',
                ale_tipo = '$tipo',
                ale_condicion = '$condicion',
                ale_destinatarios = '$destinatarios',
                ale_metodo = '$metodo',
                ale_activa = '$activa'
            WHERE ale_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Alerta actualizada correctamente"
    ]);
    exit;
}

// ELIMINAR ALERTA
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM alertas WHERE ale_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Alerta eliminada correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
