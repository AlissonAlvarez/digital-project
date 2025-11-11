<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

/* ==========================
   LISTAR ANUNCIOS
========================== */
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT a.*, c.cam_nombre 
            FROM anuncios a
            LEFT JOIN campanas c ON a.anu_cam_id = c.cam_id
            ORDER BY a.anu_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $anuncios = [];
    while ($row = $result->fetch_assoc()) {
        $anuncios[] = $row;
    }

    echo json_encode($anuncios);
    exit;
}

/* ==========================
   INSERTAR ANUNCIO
========================== */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $anu_cam_id        = $data['anu_cam_id'];
    $anu_nombre        = $data['anu_nombre'];
    $anu_tipo          = $data['anu_tipo'];
    $anu_titulo        = $data['anu_titulo'];
    $anu_descripcion   = $data['anu_descripcion'];
    $anu_url_destino   = $data['anu_url_destino'];
    $anu_llamada_accion = $data['anu_llamada_accion'];
    $anu_id_externo    = $data['anu_id_externo'];
    $anu_estado        = $data['anu_estado'];

    $sql = "INSERT INTO anuncios
        (anu_cam_id, anu_nombre, anu_tipo, anu_titulo, anu_descripcion, anu_url_destino, anu_llamada_accion, anu_id_externo, anu_estado)
        VALUES
        ('$anu_cam_id','$anu_nombre','$anu_tipo','$anu_titulo','$anu_descripcion','$anu_url_destino','$anu_llamada_accion','$anu_id_externo','$anu_estado')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Anuncio creado correctamente"
    ]);
    exit;
}

/* ==========================
   ACTUALIZAR ANUNCIO
========================== */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $anu_cam_id        = $data['anu_cam_id'];
    $anu_nombre        = $data['anu_nombre'];
    $anu_tipo          = $data['anu_tipo'];
    $anu_titulo        = $data['anu_titulo'];
    $anu_descripcion   = $data['anu_descripcion'];
    $anu_url_destino   = $data['anu_url_destino'];
    $anu_llamada_accion = $data['anu_llamada_accion'];
    $anu_id_externo    = $data['anu_id_externo'];
    $anu_estado        = $data['anu_estado'];

    $sql = "UPDATE anuncios SET
            anu_cam_id = '$anu_cam_id',
            anu_nombre = '$anu_nombre',
            anu_tipo = '$anu_tipo',
            anu_titulo = '$anu_titulo',
            anu_descripcion = '$anu_descripcion',
            anu_url_destino = '$anu_url_destino',
            anu_llamada_accion = '$anu_llamada_accion',
            anu_id_externo = '$anu_id_externo',
            anu_estado = '$anu_estado'
            WHERE anu_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Anuncio actualizado correctamente"
    ]);
    exit;
}

/* ==========================
   ELIMINAR ANUNCIO
========================== */
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];
    $sql = "DELETE FROM anuncios WHERE anu_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Anuncio eliminado correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
