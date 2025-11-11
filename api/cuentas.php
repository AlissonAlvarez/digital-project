<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

// ✅ LISTAR CUENTAS PUBLICITARIAS
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT cu.*, cli.cli_nombre_empresa, pla.pla_nombre 
            FROM CUENTAS_PUBLICITARIAS cu
            LEFT JOIN CLIENTES cli ON cu.cue_cli_id = cli.cli_id
            LEFT JOIN PLATAFORMAS_PUBLICITARIAS pla ON cu.cue_pla_id = pla.pla_id
            ORDER BY cu.cue_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $cuentas = [];
    while ($row = $result->fetch_assoc()) {
        $cuentas[] = $row;
    }

    echo json_encode($cuentas);
    exit;
}

// ✅ INSERTAR CUENTA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['cue_cli_id'];
    $pla_id = $data['cue_pla_id'];
    $nombre = $data['cue_nombre'];
    $id_externo = $data['cue_id_externo'];
    $token = $data['cue_access_token'] ?? null;
    $estado = $data['cue_estado'];

    $sql = "INSERT INTO CUENTAS_PUBLICITARIAS 
            (cue_cli_id, cue_pla_id, cue_nombre, cue_id_externo, cue_access_token, cue_estado)
            VALUES ('$cli_id','$pla_id','$nombre','$id_externo','$token','$estado')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cuenta publicitaria creada correctamente"
    ]);
    exit;
}

// ✅ ACTUALIZAR CUENTA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['cue_cli_id'];
    $pla_id = $data['cue_pla_id'];
    $nombre = $data['cue_nombre'];
    $id_externo = $data['cue_id_externo'];
    $token = $data['cue_access_token'] ?? null;
    $estado = $data['cue_estado'];

    $sql = "UPDATE CUENTAS_PUBLICITARIAS 
            SET cue_cli_id = '$cli_id',
                cue_pla_id = '$pla_id',
                cue_nombre = '$nombre',
                cue_id_externo = '$id_externo',
                cue_access_token = '$token',
                cue_estado = '$estado'
            WHERE cue_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cuenta publicitaria actualizada correctamente"
    ]);
    exit;
}

// ✅ ELIMINAR CUENTA
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM CUENTAS_PUBLICITARIAS WHERE cue_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cuenta publicitaria eliminada correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
