<?php

class MetricasDiariasModelo {
    protected $met_id;
    protected $met_cam_id;
    protected $met_anu_id;
    protected $met_fecha;
    protected $met_hora;
    protected $met_impresiones;
    protected $met_alcance;
    protected $met_frecuencia;
    protected $met_clicks;
    protected $met_ctr;
    protected $met_engagement;
    protected $met_shares;
    protected $met_comentarios;
    protected $met_guardados;
    protected $met_conversiones;
    protected $met_tasa_conversion;
    protected $met_valor_conversiones;
    protected $met_gasto;
    protected $met_cpc;
    protected $met_cpm;
    protected $met_cpa;
    protected $met_roas;
    protected $met_reproducciones_video;
    protected $met_porcentaje_visualizacion;
    protected $met_fecha_sincronizacion;

    public function __construct($id, $cam_id, $anu_id, $fecha, $hora, $impresiones, $alcance, $frecuencia, $clicks, $ctr, $engagement, $shares, $comentarios, $guardados, $conversiones, $tasa_conversion, $valor_conversiones, $gasto, $cpc, $cpm, $cpa, $roas, $reproducciones_video, $porcentaje_visualizacion, $fecha_sincronizacion) {
        $this->met_id = $id;
        $this->met_cam_id = $cam_id;
        $this->met_anu_id = $anu_id;
        $this->met_fecha = $fecha;
        $this->met_hora = $hora;
        $this->met_impresiones = $impresiones;
        $this->met_alcance = $alcance;
        $this->met_frecuencia = $frecuencia;
        $this->met_clicks = $clicks;
        $this->met_ctr = $ctr;
        $this->met_engagement = $engagement;
        $this->met_shares = $shares;
        $this->met_comentarios = $comentarios;
        $this->met_guardados = $guardados;
        $this->met_conversiones = $conversiones;
        $this->met_tasa_conversion = $tasa_conversion;
        $this->met_valor_conversiones = $valor_conversiones;
        $this->met_gasto = $gasto;
        $this->met_cpc = $cpc;
        $this->met_cpm = $cpm;
        $this->met_cpa = $cpa;
        $this->met_roas = $roas;
        $this->met_reproducciones_video = $reproducciones_video;
        $this->met_porcentaje_visualizacion = $porcentaje_visualizacion;
        $this->met_fecha_sincronizacion = $fecha_sincronizacion;
    }

    // Getters
    public function obtenerId() { return $this->met_id; }
    public function obtenerCampanaId() { return $this->met_cam_id; }
    public function obtenerAnuncioId() { return $this->met_anu_id; }
    public function obtenerFecha() { return $this->met_fecha; }
    public function obtenerHora() { return $this->met_hora; }
    public function obtenerImpresiones() { return $this->met_impresiones; }
    public function obtenerAlcance() { return $this->met_alcance; }
    public function obtenerFrecuencia() { return $this->met_frecuencia; }
    public function obtenerClicks() { return $this->met_clicks; }
    public function obtenerCtr() { return $this->met_ctr; }
    public function obtenerEngagement() { return $this->met_engagement; }
    public function obtenerShares() { return $this->met_shares; }
    public function obtenerComentarios() { return $this->met_comentarios; }
    public function obtenerGuardados() { return $this->met_guardados; }
    public function obtenerConversiones() { return $this->met_conversiones; }
    public function obtenerTasaConversion() { return $this->met_tasa_conversion; }
    public function obtenerValorConversiones() { return $this->met_valor_conversiones; }
    public function obtenerGasto() { return $this->met_gasto; }
    public function obtenerCpc() { return $this->met_cpc; }
    public function obtenerCpm() { return $this->met_cpm; }
    public function obtenerCpa() { return $this->met_cpa; }
    public function obtenerRoas() { return $this->met_roas; }
    public function obtenerReproduccionesVideo() { return $this->met_reproducciones_video; }
    public function obtenerPorcentajeVisualizacion() { return $this->met_porcentaje_visualizacion; }
    public function obtenerFechaSincronizacion() { return $this->met_fecha_sincronizacion; }
}