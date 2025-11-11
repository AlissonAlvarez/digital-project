<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../Configuracion/Constantes.php";
require_once "../Configuracion/Conexion.php";

$db = new Conexion();
$conn = $db->abrir_conexion();


// LOGIN USUARIO
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['login'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => 0, "message" => "Email y contraseña son requeridos"]);
        exit;
    }

    $sql = "SELECT * FROM usuarios WHERE usu_email = '$email' LIMIT 1";
    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['usu_password_hash'])) {
            // Opcional: quitar password del objeto que devuelves
            unset($row['usu_password_hash']);
            echo json_encode([
                "success" => 1,
                "message" => "Login exitoso",
                "usuario" => $row
            ]);
        } else {
            echo json_encode(["success" => 0, "message" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "Usuario no encontrado"]);
    }
    exit;
}


// LISTAR USUARIOS
if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['borrar'])) {
    $sql = "SELECT u.*, c.cli_nombre_empresa 
            FROM usuarios u 
            LEFT JOIN clientes c ON u.usu_cli_id = c.cli_id
            ORDER BY u.usu_id DESC";

    $db->consultar_informacion($sql);
    $result = $db->obtener_resultados();

    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
    exit;
}

// ✅ INSERTAR USUARIO
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['insertar'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $nombre  = $data['usu_nombre'];
    $apellido = $data['usu_apellido'];
    $email = $data['usu_email'];
    $password = password_hash($data['usu_password'], PASSWORD_DEFAULT);
    $rol = $data['usu_rol'];
    $estado = $data['usu_estado'];
    $telefono = $data['usu_telefono'];
    $cli_id = $data['usu_cli_id'];

    $sql = "INSERT INTO usuarios (usu_cli_id, usu_nombre, usu_apellido, usu_email, usu_password_hash, usu_rol, usu_telefono, usu_estado)
            VALUES ('$cli_id','$nombre','$apellido','$email','$password','$rol','$telefono','$estado')";

    $db->consultar_informacion($sql);

    // ✅ Ahora sí verificamos si insertó o no
    $insertado = $conn->affected_rows ?? 0;

    if ($insertado > 0) {
        echo json_encode([
            "success" => 1,
            "message" => "Usuario creado correctamente"
        ]);
    } else {
        echo json_encode([
            "success" => 0,
            "message" => "Error al crear usuario",
            "error_sql" => $conn->error
        ]);
    }
    exit;
}


// ACTUALIZAR USUARIO
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['actualizar'])) {
    $id = $_GET['actualizar'];
    $data = json_decode(file_get_contents("php://input"), true);

    $nombre  = $data['usu_nombre'];
    $apellido = $data['usu_apellido'];
    $email = $data['usu_email'];
    $rol = $data['usu_rol'];
    $estado = $data['usu_estado'];
    $telefono = $data['usu_telefono'];
    $cli_id = $data['usu_cli_id'];

    if (!empty($data['usu_password'])) {
    $password = password_hash($data['usu_password'], PASSWORD_DEFAULT);
    $sql = "UPDATE usuarios SET 
        usu_cli_id = '$cli_id',
        usu_nombre = '$nombre',
        usu_apellido = '$apellido',
        usu_email = '$email',
        usu_password_hash = '$password',
        usu_rol = '$rol',
        usu_telefono = '$telefono',
        usu_estado = '$estado'
        WHERE usu_id = '$id'";
} else {
    $sql = "UPDATE usuarios SET 
        usu_cli_id = '$cli_id',
        usu_nombre = '$nombre',
        usu_apellido = '$apellido',
        usu_email = '$email',
        usu_rol = '$rol',
        usu_telefono = '$telefono',
        usu_estado = '$estado'
        WHERE usu_id = '$id'";
}

    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Usuario actualizado correctamente"
    ]);
    exit;
}

// ELIMINAR USUARIO
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['borrar'])) {
    $id = $_GET['borrar'];
    $sql = "DELETE FROM usuarios WHERE usu_id = '$id'";
    $db->consultar_informacion($sql);

    echo json_encode([
        "success" => 1,
        "message" => "Usuario eliminado correctamente"
    ]);
    exit;
}

echo json_encode(["success" => 0, "message" => "Acción no válida"]);
exit;
