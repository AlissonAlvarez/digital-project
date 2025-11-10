<?php

require_once '../Configuracion/configuracion_constantes.php';
require_once '../Configuracion/Conexion.php';
require_once './FuncionesControlador.php';

class Controlador
{
    public function verPagina($ruta)
    {
        require_once $ruta;
    }
}

//==========================================
// VISUALIZAR VISTAS (WEB)
//==========================================
if (isset($_GET["accion"]) && $_GET["accion"] == "inicio") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/inicio.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "servicios") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/servicios.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "nosotros") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/nosotros.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "contacto") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/contacto.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "precios") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/precios.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "login") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/login.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "registro") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/web/registro.php');
}

//==========================================
// VISUALIZAR VISTAS (APP)
//==========================================
if (isset($_GET["accion"]) && $_GET["accion"] == "dashboard") {
    $controlador = new FuncionesControlador();
    $controlador->dashboard_c();
}
if (isset($_GET["accion"]) && $_GET["accion"] == "modulos") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/app/modulos.php');
}
if (isset($_GET["accion"]) && $_GET["accion"] == "perfil_usuario") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_perfil_usuario_c();
}

//==========================================
// FUNCIONES DE INICIAR & CERRAR SESIÓN
//==========================================
if (isset($_POST["accion"]) && $_POST["accion"] == "iniciar_sesion") {
    $controlador = new FuncionesControlador();
    $controlador->iniciar_sesion_c($_POST["email"], $_POST["password"]);
}
if (isset($_GET["accion"]) && $_GET["accion"] == "cerrar_sesion") {
    $controlador = new FuncionesControlador();
    $controlador->cerrar_sesion_c();
}

//==========================================
// FUNCIONES CRUD - MÓDULOS PRINCIPALES
//==========================================

// CLIENTES
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_clientes") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_clientes_c();
}

// USUARIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_usuarios") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_usuarios_c();
}

// PLATAFORMAS PUBLICITARIAS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_plataformas") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_plataformas_publicitarias_c();
}

// CUENTAS PUBLICITARIAS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_cuentas") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_cuentas_publicitarias_c();
}

// CAMPAÑAS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_campanas") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_campanas_c();
}

// ANUNCIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_anuncios") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_anuncios_c();
}

// SEGMENTOS AUDIENCIA
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_segmentos") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_segmentos_audiencia_c();
}

// MÉTRICAS DIARIAS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_metricas") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_metricas_diarias_c();
}

// CONVERSIONES
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_conversiones") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_conversiones_c();
}

// ALERTAS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_alertas") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_alertas_c();
}

// REPORTES PERSONALIZADOS
if (isset($_GET["accion"]) && $_GET["accion"] == "modulo_reportes") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_reportes_personalizados_c();
}

// VER DETALLE DE CAMPAÑA
if (isset($_GET["accion"]) && $_GET["accion"] == "ver_detalle_campana") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->ver_detalle_campana_c($_GET['id']);
    } else {
        echo 'ERROR: ID de campaña no válido';
    }
}

//==========================================
// VISUALIZAR PLANTILLAS (PDF)
//==========================================
if (isset($_GET["accion"]) && $_GET["accion"] == "clientes_pdf") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_clientes_pdf_c();
}
if (isset($_GET["accion"]) && $_GET["accion"] == "campanas_pdf") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_campanas_pdf_c();
}
if (isset($_GET["accion"]) && $_GET["accion"] == "metricas_pdf") {
    if (isset($_GET['cam_id']) && $_GET['cam_id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->obtener_metricas_pdf_c($_GET['cam_id']);
    }
}
if (isset($_GET["accion"]) && $_GET["accion"] == "conversiones_pdf") {
    if (isset($_GET['cam_id']) && $_GET['cam_id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->obtener_conversiones_pdf_c($_GET['cam_id']);
    }
}

//==========================================
// VISUALIZAR VISTAS CRUD (INSERTAR)
//==========================================

// CLIENTES
if (isset($_GET["accion"]) && $_GET["accion"] == "clientes_insertar") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/app/crud/clientes/clientes_insertar.php');
}

// USUARIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "usuarios_insertar") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_usuarios_c();
}

// CAMPAÑAS
if (isset($_GET["accion"]) && $_GET["accion"] == "campanas_insertar") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_campanas_c();
}

// ANUNCIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "anuncios_insertar") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_anuncios_c();
}

// SEGMENTOS
if (isset($_GET["accion"]) && $_GET["accion"] == "segmentos_insertar") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/app/crud/segmentos/segmentos_insertar.php');
}

// ALERTAS
if (isset($_GET["accion"]) && $_GET["accion"] == "alertas_insertar") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/app/crud/alertas/alertas_insertar.php');
}

// REPORTES
if (isset($_GET["accion"]) && $_GET["accion"] == "reportes_insertar") {
    $controlador = new Controlador();
    $controlador->verPagina('../Vista/html/app/crud/reportes/reportes_insertar.php');
}

//==========================================
// VISUALIZAR VISTAS CRUD (CONSULTAR)
//==========================================

// CLIENTES
if (isset($_GET["accion"]) && $_GET["accion"] == "clientes_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->clientes_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// USUARIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "usuarios_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->usuarios_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// CAMPAÑAS
if (isset($_GET["accion"]) && $_GET["accion"] == "campanas_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->campanas_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// ANUNCIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "anuncios_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->anuncios_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// SEGMENTOS
if (isset($_GET["accion"]) && $_GET["accion"] == "segmentos_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->segmentos_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// ALERTAS
if (isset($_GET["accion"]) && $_GET["accion"] == "alertas_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->alertas_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

// REPORTES
if (isset($_GET["accion"]) && $_GET["accion"] == "reportes_consultar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->reportes_consultar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL CONSULTAR';
    }
}

//==========================================
// VISUALIZAR VISTAS CRUD (ACTUALIZAR)
//==========================================

// CLIENTES
if (isset($_GET["accion"]) && $_GET["accion"] == "clientes_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->clientes_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// USUARIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "usuarios_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->usuarios_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// CAMPAÑAS
if (isset($_GET["accion"]) && $_GET["accion"] == "campanas_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->campanas_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// ANUNCIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "anuncios_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->anuncios_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// SEGMENTOS
if (isset($_GET["accion"]) && $_GET["accion"] == "segmentos_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->segmentos_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// ALERTAS
if (isset($_GET["accion"]) && $_GET["accion"] == "alertas_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->alertas_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

// REPORTES
if (isset($_GET["accion"]) && $_GET["accion"] == "reportes_actualizar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        $controlador = new FuncionesControlador();
        $controlador->reportes_actualizar_id_c($_GET['id']);
    } else {
        echo 'ERROR AL ACTUALIZAR';
    }
}

//==========================================
// VISUALIZAR VISTAS CRUD (ELIMINAR)
//==========================================

// CLIENTES
if (isset($_GET["accion"]) && $_GET["accion"] == "clientes_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/clientes/clientes_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_clientes' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->clientes_eliminar_id_c($_POST['id']);
    }
}

// USUARIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "usuarios_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/usuarios/usuarios_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_usuarios' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->usuarios_eliminar_id_c($_POST['id']);
    }
}

// CAMPAÑAS
if (isset($_GET["accion"]) && $_GET["accion"] == "campanas_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/campanas/campanas_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_campanas' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->campanas_eliminar_id_c($_POST['id']);
    }
}

// ANUNCIOS
if (isset($_GET["accion"]) && $_GET["accion"] == "anuncios_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/anuncios/anuncios_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_anuncios' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->anuncios_eliminar_id_c($_POST['id']);
    }
}

// SEGMENTOS
if (isset($_GET["accion"]) && $_GET["accion"] == "segmentos_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/segmentos/segmentos_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_segmentos' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->segmentos_eliminar_id_c($_POST['id']);
    }
}

// ALERTAS
if (isset($_GET["accion"]) && $_GET["accion"] == "alertas_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/alertas/alertas_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_alertas' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->alertas_eliminar_id_c($_POST['id']);
    }
}

// REPORTES
if (isset($_GET["accion"]) && $_GET["accion"] == "reportes_eliminar") {
    if (isset($_GET['id']) && $_GET['id'] != '') {
        include '../Vista/html/app/crud/reportes/reportes_eliminar.php';
    } else {
        echo 'ERROR: ID no válido';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar_reportes' && isset($_POST['id'])) {
        $controlador = new FuncionesControlador();
        $controlador->reportes_eliminar_id_c($_POST['id']);
    }
}

//==========================================
// FUNCIONES CRUD (INSERTAR) - POST
//==========================================

// CLIENTES
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_clientes") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_clientes_c(
        $_POST['nombre_empresa'],
        $_POST['razon_social'],
        $_POST['nit'],
        $_POST['industria'],
        $_POST['email'],
        $_POST['telefono'],
        $_POST['direccion'],
        $_POST['ciudad'],
        $_POST['pais'],
        $_POST['sitio_web'],
        $_POST['tipo_plan'],
        $_POST['estado']
    );
}

// USUARIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_usuarios") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_usuarios_c(
        $_POST['cli_id'],
        $_POST['nombre'],
        $_POST['apellido'],
        $_POST['email'],
        $_POST['password'],
        $_POST['rol'],
        $_POST['telefono'],
        $_POST['estado']
    );
}

// CAMPAÑAS
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_campanas") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_campanas_c(
        $_POST['cue_id'],
        $_POST['nombre'],
        $_POST['objetivo'],
        $_POST['descripcion'],
        $_POST['id_externo'],
        $_POST['fecha_inicio'],
        $_POST['fecha_fin'],
        $_POST['presupuesto_total'],
        $_POST['presupuesto_diario'],
        $_POST['moneda'],
        $_POST['estado']
    );
}

// ANUNCIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_anuncios") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_anuncios_c(
        $_POST['cam_id'],
        $_POST['nombre'],
        $_POST['tipo'],
        $_POST['titulo'],
        $_POST['descripcion'],
        $_POST['url_destino'],
        $_POST['llamada_accion'],
        $_POST['id_externo'],
        $_POST['estado']
    );
}

// MÉTRICAS DIARIAS
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_metricas") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_metricas_diarias_c(
        $_POST['cam_id'],
        $_POST['anu_id'],
        $_POST['fecha'],
        $_POST['impresiones'],
        $_POST['alcance'],
        $_POST['clicks'],
        $_POST['engagement'],
        $_POST['conversiones'],
        $_POST['valor_conversiones'],
        $_POST['gasto']
    );
}

// CONVERSIONES
if (isset($_POST["accion"]) && $_POST["accion"] == "insertar_conversiones") {
    $controlador = new FuncionesControlador();
    $controlador->insertar_conversiones_c(
        $_POST['cam_id'],
        $_POST['anu_id'],
        $_POST['fecha_hora'],
        $_POST['tipo'],
        $_POST['valor'],
        $_POST['id_transaccion'],
        $_POST['origen_trafico'],
        $_POST['dispositivo'],
        $_POST['ubicacion']
    );
}

//==========================================
// FUNCIONES CRUD (ACTUALIZAR) - POST
//==========================================

// CLIENTES
if (isset($_POST["accion"]) && $_POST["accion"] == "actualizar_clientes") {
    $controlador = new FuncionesControlador();
    $controlador->actualizar_clientes_id_c(
        $_POST['id'],
        $_POST['nombre_empresa'],
        $_POST['razon_social'],
        $_POST['nit'],
        $_POST['industria'],
        $_POST['email'],
        $_POST['telefono'],
        $_POST['direccion'],
        $_POST['ciudad'],
        $_POST['pais'],
        $_POST['sitio_web'],
        $_POST['tipo_plan'],
        $_POST['estado']
    );
}

// USUARIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "actualizar_usuarios") {
    $controlador = new FuncionesControlador();
    $controlador->actualizar_usuarios_id_c(
        $_POST['id'],
        $_POST['cli_id'],
        $_POST['nombre'],
        $_POST['apellido'],
        $_POST['email'],
        $_POST['rol'],
        $_POST['telefono'],
        $_POST['estado']
    );
}

// CAMPAÑAS
if (isset($_POST["accion"]) && $_POST["accion"] == "actualizar_campanas") {
    $controlador = new FuncionesControlador();
    $controlador->actualizar_campanas_id_c(
        $_POST['id'],
        $_POST['nombre'],
        $_POST['objetivo'],
        $_POST['descripcion'],
        $_POST['fecha_inicio'],
        $_POST['fecha_fin'],
        $_POST['presupuesto_total'],
        $_POST['presupuesto_diario'],
        $_POST['estado']
    );
}

// ANUNCIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "actualizar_anuncios") {
    $controlador = new FuncionesControlador();
    $controlador->actualizar_anuncios_id_c(
        $_POST['id'],
        $_POST['nombre'],
        $_POST['tipo'],
        $_POST['titulo'],
        $_POST['descripcion'],
        $_POST['url_destino'],
        $_POST['llamada_accion'],
        $_POST['estado']
    );
}

//==========================================
// FUNCIONES CRUD (ELIMINAR) - POST
//==========================================

// CLIENTES
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_clientes") {
    $controlador = new FuncionesControlador();
    $controlador->clientes_eliminar_id_c($_POST['id']);
}

// USUARIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_usuarios") {
    $controlador = new FuncionesControlador();
    $controlador->usuarios_eliminar_id_c($_POST['id']);
}

// CAMPAÑAS
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_campanas") {
    $controlador = new FuncionesControlador();
    $controlador->campanas_eliminar_id_c($_POST['id']);
}

// ANUNCIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_anuncios") {
    $controlador = new FuncionesControlador();
    $controlador->anuncios_eliminar_id_c($_POST['id']);
}

// SEGMENTOS
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_segmentos") {
    $controlador = new FuncionesControlador();
    $controlador->segmentos_eliminar_id_c($_POST['id']);
}

// ALERTAS
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_alertas") {
    $controlador = new FuncionesControlador();
    $controlador->alertas_eliminar_id_c($_POST['id']);
}

// REPORTES
if (isset($_POST["accion"]) && $_POST["accion"] == "eliminar_reportes") {
    $controlador = new FuncionesControlador();
    $controlador->reportes_eliminar_id_c($_POST['id']);
}

//==========================================
// FUNCIONES ESPECIALES
//==========================================

// CAMBIAR ESTADO DE CAMPAÑA
if (isset($_POST["accion"]) && $_POST["accion"] == "cambiar_estado_campana") {
    $controlador = new FuncionesControlador();
    $controlador->cambiar_estado_campana_c($_POST['cam_id'], $_POST['nuevo_estado']);
}

// CAMBIAR ESTADO DE ANUNCIO
if (isset($_POST["accion"]) && $_POST["accion"] == "cambiar_estado_anuncio") {
    $controlador = new FuncionesControlador();
    $controlador->cambiar_estado_anuncio_c($_POST['anu_id'], $_POST['nuevo_estado']);
}

// MARCAR ALERTA COMO LEÍDA
if (isset($_POST["accion"]) && $_POST["accion"] == "marcar_alerta_leida") {
    $controlador = new FuncionesControlador();
    $controlador->marcar_alerta_leida_c($_POST['hal_id']);
}

// OBTENER RESUMEN DE CAMPAÑA
if (isset($_POST["accion"]) && $_POST["accion"] == "obtener_resumen_campana") {
    $controlador = new FuncionesControlador();
    $controlador->obtener_resumen_campana_c($_POST['cam_id'], $_POST['fecha_inicio'], $_POST['fecha_fin']);
}

// COMPARAR ANUNCIOS
if (isset($_POST["accion"]) && $_POST["accion"] == "comparar_anuncios") {
    $controlador = new FuncionesControlador();
    $controlador->comparar_anuncios_c($_POST['cam_id'], $_POST['fecha_inicio'], $_POST['fecha_fin']);
}
?>