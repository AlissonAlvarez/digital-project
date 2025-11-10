<?php

class ClientesModelo {
    protected $cli_id;
    protected $cli_nombre_empresa;
    protected $cli_razon_social;
    protected $cli_nit;
    protected $cli_industria;
    protected $cli_email_contacto;
    protected $cli_telefono;
    protected $cli_direccion;
    protected $cli_ciudad;
    protected $cli_pais;
    protected $cli_sitio_web;
    protected $cli_fecha_registro;
    protected $cli_tipo_plan;
    protected $cli_estado;

    public function __construct($id, $nombre_empresa, $razon_social, $nit, $industria, $email, $telefono, $direccion, $ciudad, $pais, $sitio_web, $fecha_registro, $tipo_plan, $estado) {
        $this->cli_id = $id;
        $this->cli_nombre_empresa = $nombre_empresa;
        $this->cli_razon_social = $razon_social;
        $this->cli_nit = $nit;
        $this->cli_industria = $industria;
        $this->cli_email_contacto = $email;
        $this->cli_telefono = $telefono;
        $this->cli_direccion = $direccion;
        $this->cli_ciudad = $ciudad;
        $this->cli_pais = $pais;
        $this->cli_sitio_web = $sitio_web;
        $this->cli_fecha_registro = $fecha_registro;
        $this->cli_tipo_plan = $tipo_plan;
        $this->cli_estado = $estado;
    }

    // Getters
    public function obtenerId() { return $this->cli_id; }
    public function obtenerNombreEmpresa() { return $this->cli_nombre_empresa; }
    public function obtenerRazonSocial() { return $this->cli_razon_social; }
    public function obtenerNit() { return $this->cli_nit; }
    public function obtenerIndustria() { return $this->cli_industria; }
    public function obtenerEmail() { return $this->cli_email_contacto; }
    public function obtenerTelefono() { return $this->cli_telefono; }
    public function obtenerDireccion() { return $this->cli_direccion; }
    public function obtenerCiudad() { return $this->cli_ciudad; }
    public function obtenerPais() { return $this->cli_pais; }
    public function obtenerSitioWeb() { return $this->cli_sitio_web; }
    public function obtenerFechaRegistro() { return $this->cli_fecha_registro; }
    public function obtenerTipoPlan() { return $this->cli_tipo_plan; }
    public function obtenerEstado() { return $this->cli_estado; }
}

