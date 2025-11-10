<?php

class AlertasModelo {
    protected $ale_id;
    protected $ale_cli_id;
    protected $ale_nombre;
    protected $ale_tipo;
    protected $ale_condicion;
    protected $ale_destinatarios;
    protected $ale_metodo;
    protected $ale_activa;
    protected $ale_fecha_creacion;

    public function __construct($id, $cli_id, $nombre, $tipo, $condicion, $destinatarios, $metodo, $activa, $fecha_creacion) {
        $this->ale_id = $id;
        $this->ale_cli_id = $cli_id;
        $this->ale_nombre = $nombre;
        $this->ale_tipo = $tipo;
        $this->ale_condicion = $condicion;
        $this->ale_destinatarios = $destinatarios;
        $this->ale_metodo = $metodo;
        $this->ale_activa = $activa;
        $this->ale_fecha_creacion = $fecha_creacion;
    }

    // Getters
    public function obtenerId() { return $this->ale_id; }
    public function obtenerClienteId() { return $this->ale_cli_id; }
    public function obtenerNombre() { return $this->ale_nombre; }
    public function obtenerTipo() { return $this->ale_tipo; }
    public function obtenerCondicion() { return $this->ale_condicion; }
    public function obtenerDestinatarios() { return $this->ale_destinatarios; }
    public function obtenerMetodo() { return $this->ale_metodo; }
    public function obtenerActiva() { return $this->ale_activa; }
    public function obtenerFechaCreacion() { return $this->ale_fecha_creacion; }
}