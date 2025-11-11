<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

// ✅ LISTAR METRICAS
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT m.*, c.cam_nombre, a.anu_nombre 
            FROM METRICAS_DIARIAS m
            LEFT JOIN CAMPANAS c ON m.met_cam_id = c.cam_id
            LEFT JOIN ANUNCIOS a ON m.met_anu_id = a.anu_id
            ORDER BY m.met_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $metricas = [];
    while ($row = $result->fetch_assoc()) {
        $metricas[] = $row;
    }

    echo json_encode($metricas);
    exit;
}

// ✅ INSERTAR METRICA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $d = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO METRICAS_DIARIAS (
        met_cam_id, met_anu_id, met_fecha, met_hora,
        met_impresiones, met_alcance, met_frecuencia,
        met_clicks, met_ctr, met_engagement, met_shares,
        met_comentarios, met_guardados,
        met_conversiones, met_tasa_conversion, met_valor_conversiones,
        met_gasto, met_cpc, met_cpm, met_cpa, met_roas,
        met_reproducciones_video, met_porcentaje_visualizacion
    ) VALUES (
        '{$d['met_cam_id']}', ".($d['met_anu_id'] ?? "NULL").", '{$d['met_fecha']}', ".($d['met_hora'] ? "'{$d['met_hora']}'" : "NULL").",
        '{$d['met_impresiones']}', '{$d['met_alcance']}', '{$d['met_frecuencia']}',
        '{$d['met_clicks']}', '{$d['met_ctr']}', '{$d['met_engagement']}', '{$d['met_shares']}',
        '{$d['met_comentarios']}', '{$d['met_guardados']}',
        '{$d['met_conversiones']}', '{$d['met_tasa_conversion']}', '{$d['met_valor_conversiones']}',
        '{$d['met_gasto']}', '{$d['met_cpc']}', '{$d['met_cpm']}', '{$d['met_cpa']}', '{$d['met_roas']}',
        ".($d['met_reproducciones_video'] ?? "NULL").", ".($d['met_porcentaje_visualizacion'] ?? "NULL")."
    )";

    $db->consultar_informacion($sql);

    echo json_encode(["success" => 1, "message" => "Métrica creada correctamente"]);
    exit;
}

// ✅ ACTUALIZAR METRICA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $d = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE METRICAS_DIARIAS SET
        met_cam_id = '{$d['met_cam_id']}',
        met_anu_id = ".($d['met_anu_id'] ?? "NULL").",
        met_fecha = '{$d['met_fecha']}',
        met_hora = ".($d['met_hora'] ? "'{$d['met_hora']}'" : "NULL").",
        met_impresiones = '{$d['met_impresiones']}',
        met_alcance = '{$d['met_alcance']}',
        met_frecuencia = '{$d['met_frecuencia']}',
        met_clicks = '{$d['met_clicks']}',
        met_ctr = '{$d['met_ctr']}',
        met_engagement = '{$d['met_engagement']}',
        met_shares = '{$d['met_shares']}',
        met_comentarios = '{$d['met_comentarios']}',
        met_guardados = '{$d['met_guardados']}',
        met_conversiones = '{$d['met_conversiones']}',
        met_tasa_conversion = '{$d['met_tasa_conversion']}',
        met_valor_conversiones = '{$d['met_valor_conversiones']}',
        met_gasto = '{$d['met_gasto']}',
        met_cpc = '{$d['met_cpc']}',
        met_cpm = '{$d['met_cpm']}',
        met_cpa = '{$d['met_cpa']}',
        met_roas = '{$d['met_roas']}',
        met_reproducciones_video = ".($d['met_reproducciones_video'] ?? "NULL").",
        met_porcentaje_visualizacion = ".($d['met_porcentaje_visualizacion'] ?? "NULL")."
    WHERE met_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode(["success" => 1, "message" => "Métrica actualizada correctamente"]);
    exit;
}

// ✅ ELIMINAR METRICA
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM METRICAS_DIARIAS WHERE met_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode(["success" => 1, "message" => "Métrica eliminada correctamente"]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
