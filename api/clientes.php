<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();

/* =====================
   LISTAR CLIENTES
=====================*/
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT * FROM clientes ORDER BY cli_id DESC";
    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $clientes = [];
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }

    echo json_encode($clientes);
    exit;
}

/* =====================
   INSERTAR CLIENTE
=====================*/
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $nombre_empresa  = $data['cli_nombre_empresa'];
    $razon_social    = $data['cli_razon_social'];
    $nit             = $data['cli_nit'];
    $industria       = $data['cli_industria'];
    $email           = $data['cli_email_contacto'];
    $telefono        = $data['cli_telefono'];
    $direccion       = $data['cli_direccion'];
    $ciudad          = $data['cli_ciudad'];
    $pais            = $data['cli_pais'];
    $sitio_web       = $data['cli_sitio_web'];
    $tipo_plan       = $data['cli_tipo_plan'];
    $estado          = $data['cli_estado'];

    $sql = "INSERT INTO clientes 
    (cli_nombre_empresa, cli_razon_social, cli_nit, cli_industria, cli_email_contacto, cli_telefono, cli_direccion, cli_ciudad, cli_pais, cli_sitio_web, cli_tipo_plan, cli_estado)
    VALUES
    ('$nombre_empresa','$razon_social','$nit','$industria','$email','$telefono','$direccion','$ciudad','$pais','$sitio_web','$tipo_plan','$estado')";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cliente registrado correctamente"
    ]);
    exit;
}

/* =====================
   ACTUALIZAR CLIENTE
=====================*/
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $nombre_empresa  = $data['cli_nombre_empresa'];
    $razon_social    = $data['cli_razon_social'];
    $nit             = $data['cli_nit'];
    $industria       = $data['cli_industria'];
    $email           = $data['cli_email_contacto'];
    $telefono        = $data['cli_telefono'];
    $direccion       = $data['cli_direccion'];
    $ciudad          = $data['cli_ciudad'];
    $pais            = $data['cli_pais'];
    $sitio_web       = $data['cli_sitio_web'];
    $tipo_plan       = $data['cli_tipo_plan'];
    $estado          = $data['cli_estado'];

    $sql = "UPDATE clientes SET
        cli_nombre_empresa = '$nombre_empresa',
        cli_razon_social = '$razon_social',
        cli_nit = '$nit',
        cli_industria = '$industria',
        cli_email_contacto = '$email',
        cli_telefono = '$telefono',
        cli_direccion = '$direccion',
        cli_ciudad = '$ciudad',
        cli_pais = '$pais',
        cli_sitio_web = '$sitio_web',
        cli_tipo_plan = '$tipo_plan',
        cli_estado = '$estado'
        WHERE cli_id = '$id'";

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cliente actualizado correctamente"
    ]);
    exit;
}

/* =====================
   ELIMINAR CLIENTE
=====================*/
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];
    $sql = "DELETE FROM clientes WHERE cli_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Cliente eliminado correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
