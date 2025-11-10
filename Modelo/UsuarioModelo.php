<?php

class UsuariosModelo
{
    protected $usu_id;
    protected $usu_cli_id;
    protected $usu_nombre;
    protected $usu_apellido;
    protected $usu_email;
    protected $usu_password_hash;
    protected $usu_rol;
    protected $usu_telefono;
    protected $usu_fecha_creacion;
    protected $usu_ultimo_acceso;
    protected $usu_estado;

    public function __construct($id, $cli_id, $nombre, $apellido, $email, $password_hash, $rol, $telefono, $fecha_creacion, $ultimo_acceso, $estado)
    {
        $this->usu_id = $id;
        $this->usu_cli_id = $cli_id;
        $this->usu_nombre = $nombre;
        $this->usu_apellido = $apellido;
        $this->usu_email = $email;
        $this->usu_password_hash = $password_hash;
        $this->usu_rol = $rol;
        $this->usu_telefono = $telefono;
        $this->usu_fecha_creacion = $fecha_creacion;
        $this->usu_ultimo_acceso = $ultimo_acceso;
        $this->usu_estado = $estado;
    }

    // Getters
    public function obtenerId() { return $this->usu_id; }
    public function obtenerClienteId() { return $this->usu_cli_id; }
    public function obtenerNombre() { return $this->usu_nombre; }
    public function obtenerApellido() { return $this->usu_apellido; }
    public function obtenerNombreCompleto() { return $this->usu_nombre . ' ' . $this->usu_apellido; }
    public function obtenerEmail() { return $this->usu_email; }
    public function obtenerPasswordHash() { return $this->usu_password_hash; }
    public function obtenerRol() { return $this->usu_rol; }
    public function obtenerTelefono() { return $this->usu_telefono; }
    public function obtenerFechaCreacion() { return $this->usu_fecha_creacion; }
    public function obtenerUltimoAcceso() { return $this->usu_ultimo_acceso; }
    public function obtenerEstado() { return $this->usu_estado; }
}