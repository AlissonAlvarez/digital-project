<?php

class ConversionesModelo {
    protected $con_id;
    protected $con_cam_id;
    protected $con_anu_id;
    protected $con_fecha_hora;
    protected $con_tipo;
    protected $con_valor;
    protected $con_id_transaccion;
    protected $con_origen_trafico;
    protected $con_dispositivo;
    protected $con_ubicacion_geografica;

    public function __construct($id, $cam_id, $anu_id, $fecha_hora, $tipo, $valor, $id_transaccion, $origen_trafico, $dispositivo, $ubicacion_geografica) {
        $this->con_id = $id;
        $this->con_cam_id = $cam_id;
        $this->con_anu_id = $anu_id;
        $this->con_fecha_hora = $fecha_hora;
        $this->con_tipo = $tipo;
        $this->con_valor = $valor;
        $this->con_id_transaccion = $id_transaccion;
        $this->con_origen_trafico = $origen_trafico;
        $this->con_dispositivo = $dispositivo;
        $this->con_ubicacion_geografica = $ubicacion_geografica;
    }

    // Getters
    public function obtenerId() { return $this->con_id; }
    public function obtenerCampanaId() { return $this->con_cam_id; }
    public function obtenerAnuncioId() { return $this->con_anu_id; }
    public function obtenerFechaHora() { return $this->con_fecha_hora; }
    public function obtenerTipo() { return $this->con_tipo; }
    public function obtenerValor() { return $this->con_valor; }
    public function obtenerIdTransaccion() { return $this->con_id_transaccion; }
    public function obtenerOrigenTrafico() { return $this->con_origen_trafico; }
    public function obtenerDispositivo() { return $this->con_dispositivo; }
    public function obtenerUbicacionGeografica() { return $this->con_ubicacion_geografica; }
}
