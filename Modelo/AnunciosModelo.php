<?php

class AnunciosModelo {
    protected $anu_id;
    protected $anu_cam_id;
    protected $anu_nombre;
    protected $anu_tipo;
    protected $anu_titulo;
    protected $anu_descripcion;
    protected $anu_url_destino;
    protected $anu_llamada_accion;
    protected $anu_id_externo;
    protected $anu_estado;
    protected $anu_fecha_creacion;

    public function __construct($id, $cam_id, $nombre, $tipo, $titulo, $descripcion, $url_destino, $llamada_accion, $id_externo, $estado, $fecha_creacion) {
        $this->anu_id = $id;
        $this->anu_cam_id = $cam_id;
        $this->anu_nombre = $nombre;
        $this->anu_tipo = $tipo;
        $this->anu_titulo = $titulo;
        $this->anu_descripcion = $descripcion;
        $this->anu_url_destino = $url_destino;
        $this->anu_llamada_accion = $llamada_accion;
        $this->anu_id_externo = $id_externo;
        $this->anu_estado = $estado;
        $this->anu_fecha_creacion = $fecha_creacion;
    }

    // Getters
    public function obtenerId() { return $this->anu_id; }
    public function obtenerCampanaId() { return $this->anu_cam_id; }
    public function obtenerNombre() { return $this->anu_nombre; }
    public function obtenerTipo() { return $this->anu_tipo; }
    public function obtenerTitulo() { return $this->anu_titulo; }
    public function obtenerDescripcion() { return $this->anu_descripcion; }
    public function obtenerUrlDestino() { return $this->anu_url_destino; }
    public function obtenerLlamadaAccion() { return $this->anu_llamada_accion; }
    public function obtenerIdExterno() { return $this->anu_id_externo; }
    public function obtenerEstado() { return $this->anu_estado; }
    public function obtenerFechaCreacion() { return $this->anu_fecha_creacion; }
}