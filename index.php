<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos vision360
$servidor = "localhost"; 
$usuario = "root"; 
$contrasenia = ""; 
$nombreBaseDatos = "vision360";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Verificar conexión
if ($conexionBD->connect_error) {
    die(json_encode(["success" => 0, "message" => "Error de conexión: " . $conexionBD->connect_error]));
}

// Establecer charset UTF-8
$conexionBD->set_charset("utf8");

// Consultar un usuario específico por ID
if (isset($_GET["consultar"])){
    $id = intval($_GET["consultar"]);
    $sqlUsuarios = mysqli_query($conexionBD, 
        "SELECT u.usu_id, u.usu_cli_id, u.usu_nombre, u.usu_apellido, u.usu_email, 
                u.usu_rol, u.usu_telefono, u.usu_fecha_creacion, u.usu_ultimo_acceso, 
                u.usu_estado, c.cli_nombre_empresa
         FROM USUARIOS u
         INNER JOIN CLIENTES c ON u.usu_cli_id = c.cli_id
         WHERE u.usu_id = $id");
    
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
        echo json_encode($usuarios);
        exit();
    }
    else { 
        echo json_encode(["success" => 0, "message" => "Usuario no encontrado"]); 
    }
}

// Borrar usuario por ID
if (isset($_GET["borrar"])){
    $id = intval($_GET["borrar"]);
    $sqlUsuarios = mysqli_query($conexionBD, "DELETE FROM USUARIOS WHERE usu_id = $id");
    
    if($sqlUsuarios){
        echo json_encode(["success" => 1, "message" => "Usuario eliminado correctamente"]);
        exit();
    }
    else { 
        echo json_encode(["success" => 0, "message" => "Error al eliminar usuario"]); 
    }
}

// Insertar nuevo usuario
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    
    $cli_id = isset($data->usu_cli_id) ? intval($data->usu_cli_id) : 0;
    $nombre = isset($data->usu_nombre) ? $conexionBD->real_escape_string($data->usu_nombre) : "";
    $apellido = isset($data->usu_apellido) ? $conexionBD->real_escape_string($data->usu_apellido) : "";
    $email = isset($data->usu_email) ? $conexionBD->real_escape_string($data->usu_email) : "";
    $password = isset($data->usu_password) ? $data->usu_password : "";
    $rol = isset($data->usu_rol) ? $conexionBD->real_escape_string($data->usu_rol) : "Visualizador";
    $telefono = isset($data->usu_telefono) ? $conexionBD->real_escape_string($data->usu_telefono) : "";
    $estado = isset($data->usu_estado) ? $conexionBD->real_escape_string($data->usu_estado) : "Activo";
    
    // Validar campos requeridos
    if($cli_id > 0 && $nombre != "" && $apellido != "" && $email != "" && $password != ""){
        
        // Generar hash de contraseña
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $sqlUsuarios = mysqli_query($conexionBD, 
            "INSERT INTO USUARIOS (usu_cli_id, usu_nombre, usu_apellido, usu_email, 
                                   usu_password_hash, usu_rol, usu_telefono, usu_estado) 
             VALUES ($cli_id, '$nombre', '$apellido', '$email', '$password_hash', 
                     '$rol', '$telefono', '$estado')");
        
        if($sqlUsuarios){
            echo json_encode([
                "success" => 1, 
                "message" => "Usuario creado correctamente",
                "id" => $conexionBD->insert_id
            ]);
        } else {
            echo json_encode([
                "success" => 0, 
                "message" => "Error al crear usuario: " . $conexionBD->error
            ]);
        }
    } else {
        echo json_encode([
            "success" => 0, 
            "message" => "Faltan campos requeridos (cliente, nombre, apellido, email, password)"
        ]);
    }
    exit();
}

// Actualizar usuario existente
if(isset($_GET["actualizar"])){
    $data = json_decode(file_get_contents("php://input"));
    
    $id = (isset($data->usu_id)) ? intval($data->usu_id) : intval($_GET["actualizar"]);
    $cli_id = isset($data->usu_cli_id) ? intval($data->usu_cli_id) : 0;
    $nombre = isset($data->usu_nombre) ? $conexionBD->real_escape_string($data->usu_nombre) : "";
    $apellido = isset($data->usu_apellido) ? $conexionBD->real_escape_string($data->usu_apellido) : "";
    $email = isset($data->usu_email) ? $conexionBD->real_escape_string($data->usu_email) : "";
    $rol = isset($data->usu_rol) ? $conexionBD->real_escape_string($data->usu_rol) : "";
    $telefono = isset($data->usu_telefono) ? $conexionBD->real_escape_string($data->usu_telefono) : "";
    $estado = isset($data->usu_estado) ? $conexionBD->real_escape_string($data->usu_estado) : "";
    
    // Construir query dinámicamente
    $campos = [];
    if($cli_id > 0) $campos[] = "usu_cli_id = $cli_id";
    if($nombre != "") $campos[] = "usu_nombre = '$nombre'";
    if($apellido != "") $campos[] = "usu_apellido = '$apellido'";
    if($email != "") $campos[] = "usu_email = '$email'";
    if($rol != "") $campos[] = "usu_rol = '$rol'";
    if($telefono != "") $campos[] = "usu_telefono = '$telefono'";
    if($estado != "") $campos[] = "usu_estado = '$estado'";
    
    // Actualizar password solo si se proporciona
    if(isset($data->usu_password) && $data->usu_password != ""){
        $password_hash = password_hash($data->usu_password, PASSWORD_DEFAULT);
        $campos[] = "usu_password_hash = '$password_hash'";
    }
    
    if(count($campos) > 0){
        $set_clause = implode(", ", $campos);
        $sqlUsuarios = mysqli_query($conexionBD, 
            "UPDATE USUARIOS SET $set_clause WHERE usu_id = $id");
        
        if($sqlUsuarios){
            echo json_encode(["success" => 1, "message" => "Usuario actualizado correctamente"]);
        } else {
            echo json_encode([
                "success" => 0, 
                "message" => "Error al actualizar usuario: " . $conexionBD->error
            ]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "No hay campos para actualizar"]);
    }
    exit();
}

// Consultar usuarios por cliente (opcional)
if (isset($_GET["cliente"])){
    $cli_id = intval($_GET["cliente"]);
    $sqlUsuarios = mysqli_query($conexionBD, 
        "SELECT u.usu_id, u.usu_cli_id, u.usu_nombre, u.usu_apellido, u.usu_email, 
                u.usu_rol, u.usu_telefono, u.usu_fecha_creacion, u.usu_ultimo_acceso, 
                u.usu_estado, c.cli_nombre_empresa
         FROM USUARIOS u
         INNER JOIN CLIENTES c ON u.usu_cli_id = c.cli_id
         WHERE u.usu_cli_id = $cli_id
         ORDER BY u.usu_fecha_creacion DESC");
    
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
        echo json_encode($usuarios);
    } else {
        echo json_encode([]);
    }
    exit();
}

// Consultar todos los usuarios (con información del cliente)
$sqlUsuarios = mysqli_query($conexionBD, 
    "SELECT u.usu_id, u.usu_cli_id, u.usu_nombre, u.usu_apellido, u.usu_email, 
            u.usu_rol, u.usu_telefono, u.usu_fecha_creacion, u.usu_ultimo_acceso, 
            u.usu_estado, c.cli_nombre_empresa
     FROM USUARIOS u
     INNER JOIN CLIENTES c ON u.usu_cli_id = c.cli_id
     ORDER BY u.usu_fecha_creacion DESC");

if(mysqli_num_rows($sqlUsuarios) > 0){
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
} else { 
    echo json_encode([]); 
}

$conexionBD->close();
?>