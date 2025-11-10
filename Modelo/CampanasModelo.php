<?php

class CampanasModelo {
    protected $cam_id;
    protected $cam_cue_id;
    protected $cam_nombre;
    protected $cam_objetivo;
    protected $cam_descripcion;
    protected $cam_id_externo;
    protected $cam_fecha_inicio;
    protected $cam_fecha_fin;
    protected $cam_presupuesto_total;
    protected $cam_presupuesto_diario;
    protected $cam_moneda;
    protected $cam_estado;
    protected $cam_fecha_creacion;
    protected $cam_fecha_modificacion;

    public function __construct($id, $cue_id, $nombre, $objetivo, $descripcion, $id_externo, $fecha_inicio, $fecha_fin, $presupuesto_total, $presupuesto_diario, $moneda, $estado, $fecha_creacion, $fecha_modificacion) {
        $this->cam_id = $id;
        $this->cam_cue_id = $cue_id;
        $this->cam_nombre = $nombre;
        $this->cam_objetivo = $objetivo;
        $this->cam_descripcion = $descripcion;
        $this->cam_id_externo = $id_externo;
        $this->cam_fecha_inicio = $fecha_inicio;
        $this->cam_fecha_fin = $fecha_fin;
        $this->cam_presupuesto_total = $presupuesto_total;
        $this->cam_presupuesto_diario = $presupuesto_diario;
        $this->cam_moneda = $moneda;
        $this->cam_estado = $estado;
        $this->cam_fecha_creacion = $fecha_creacion;
        $this->cam_fecha_modificacion = $fecha_modificacion;
    }

    // Getters
    public function obtenerId() { return $this->cam_id; }
    public function obtenerCuentaId() { return $this->cam_cue_id; }
    public function obtenerNombre() { return $this->cam_nombre; }
    public function obtenerObjetivo() { return $this->cam_objetivo; }
    public function obtenerDescripcion() { return $this->cam_descripcion; }
    public function obtenerIdExterno() { return $this->cam_id_externo; }
    public function obtenerFechaInicio() { return $this->cam_fecha_inicio; }
    public function obtenerFechaFin() { return $this->cam_fecha_fin; }
    public function obtenerPresupuestoTotal() { return $this->cam_presupuesto_total; }
    public function obtenerPresupuestoDiario() { return $this->cam_presupuesto_diario; }
    public function obtenerMoneda() { return $this->cam_moneda; }
    public function obtenerEstado() { return $this->cam_estado; }
    public function obtenerFechaCreacion() { return $this->cam_fecha_creacion; }
    public function obtenerFechaModificacion() { return $this->cam_fecha_modificacion; }
}