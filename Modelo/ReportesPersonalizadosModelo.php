<?php

class ReportesPersonalizadosModelo {
    protected $rep_id;
    protected $rep_cli_id;
    protected $rep_nombre;
    protected $rep_descripcion;
    protected $rep_tipo;
    protected $rep_metricas_incluidas;
    protected $rep_filtros;
    protected $rep_formato;
    protected $rep_envio_automatico;
    protected $rep_destinatarios_email;
    protected $rep_fecha_creacion;
    protected $rep_estado;

    public function __construct($id, $cli_id, $nombre, $descripcion, $tipo, $metricas_incluidas, $filtros, $formato, $envio_automatico, $destinatarios_email, $fecha_creacion, $estado) {
        $this->rep_id = $id;
        $this->rep_cli_id = $cli_id;
        $this->rep_nombre = $nombre;
        $this->rep_descripcion = $descripcion;
        $this->rep_tipo = $tipo;
        $this->rep_metricas_incluidas = $metricas_incluidas;
        $this->rep_filtros = $filtros;
        $this->rep_formato = $formato;
        $this->rep_envio_automatico = $envio_automatico;
        $this->rep_destinatarios_email = $destinatarios_email;
        $this->rep_fecha_creacion = $fecha_creacion;
        $this->rep_estado = $estado;
    }

    // Getters
    public function obtenerId() { return $this->rep_id; }
    public function obtenerClienteId() { return $this->rep_cli_id; }
    public function obtenerNombre() { return $this->rep_nombre; }
    public function obtenerDescripcion() { return $this->rep_descripcion; }
    public function obtenerTipo() { return $this->rep_tipo; }
    public function obtenerMetricasIncluidas() { return $this->rep_metricas_incluidas; }
    public function obtenerFiltros() { return $this->rep_filtros; }
    public function obtenerFormato() { return $this->rep_formato; }
    public function obtenerEnvioAutomatico() { return $this->rep_envio_automatico; }
    public function obtenerDestinatariosEmail() { return $this->rep_destinatarios_email; }
    public function obtenerFechaCreacion() { return $this->rep_fecha_creacion; }
    public function obtenerEstado() { return $this->rep_estado; }
}
