<?php

class PlataformasPublicitariasModelo {
    protected $pla_id;
    protected $pla_nombre;
    protected $pla_descripcion;
    protected $pla_tipo;
    protected $pla_icono_url;
    protected $pla_api_disponible;
    protected $pla_estado;

    public function __construct($id, $nombre, $descripcion, $tipo, $icono_url, $api_disponible, $estado) {
        $this->pla_id = $id;
        $this->pla_nombre = $nombre;
        $this->pla_descripcion = $descripcion;
        $this->pla_tipo = $tipo;
        $this->pla_icono_url = $icono_url;
        $this->pla_api_disponible = $api_disponible;
        $this->pla_estado = $estado;
    }

    // Getters
    public function obtenerId() { return $this->pla_id; }
    public function obtenerNombre() { return $this->pla_nombre; }
    public function obtenerDescripcion() { return $this->pla_descripcion; }
    public function obtenerTipo() { return $this->pla_tipo; }
    public function obtenerIconoUrl() { return $this->pla_icono_url; }
    public function obtenerApiDisponible() { return $this->pla_api_disponible; }
    public function obtenerEstado() { return $this->pla_estado; }
}