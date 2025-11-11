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
   LISTAR SEGMENTOS
============================ */
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT s.*, c.cli_nombre_empresa 
            FROM segmentos_audiencia s
            LEFT JOIN clientes c ON s.seg_cli_id = c.cli_id
            ORDER BY s.seg_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $segmentos = [];
    while ($row = $result->fetch_assoc()) {
        $segmentos[] = $row;
    }

    echo json_encode($segmentos);
    exit;
}

/* ============================
   INSERTAR SEGMENTO
============================ */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['seg_cli_id'];
    $nombre = $data['seg_nombre'];
    $descripcion = $data['seg_descripcion'];
    $edadMin = $data['seg_edad_min'] ?? null;
    $edadMax = $data['seg_edad_max'] ?? null;
    $genero = $data['seg_genero'];

    $ubicaciones = isset($data['seg_ubicaciones']) ? json_encode($data['seg_ubicaciones'], JSON_UNESCAPED_UNICODE) : null;
    $intereses = isset($data['seg_intereses']) ? json_encode($data['seg_intereses'], JSON_UNESCAPED_UNICODE) : null;
    $idiomas = isset($data['seg_idiomas']) ? json_encode($data['seg_idiomas'], JSON_UNESCAPED_UNICODE) : null;
    $comportamientos = isset($data['seg_comportamientos']) ? json_encode($data['seg_comportamientos'], JSON_UNESCAPED_UNICODE) : null;
    $tamano = $data['seg_tamano_estimado'] ?? null;

    $sql = "INSERT INTO segmentos_audiencia
        (seg_cli_id, seg_nombre, seg_descripcion, seg_edad_min, seg_edad_max, seg_genero, seg_ubicaciones, seg_intereses, seg_idiomas, seg_comportamientos, seg_tamano_estimado)
        VALUES
        ('$cli_id','$nombre','$descripcion','$edadMin','$edadMax','$genero','$ubicaciones','$intereses','$idiomas','$comportamientos','$tamano')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Segmento creado correctamente"
    ]);
    exit;
}

/* ============================
   ACTUALIZAR SEGMENTO
============================ */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $cli_id = $data['seg_cli_id'];
    $nombre = $data['seg_nombre'];
    $descripcion = $data['seg_descripcion'];
    $edadMin = $data['seg_edad_min'] ?? null;
    $edadMax = $data['seg_edad_max'] ?? null;
    $genero = $data['seg_genero'];

    $ubicaciones = isset($data['seg_ubicaciones']) ? json_encode($data['seg_ubicaciones'], JSON_UNESCAPED_UNICODE) : null;
    $intereses = isset($data['seg_intereses']) ? json_encode($data['seg_intereses'], JSON_UNESCAPED_UNICODE) : null;
    $idiomas = isset($data['seg_idiomas']) ? json_encode($data['seg_idiomas'], JSON_UNESCAPED_UNICODE) : null;
    $comportamientos = isset($data['seg_comportamientos']) ? json_encode($data['seg_comportamientos'], JSON_UNESCAPED_UNICODE) : null;
    $tamano = $data['seg_tamano_estimado'] ?? null;

    $sql = "UPDATE segmentos_audiencia SET
        seg_cli_id = '$cli_id',
        seg_nombre = '$nombre',
        seg_descripcion = '$descripcion',
        seg_edad_min = '$edadMin',
        seg_edad_max = '$edadMax',
        seg_genero = '$genero',
        seg_ubicaciones = '$ubicaciones',
        seg_intereses = '$intereses',
        seg_idiomas = '$idiomas',
        seg_comportamientos = '$comportamientos',
        seg_tamano_estimado = '$tamano'
        WHERE seg_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Segmento actualizado correctamente"
    ]);
    exit;
}

/* ============================
   ELIMINAR SEGMENTO
============================ */
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];

    $sql = "DELETE FROM segmentos_audiencia WHERE seg_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Segmento eliminado correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
?>
