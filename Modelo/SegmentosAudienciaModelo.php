<?php

class SegmentosAudienciaModelo {
    protected $seg_id;
    protected $seg_cli_id;
    protected $seg_nombre;
    protected $seg_descripcion;
    protected $seg_edad_min;
    protected $seg_edad_max;
    protected $seg_genero;
    protected $seg_ubicaciones;
    protected $seg_intereses;
    protected $seg_idiomas;
    protected $seg_comportamientos;
    protected $seg_tamano_estimado;
    protected $seg_fecha_creacion;

    public function __construct($id, $cli_id, $nombre, $descripcion, $edad_min, $edad_max, $genero, $ubicaciones, $intereses, $idiomas, $comportamientos, $tamano_estimado, $fecha_creacion) {
        $this->seg_id = $id;
        $this->seg_cli_id = $cli_id;
        $this->seg_nombre = $nombre;
        $this->seg_descripcion = $descripcion;
        $this->seg_edad_min = $edad_min;
        $this->seg_edad_max = $edad_max;
        $this->seg_genero = $genero;
        $this->seg_ubicaciones = $ubicaciones;
        $this->seg_intereses = $intereses;
        $this->seg_idiomas = $idiomas;
        $this->seg_comportamientos = $comportamientos;
        $this->seg_tamano_estimado = $tamano_estimado;
        $this->seg_fecha_creacion = $fecha_creacion;
    }

    // Getters
    public function obtenerId() { return $this->seg_id; }
    public function obtenerClienteId() { return $this->seg_cli_id; }
    public function obtenerNombre() { return $this->seg_nombre; }
    public function obtenerDescripcion() { return $this->seg_descripcion; }
    public function obtenerEdadMin() { return $this->seg_edad_min; }
    public function obtenerEdadMax() { return $this->seg_edad_max; }
    public function obtenerGenero() { return $this->seg_genero; }
    public function obtenerUbicaciones() { return $this->seg_ubicaciones; }
    public function obtenerIntereses() { return $this->seg_intereses; }
    public function obtenerIdiomas() { return $this->seg_idiomas; }
    public function obtenerComportamientos() { return $this->seg_comportamientos; }
    public function obtenerTamanoEstimado() { return $this->seg_tamano_estimado; }
    public function obtenerFechaCreacion() { return $this->seg_fecha_creacion; }
}