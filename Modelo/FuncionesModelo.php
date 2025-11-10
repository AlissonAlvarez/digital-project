<?php

require_once '../Configuracion/Conexion.php';
require_once '../Modelo/ClientesModelo.php';
require_once '../Modelo/UsuariosModelo.php';
require_once '../Modelo/PlataformasPublicitariasModelo.php';
require_once '../Modelo/CuentasPublicitariasModelo.php';
require_once '../Modelo/CampanasModelo.php';
require_once '../Modelo/SegmentosAudienciaModelo.php';
require_once '../Modelo/AnunciosModelo.php';
require_once '../Modelo/MetricasDiariasModelo.php';
require_once '../Modelo/ConversionesModelo.php';
require_once '../Modelo/AlertasModelo.php';
require_once '../Modelo/ReportesPersonalizadosModelo.php';

class FuncionesModelo extends Conexion
{
    //==========================================
    // FUNCIONES DE INICIAR & CERRAR SESIÓN
    //==========================================
    protected function consultar_usuario()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM USUARIOS WHERE usu_email = '$_REQUEST[email]' AND usu_estado = 'Activo'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        
        $usuario = null;
        foreach ($resultado as $user) {
            $usuario = $user;
        }
        
        if (empty($usuario)) {
            $usuario = "sindatos";
        }
        return $usuario;
    }

    // protected function actualizar_ultimo_acceso($usu_id)
    // {
    //     $conexion = new Conexion();
    //     $conexion->abrir_conexion();
    //     $sql = "UPDATE ANUNCIOS SET 
    //             anu_nombre = '" . $nombre . "',
    //             anu_tipo = '" . $tipo . "',
    //             anu_titulo = '" . $titulo . "',
    //             anu_descripcion = '" . $descripcion . "',
    //             anu_url_destino = '" . $url_destino . "',
    //             anu_llamada_accion = '" . $llamada_accion . "',
    //             anu_estado = '" . $estado . "'
    //             WHERE anu_id = '" . $id . "'";
        
    //     $conexion->consultar_informacion($sql);
    //     $filasbd = $conexion->obtener_filas();
    //     $conexion->cerrar_conexion();
    //     return $filasbd;
    // }

    //==========================================
    // FUNCIONES CRUD - ELIMINAR
    //==========================================

    public function eliminar_clientes_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM CLIENTES WHERE cli_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_usuarios_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM USUARIOS WHERE usu_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_campanas_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM CAMPANAS WHERE cam_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_anuncios_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM ANUNCIOS WHERE anu_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_segmentos_audiencia_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM SEGMENTOS_AUDIENCIA WHERE seg_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_alertas_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM ALERTAS WHERE ale_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function eliminar_reportes_personalizados_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "DELETE FROM REPORTES_PERSONALIZADOS WHERE rep_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    //==========================================
    // FUNCIONES ESPECIALES - REPORTES Y ANÁLISIS
    //==========================================

    public function obtener_resumen_campana_m($cam_id, $fecha_inicio, $fecha_fin)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "CALL SP_ResumenCampana('" . $cam_id . "', '" . $fecha_inicio . "', '" . $fecha_fin . "')";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function comparar_anuncios_m($cam_id, $fecha_inicio, $fecha_fin)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "CALL SP_CompararAnuncios('" . $cam_id . "', '" . $fecha_inicio . "', '" . $fecha_fin . "')";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_campanas_por_cliente_m($cli_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT ca.*, cu.cue_nombre, p.pla_nombre
                FROM CAMPANAS ca
                INNER JOIN CUENTAS_PUBLICITARIAS cu ON ca.cam_cue_id = cu.cue_id
                INNER JOIN PLATAFORMAS_PUBLICITARIAS p ON cu.cue_pla_id = p.pla_id
                WHERE cu.cue_cli_id = '" . $cli_id . "'
                ORDER BY ca.cam_fecha_inicio DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_metricas_por_campana_m($cam_id, $fecha_inicio, $fecha_fin)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM METRICAS_DIARIAS 
                WHERE met_cam_id = '" . $cam_id . "' 
                AND met_fecha BETWEEN '" . $fecha_inicio . "' AND '" . $fecha_fin . "'
                ORDER BY met_fecha DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_conversiones_por_campana_m($cam_id, $fecha_inicio, $fecha_fin)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT co.*, a.anu_nombre
                FROM CONVERSIONES co
                LEFT JOIN ANUNCIOS a ON co.con_anu_id = a.anu_id
                WHERE co.con_cam_id = '" . $cam_id . "'
                AND DATE(co.con_fecha_hora) BETWEEN '" . $fecha_inicio . "' AND '" . $fecha_fin . "'
                ORDER BY co.con_fecha_hora DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_dashboard_cliente_m($cli_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT 
                    COUNT(DISTINCT ca.cam_id) as total_campanas,
                    COUNT(DISTINCT CASE WHEN ca.cam_estado = 'Activa' THEN ca.cam_id END) as campanas_activas,
                    SUM(ca.cam_presupuesto_total) as presupuesto_total,
                    SUM(m.met_gasto) as gasto_total,
                    SUM(m.met_impresiones) as impresiones_totales,
                    SUM(m.met_clicks) as clicks_totales,
                    SUM(m.met_conversiones) as conversiones_totales,
                    AVG(m.met_ctr) as ctr_promedio,
                    AVG(m.met_roas) as roas_promedio
                FROM CLIENTES c
                LEFT JOIN CUENTAS_PUBLICITARIAS cu ON c.cli_id = cu.cue_cli_id
                LEFT JOIN CAMPANAS ca ON cu.cue_id = ca.cam_cue_id
                LEFT JOIN METRICAS_DIARIAS m ON ca.cam_id = m.met_cam_id
                WHERE c.cli_id = '" . $cli_id . "'
                AND m.met_fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_alertas_activas_cliente_m($cli_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT ha.*, al.ale_nombre, al.ale_tipo
                FROM HISTORIAL_ALERTAS ha
                INNER JOIN ALERTAS al ON ha.hal_ale_id = al.ale_id
                WHERE al.ale_cli_id = '" . $cli_id . "'
                AND ha.hal_leida = 0
                ORDER BY ha.hal_fecha_hora DESC
                LIMIT 10";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function marcar_alerta_leida_m($hal_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "UPDATE HISTORIAL_ALERTAS 
                SET hal_leida = 1, hal_fecha_lectura = NOW() 
                WHERE hal_id = '" . $hal_id . "'";
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function obtener_top_campanas_rendimiento_m($cli_id, $metrica = 'conversiones', $limite = 5)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $orden_sql = "SUM(m.met_conversiones) DESC";
        
        switch($metrica) {
            case 'roas':
                $orden_sql = "AVG(m.met_roas) DESC";
                break;
            case 'ctr':
                $orden_sql = "AVG(m.met_ctr) DESC";
                break;
            case 'engagement':
                $orden_sql = "SUM(m.met_engagement) DESC";
                break;
        }
        
        $sql = "SELECT 
                    ca.cam_id,
                    ca.cam_nombre,
                    ca.cam_objetivo,
                    ca.cam_estado,
                    SUM(m.met_impresiones) as total_impresiones,
                    SUM(m.met_clicks) as total_clicks,
                    AVG(m.met_ctr) as ctr_promedio,
                    SUM(m.met_conversiones) as total_conversiones,
                    SUM(m.met_gasto) as gasto_total,
                    AVG(m.met_roas) as roas_promedio
                FROM CAMPANAS ca
                INNER JOIN CUENTAS_PUBLICITARIAS cu ON ca.cam_cue_id = cu.cue_id
                LEFT JOIN METRICAS_DIARIAS m ON ca.cam_id = m.met_cam_id
                WHERE cu.cue_cli_id = '" . $cli_id . "'
                AND m.met_fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                GROUP BY ca.cam_id
                ORDER BY " . $orden_sql . "
                LIMIT " . $limite;
        
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function calcular_roi_campana_m($cam_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT FN_CalcularROI('" . $cam_id . "') as roi";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_presupuesto_restante_m($cam_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT FN_PresupuestoRestante('" . $cam_id . "') as presupuesto_restante";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_mejor_anuncio_m($cam_id, $metrica = 'conversiones')
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT FN_MejorAnuncio('" . $cam_id . "', '" . $metrica . "') as mejor_anuncio_id";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    //==========================================
    // FUNCIONES PARA VISUALIZAR PDF
    //==========================================

    public function obtener_clientes_pdf_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM CLIENTES ORDER BY cli_nombre_empresa";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_campanas_pdf_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT ca.*, cu.cue_nombre, c.cli_nombre_empresa, p.pla_nombre
                FROM CAMPANAS ca
                INNER JOIN CUENTAS_PUBLICITARIAS cu ON ca.cam_cue_id = cu.cue_id
                INNER JOIN CLIENTES c ON cu.cue_cli_id = c.cli_id
                INNER JOIN PLATAFORMAS_PUBLICITARIAS p ON cu.cue_pla_id = p.pla_id
                ORDER BY ca.cam_fecha_inicio DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_metricas_pdf_m($cam_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT m.*, ca.cam_nombre, a.anu_nombre
                FROM METRICAS_DIARIAS m
                INNER JOIN CAMPANAS ca ON m.met_cam_id = ca.cam_id
                LEFT JOIN ANUNCIOS a ON m.met_anu_id = a.anu_id
                WHERE m.met_cam_id = '" . $cam_id . "'
                ORDER BY m.met_fecha DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_conversiones_pdf_m($cam_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT co.*, ca.cam_nombre, a.anu_nombre
                FROM CONVERSIONES co
                INNER JOIN CAMPANAS ca ON co.con_cam_id = ca.cam_id
                LEFT JOIN ANUNCIOS a ON co.con_anu_id = a.anu_id
                WHERE co.con_cam_id = '" . $cam_id . "'
                ORDER BY co.con_fecha_hora DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    //==========================================
    // FUNCIONES AUXILIARES
    //==========================================

    public function verificar_email_existe_m($email)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT COUNT(*) as total FROM USUARIOS WHERE usu_email = '" . $email . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        $r = $resultado->fetch_object();
        return $r->total > 0;
    }

    public function obtener_usuarios_por_cliente_m($cli_id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM USUARIOS WHERE usu_cli_id = '" . $cli_id . "' ORDER BY usu_nombre, usu_apellido";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function cambiar_estado_campana_m($cam_id, $nuevo_estado)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "UPDATE CAMPANAS SET cam_estado = '" . $nuevo_estado . "' WHERE cam_id = '" . $cam_id . "'";
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function cambiar_estado_anuncio_m($anu_id, $nuevo_estado)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "UPDATE ANUNCIOS SET anu_estado = '" . $nuevo_estado . "' WHERE anu_id = '" . $anu_id . "'";
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }


    //==========================================
    // FUNCIONES CRUD - OBTENER TODAS (TABLAS)
    //==========================================

    public function obtener_clientes_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM CLIENTES ORDER BY cli_nombre_empresa";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_usuarios_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT u.*, c.cli_nombre_empresa 
                FROM USUARIOS u 
                INNER JOIN CLIENTES c ON u.usu_cli_id = c.cli_id 
                ORDER BY u.usu_nombre, u.usu_apellido";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_plataformas_publicitarias_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM PLATAFORMAS_PUBLICITARIAS WHERE pla_estado = 'Activa' ORDER BY pla_nombre";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_cuentas_publicitarias_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT cu.*, c.cli_nombre_empresa, p.pla_nombre 
                FROM CUENTAS_PUBLICITARIAS cu
                INNER JOIN CLIENTES c ON cu.cue_cli_id = c.cli_id
                INNER JOIN PLATAFORMAS_PUBLICITARIAS p ON cu.cue_pla_id = p.pla_id
                ORDER BY c.cli_nombre_empresa, p.pla_nombre";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_campanas_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT ca.*, cu.cue_nombre, c.cli_nombre_empresa, p.pla_nombre
                FROM CAMPANAS ca
                INNER JOIN CUENTAS_PUBLICITARIAS cu ON ca.cam_cue_id = cu.cue_id
                INNER JOIN CLIENTES c ON cu.cue_cli_id = c.cli_id
                INNER JOIN PLATAFORMAS_PUBLICITARIAS p ON cu.cue_pla_id = p.pla_id
                ORDER BY ca.cam_fecha_creacion DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_segmentos_audiencia_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT s.*, c.cli_nombre_empresa
                FROM SEGMENTOS_AUDIENCIA s
                INNER JOIN CLIENTES c ON s.seg_cli_id = c.cli_id
                ORDER BY c.cli_nombre_empresa, s.seg_nombre";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_anuncios_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT a.*, ca.cam_nombre
                FROM ANUNCIOS a
                INNER JOIN CAMPANAS ca ON a.anu_cam_id = ca.cam_id
                ORDER BY a.anu_fecha_creacion DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_metricas_diarias_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT m.*, ca.cam_nombre, a.anu_nombre
                FROM METRICAS_DIARIAS m
                INNER JOIN CAMPANAS ca ON m.met_cam_id = ca.cam_id
                LEFT JOIN ANUNCIOS a ON m.met_anu_id = a.anu_id
                WHERE m.met_fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                ORDER BY m.met_fecha DESC, m.met_hora DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_conversiones_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT co.*, ca.cam_nombre, a.anu_nombre
                FROM CONVERSIONES co
                INNER JOIN CAMPANAS ca ON co.con_cam_id = ca.cam_id
                LEFT JOIN ANUNCIOS a ON co.con_anu_id = a.anu_id
                WHERE co.con_fecha_hora >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                ORDER BY co.con_fecha_hora DESC";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_alertas_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT al.*, c.cli_nombre_empresa
                FROM ALERTAS al
                INNER JOIN CLIENTES c ON al.ale_cli_id = c.cli_id
                ORDER BY al.ale_activa DESC, c.cli_nombre_empresa";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    public function obtener_reportes_personalizados_m()
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT r.*, c.cli_nombre_empresa
                FROM REPORTES_PERSONALIZADOS r
                INNER JOIN CLIENTES c ON r.rep_cli_id = c.cli_id
                ORDER BY c.cli_nombre_empresa, r.rep_nombre";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        return $resultado;
    }

    //==========================================
    // FUNCIONES CRUD - INSERTAR
    //==========================================

    public function insertar_clientes_m(ClientesModelo $clientes_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $nombre_empresa = $clientes_m->obtenerNombreEmpresa();
        $razon_social = $clientes_m->obtenerRazonSocial();
        $nit = $clientes_m->obtenerNit();
        $industria = $clientes_m->obtenerIndustria();
        $email = $clientes_m->obtenerEmail();
        $telefono = $clientes_m->obtenerTelefono();
        $direccion = $clientes_m->obtenerDireccion();
        $ciudad = $clientes_m->obtenerCiudad();
        $pais = $clientes_m->obtenerPais();
        $sitio_web = $clientes_m->obtenerSitioWeb();
        $tipo_plan = $clientes_m->obtenerTipoPlan();
        $estado = $clientes_m->obtenerEstado();
        
        $sql = "INSERT INTO CLIENTES (cli_nombre_empresa, cli_razon_social, cli_nit, cli_industria, cli_email_contacto, cli_telefono, cli_direccion, cli_ciudad, cli_pais, cli_sitio_web, cli_tipo_plan, cli_estado) 
                VALUES ('" . $nombre_empresa . "', '" . $razon_social . "', '" . $nit . "', '" . $industria . "', '" . $email . "', '" . $telefono . "', '" . $direccion . "', '" . $ciudad . "', '" . $pais . "', '" . $sitio_web . "', '" . $tipo_plan . "', '" . $estado . "')";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function insertar_usuarios_m(UsuariosModelo $usuarios_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $cli_id = $usuarios_m->obtenerClienteId();
        $nombre = $usuarios_m->obtenerNombre();
        $apellido = $usuarios_m->obtenerApellido();
        $email = $usuarios_m->obtenerEmail();
        $password = $usuarios_m->obtenerPasswordHash();
        $rol = $usuarios_m->obtenerRol();
        $telefono = $usuarios_m->obtenerTelefono();
        $estado = $usuarios_m->obtenerEstado();
        
        if (isset($_POST['guardar'])) {
            $pass_fuerte = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO USUARIOS (usu_cli_id, usu_nombre, usu_apellido, usu_email, usu_password_hash, usu_rol, usu_telefono, usu_estado) 
                    VALUES ('" . $cli_id . "', '" . $nombre . "', '" . $apellido . "', '" . $email . "', '" . $pass_fuerte . "', '" . $rol . "', '" . $telefono . "', '" . $estado . "')";
            
            if ($conexion->consultar_informacion($sql)) {
                echo "<script>alert('Usuario registrado: $nombre $apellido'); window.location = 'Controlador.php?accion=modulo_usuarios';</script>";
            }
        }
        
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function insertar_campanas_m(CampanasModelo $campanas_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $cue_id = $campanas_m->obtenerCuentaId();
        $nombre = $campanas_m->obtenerNombre();
        $objetivo = $campanas_m->obtenerObjetivo();
        $descripcion = $campanas_m->obtenerDescripcion();
        $id_externo = $campanas_m->obtenerIdExterno();
        $fecha_inicio = $campanas_m->obtenerFechaInicio();
        $fecha_fin = $campanas_m->obtenerFechaFin();
        $presupuesto_total = $campanas_m->obtenerPresupuestoTotal();
        $presupuesto_diario = $campanas_m->obtenerPresupuestoDiario();
        $moneda = $campanas_m->obtenerMoneda();
        $estado = $campanas_m->obtenerEstado();
        
        $sql = "INSERT INTO CAMPANAS (cam_cue_id, cam_nombre, cam_objetivo, cam_descripcion, cam_id_externo, cam_fecha_inicio, cam_fecha_fin, cam_presupuesto_total, cam_presupuesto_diario, cam_moneda, cam_estado) 
                VALUES ('" . $cue_id . "', '" . $nombre . "', '" . $objetivo . "', '" . $descripcion . "', '" . $id_externo . "', '" . $fecha_inicio . "', '" . $fecha_fin . "', '" . $presupuesto_total . "', '" . $presupuesto_diario . "', '" . $moneda . "', '" . $estado . "')";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function insertar_anuncios_m(AnunciosModelo $anuncios_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $cam_id = $anuncios_m->obtenerCampanaId();
        $nombre = $anuncios_m->obtenerNombre();
        $tipo = $anuncios_m->obtenerTipo();
        $titulo = $anuncios_m->obtenerTitulo();
        $descripcion = $anuncios_m->obtenerDescripcion();
        $url_destino = $anuncios_m->obtenerUrlDestino();
        $llamada_accion = $anuncios_m->obtenerLlamadaAccion();
        $id_externo = $anuncios_m->obtenerIdExterno();
        $estado = $anuncios_m->obtenerEstado();
        
        $sql = "INSERT INTO ANUNCIOS (anu_cam_id, anu_nombre, anu_tipo, anu_titulo, anu_descripcion, anu_url_destino, anu_llamada_accion, anu_id_externo, anu_estado) 
                VALUES ('" . $cam_id . "', '" . $nombre . "', '" . $tipo . "', '" . $titulo . "', '" . $descripcion . "', '" . $url_destino . "', '" . $llamada_accion . "', '" . $id_externo . "', '" . $estado . "')";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function insertar_metricas_diarias_m(MetricasDiariasModelo $metricas_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $cam_id = $metricas_m->obtenerCampanaId();
        $anu_id = $metricas_m->obtenerAnuncioId();
        $fecha = $metricas_m->obtenerFecha();
        $impresiones = $metricas_m->obtenerImpresiones();
        $alcance = $metricas_m->obtenerAlcance();
        $clicks = $metricas_m->obtenerClicks();
        $engagement = $metricas_m->obtenerEngagement();
        $conversiones = $metricas_m->obtenerConversiones();
        $valor_conversiones = $metricas_m->obtenerValorConversiones();
        $gasto = $metricas_m->obtenerGasto();
        
        $sql = "CALL SP_RegistrarMetricasDiarias('" . $cam_id . "', '" . $anu_id . "', '" . $fecha . "', '" . $impresiones . "', '" . $alcance . "', '" . $clicks . "', '" . $engagement . "', '" . $conversiones . "', '" . $valor_conversiones . "', '" . $gasto . "')";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function insertar_conversiones_m(ConversionesModelo $conversiones_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $cam_id = $conversiones_m->obtenerCampanaId();
        $anu_id = $conversiones_m->obtenerAnuncioId();
        $fecha_hora = $conversiones_m->obtenerFechaHora();
        $tipo = $conversiones_m->obtenerTipo();
        $valor = $conversiones_m->obtenerValor();
        $id_transaccion = $conversiones_m->obtenerIdTransaccion();
        $origen_trafico = $conversiones_m->obtenerOrigenTrafico();
        $dispositivo = $conversiones_m->obtenerDispositivo();
        $ubicacion = $conversiones_m->obtenerUbicacionGeografica();
        
        $sql = "INSERT INTO CONVERSIONES (con_cam_id, con_anu_id, con_fecha_hora, con_tipo, con_valor, con_id_transaccion, con_origen_trafico, con_dispositivo, con_ubicacion_geografica) 
                VALUES ('" . $cam_id . "', '" . $anu_id . "', '" . $fecha_hora . "', '" . $tipo . "', '" . $valor . "', '" . $id_transaccion . "', '" . $origen_trafico . "', '" . $dispositivo . "', '" . $ubicacion . "')";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    //==========================================
    // FUNCIONES CRUD - CONSULTAR POR ID
    //==========================================

    public function consultar_clientes_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM CLIENTES WHERE cli_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        $r = $resultado->fetch_object();
        $clientes_m = new ClientesModelo($r->cli_id, $r->cli_nombre_empresa, $r->cli_razon_social, $r->cli_nit, $r->cli_industria, $r->cli_email_contacto, $r->cli_telefono, $r->cli_direccion, $r->cli_ciudad, $r->cli_pais, $r->cli_sitio_web, $r->cli_fecha_registro, $r->cli_tipo_plan, $r->cli_estado);
        return $clientes_m;
    }

    public function consultar_usuarios_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM USUARIOS WHERE usu_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        $r = $resultado->fetch_object();
        $usuarios_m = new UsuariosModelo($r->usu_id, $r->usu_cli_id, $r->usu_nombre, $r->usu_apellido, $r->usu_email, $r->usu_password_hash, $r->usu_rol, $r->usu_telefono, $r->usu_fecha_creacion, $r->usu_ultimo_acceso, $r->usu_estado);
        return $usuarios_m;
    }

    public function consultar_campanas_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM CAMPANAS WHERE cam_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        $r = $resultado->fetch_object();
        $campanas_m = new CampanasModelo($r->cam_id, $r->cam_cue_id, $r->cam_nombre, $r->cam_objetivo, $r->cam_descripcion, $r->cam_id_externo, $r->cam_fecha_inicio, $r->cam_fecha_fin, $r->cam_presupuesto_total, $r->cam_presupuesto_diario, $r->cam_moneda, $r->cam_estado, $r->cam_fecha_creacion, $r->cam_fecha_modificacion);
        return $campanas_m;
    }

    public function consultar_anuncios_id_m($id)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        $sql = "SELECT * FROM ANUNCIOS WHERE anu_id = '" . $id . "'";
        $conexion->consultar_informacion($sql);
        $resultado = $conexion->obtener_resultados();
        $conexion->cerrar_conexion();
        $r = $resultado->fetch_object();
        $anuncios_m = new AnunciosModelo($r->anu_id, $r->anu_cam_id, $r->anu_nombre, $r->anu_tipo, $r->anu_titulo, $r->anu_descripcion, $r->anu_url_destino, $r->anu_llamada_accion, $r->anu_id_externo, $r->anu_estado, $r->anu_fecha_creacion);
        return $anuncios_m;
    }

    //==========================================
    // FUNCIONES CRUD - ACTUALIZAR
    //==========================================

    public function actualizar_clientes_id_m(ClientesModelo $clientes_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $id = $clientes_m->obtenerId();
        $nombre_empresa = $clientes_m->obtenerNombreEmpresa();
        $razon_social = $clientes_m->obtenerRazonSocial();
        $nit = $clientes_m->obtenerNit();
        $industria = $clientes_m->obtenerIndustria();
        $email = $clientes_m->obtenerEmail();
        $telefono = $clientes_m->obtenerTelefono();
        $direccion = $clientes_m->obtenerDireccion();
        $ciudad = $clientes_m->obtenerCiudad();
        $pais = $clientes_m->obtenerPais();
        $sitio_web = $clientes_m->obtenerSitioWeb();
        $tipo_plan = $clientes_m->obtenerTipoPlan();
        $estado = $clientes_m->obtenerEstado();
        
        $sql = "UPDATE CLIENTES SET 
                cli_nombre_empresa = '" . $nombre_empresa . "',
                cli_razon_social = '" . $razon_social . "',
                cli_nit = '" . $nit . "',
                cli_industria = '" . $industria . "',
                cli_email_contacto = '" . $email . "',
                cli_telefono = '" . $telefono . "',
                cli_direccion = '" . $direccion . "',
                cli_ciudad = '" . $ciudad . "',
                cli_pais = '" . $pais . "',
                cli_sitio_web = '" . $sitio_web . "',
                cli_tipo_plan = '" . $tipo_plan . "',
                cli_estado = '" . $estado . "'
                WHERE cli_id = '" . $id . "'";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function actualizar_usuarios_id_m(UsuariosModelo $usuarios_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $id = $usuarios_m->obtenerId();
        $cli_id = $usuarios_m->obtenerClienteId();
        $nombre = $usuarios_m->obtenerNombre();
        $apellido = $usuarios_m->obtenerApellido();
        $email = $usuarios_m->obtenerEmail();
        $rol = $usuarios_m->obtenerRol();
        $telefono = $usuarios_m->obtenerTelefono();
        $estado = $usuarios_m->obtenerEstado();
        
        $sql = "UPDATE USUARIOS SET 
                usu_cli_id = '" . $cli_id . "',
                usu_nombre = '" . $nombre . "',
                usu_apellido = '" . $apellido . "',
                usu_email = '" . $email . "',
                usu_rol = '" . $rol . "',
                usu_telefono = '" . $telefono . "',
                usu_estado = '" . $estado . "'
                WHERE usu_id = '" . $id . "'";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }

    public function actualizar_campanas_id_m(CampanasModelo $campanas_m)
    {
        $conexion = new Conexion();
        $conexion->abrir_conexion();
        
        $id = $campanas_m->obtenerId();
        $nombre = $campanas_m->obtenerNombre();
        $objetivo = $campanas_m->obtenerObjetivo();
        $descripcion = $campanas_m->obtenerDescripcion();
        $fecha_inicio = $campanas_m->obtenerFechaInicio();
        $fecha_fin = $campanas_m->obtenerFechaFin();
        $presupuesto_total = $campanas_m->obtenerPresupuestoTotal();
        $presupuesto_diario = $campanas_m->obtenerPresupuestoDiario();
        $estado = $campanas_m->obtenerEstado();
        
        $sql = "UPDATE CAMPANAS SET 
                cam_nombre = '" . $nombre . "',
                cam_objetivo = '" . $objetivo . "',
                cam_descripcion = '" . $descripcion . "',
                cam_fecha_inicio = '" . $fecha_inicio . "',
                cam_fecha_fin = '" . $fecha_fin . "',
                cam_presupuesto_total = '" . $presupuesto_total . "',
                cam_presupuesto_diario = '" . $presupuesto_diario . "',
                cam_estado = '" . $estado . "'
                WHERE cam_id = '" . $id . "'";
        
        $conexion->consultar_informacion($sql);
        $filasbd = $conexion->obtener_filas();
        $conexion->cerrar_conexion();
        return $filasbd;
    }
}