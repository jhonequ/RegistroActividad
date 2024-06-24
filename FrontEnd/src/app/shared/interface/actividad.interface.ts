export interface Actividad {
  titulo:       string;
  horas:        number;
  descripcion:  string;
  personas:     string;
  estado:       string;
  fechainicial: string;
  fechafinal:   string;
}

export interface ConsultaActividad {
  id_actividad:     number;
  titulo:           string;
  horas_trabajadas: number;
  descripcion:      string;
  personas:         string;
  estado:           string;
  fecha_inicio:     string;
  fecha_fin:        string;
}

export interface actividadRequest {
  id:     number;
  estado: string;
}
