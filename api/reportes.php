<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

/* ============================
   LISTAR REPORTES
============================ */
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT r.*, c.cli_nombre_empresa 
            FROM reportes_personalizados r 
            LEFT JOIN clientes c ON r.rep_cli_id = c.cli_id 
            ORDER BY r.rep_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $reportes = [];
    while ($row = $result->fetch_assoc()) {
        $reportes[] = $row;
    }

    echo json_encode($reportes);
    exit;
}

/* ============================
   INSERTAR REPORTE
============================ */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['rep_cli_id'];
    $nombre = $data['rep_nombre'];
    $descripcion = $data['rep_descripcion'];
    $tipo = $data['rep_tipo'];
    $metricas = json_encode($data['rep_metricas_incluidas'], JSON_UNESCAPED_UNICODE);
    $filtros = isset($data['rep_filtros']) ? json_encode($data['rep_filtros'], JSON_UNESCAPED_UNICODE) : null;
    $formato = $data['rep_formato'];
    $envio_auto = $data['rep_envio_automatico'] ? 1 : 0;
    $destinatarios = isset($data['rep_destinatarios_email']) ? json_encode($data['rep_destinatarios_email'], JSON_UNESCAPED_UNICODE) : null;
    $estado = $data['rep_estado'];

    $sql = "INSERT INTO reportes_personalizados
        (rep_cli_id, rep_nombre, rep_descripcion, rep_tipo, rep_metricas_incluidas, rep_filtros, rep_formato, rep_envio_automatico, rep_destinatarios_email, rep_estado)
        VALUES
        ('$cli_id','$nombre','$descripcion','$tipo','$metricas','$filtros','$formato','$envio_auto','$destinatarios','$estado')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Reporte creado correctamente"
    ]);
    exit;
}

/* ============================
   ACTUALIZAR REPORTE
============================ */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['rep_cli_id'];
    $nombre = $data['rep_nombre'];
    $descripcion = $data['rep_descripcion'];
    $tipo = $data['rep_tipo'];
    $metricas = json_encode($data['rep_metricas_incluidas'], JSON_UNESCAPED_UNICODE);
    $filtros = isset($data['rep_filtros']) ? json_encode($data['rep_filtros'], JSON_UNESCAPED_UNICODE) : null;
    $formato = $data['rep_formato'];
    $envio_auto = $data['rep_envio_automatico'] ? 1 : 0;
    $destinatarios = isset($data['rep_destinatarios_email']) ? json_encode($data['rep_destinatarios_email'], JSON_UNESCAPED_UNICODE) : null;
    $estado = $data['rep_estado'];

    $sql = "UPDATE reportes_personalizados SET
        rep_cli_id = '$cli_id',
        rep_nombre = '$nombre',
        rep_descripcion = '$descripcion',
        rep_tipo = '$tipo',
        rep_metricas_incluidas = '$metricas',
        rep_filtros = '$filtros',
        rep_formato = '$formato',
        rep_envio_automatico = '$envio_auto',
        rep_destinatarios_email = '$destinatarios',
        rep_estado = '$estado'
        WHERE rep_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Reporte actualizado correctamente"
    ]);
    exit;
}

/* ============================
   ELIMINAR REPORTE
============================ */
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM reportes_personalizados WHERE rep_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Reporte eliminado correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
