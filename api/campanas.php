<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

/* ===================== LISTAR CAMPAÑAS =====================*/
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT cam.*, cue.cue_nombre 
            FROM campanas cam
            LEFT JOIN cuentas_publicitarias cue ON cam.cam_cue_id = cue.cue_id
            ORDER BY cam.cam_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $campanas = [];
    while ($row = $result->fetch_assoc()) {
        $campanas[] = $row;
    }

    echo json_encode($campanas);
    exit;
}

/* ===================== INSERTAR CAMPAÑA =====================*/
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    // VALIDAR CAMPOS OBLIGATORIOS
    $requeridos = ['cam_cue_id','cam_nombre','cam_objetivo','cam_estado'];
    foreach ($requeridos as $campo) {
        if (empty($data[$campo])) {
            echo json_encode([
                "success" => 0,
                "message" => "El campo $campo es obligatorio"
            ]);
            exit;
        }
    }

    $cam_cue_id          = $data['cam_cue_id'];
    $cam_nombre          = $data['cam_nombre'];
    $cam_objetivo        = $data['cam_objetivo'];
    $cam_descripcion     = $data['cam_descripcion'] ?? '';
    $cam_id_externo      = $data['cam_id_externo'] ?? '';
    $cam_fecha_inicio    = $data['cam_fecha_inicio'] ?? null;
    $cam_fecha_fin       = $data['cam_fecha_fin'] ?? null;
    $cam_presupuesto_total  = $data['cam_presupuesto_total'] ?? 0;
    $cam_presupuesto_diario = $data['cam_presupuesto_diario'] ?? 0;
    $cam_moneda          = $data['cam_moneda'] ?? 'USD';
    $cam_estado          = $data['cam_estado'];

    $sql = "INSERT INTO campanas 
        (cam_cue_id, cam_nombre, cam_objetivo, cam_descripcion, cam_id_externo, cam_fecha_inicio, cam_fecha_fin, cam_presupuesto_total, cam_presupuesto_diario, cam_moneda, cam_estado)
        VALUES
        ('$cam_cue_id','$cam_nombre','$cam_objetivo','$cam_descripcion','$cam_id_externo','$cam_fecha_inicio','$cam_fecha_fin','$cam_presupuesto_total','$cam_presupuesto_diario','$cam_moneda','$cam_estado')";

    $db->consultar_informacion($sql);

    // ✅ VALIDAR SI HUBO ERROR EN LA BASE DE DATOS
    if ($conn->error) {
        echo json_encode([
            "success" => 0,
            "message" => "Error en SQL al insertar campaña",
            "errorSQL" => $conn->error  // 👈 te dirá exactamente el error
        ]);
    } else {
        if ($conn->affected_rows > 0) {
            echo json_encode([
                "success" => 1,
                "message" => "Campaña creada correctamente"
            ]);
        } else {
            echo json_encode([
                "success" => 0,
                "message" => "No se insertó la campaña, sin cambios en BD"
            ]);
        }
    }
    exit;
}

/* ===================== ACTUALIZAR CAMPAÑA =====================*/
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cam_cue_id          = $data['cam_cue_id'];
    $cam_nombre          = $data['cam_nombre'];
    $cam_objetivo        = $data['cam_objetivo'];
    $cam_descripcion     = $data['cam_descripcion'];
    $cam_id_externo      = $data['cam_id_externo'];
    $cam_fecha_inicio    = $data['cam_fecha_inicio'];
    $cam_fecha_fin       = $data['cam_fecha_fin'];
    $cam_presupuesto_total  = $data['cam_presupuesto_total'];
    $cam_presupuesto_diario = $data['cam_presupuesto_diario'];
    $cam_moneda          = $data['cam_moneda'];
    $cam_estado          = $data['cam_estado'];

    $sql = "UPDATE campanas SET
        cam_cue_id = '$cam_cue_id',
        cam_nombre = '$cam_nombre',
        cam_objetivo = '$cam_objetivo',
        cam_descripcion = '$cam_descripcion',
        cam_id_externo = '$cam_id_externo',
        cam_fecha_inicio = '$cam_fecha_inicio',
        cam_fecha_fin = '$cam_fecha_fin',
        cam_presupuesto_total = '$cam_presupuesto_total',
        cam_presupuesto_diario = '$cam_presupuesto_diario',
        cam_moneda = '$cam_moneda',
        cam_estado = '$cam_estado'
        WHERE cam_id = '$id'";

    $db->consultar_informacion($sql);

    if ($conn->error) {
        echo json_encode([
            "success" => 0,
            "message" => "Error en SQL al actualizar campaña",
            "errorSQL" => $conn->error
        ]);
    } else {
        echo json_encode([
            "success" => 1,
            "message" => "Campaña actualizada correctamente"
        ]);
    }
    exit;
}

/* ===================== ELIMINAR CAMPAÑA =====================*/
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];
    $sql = "DELETE FROM campanas WHERE cam_id = '$id'";
    $db->consultar_informacion($sql);

    if ($conn->error) {
        echo json_encode([
            "success" => 0,
            "message" => "Error al eliminar campaña",
            "errorSQL" => $conn->error
        ]);
    } else {
        echo json_encode([
            "success" => 1,
            "message" => "Campaña eliminada correctamente"
        ]);
    }
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
