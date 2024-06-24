import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroActividadService } from '../../shared/services/registroActividad.service';
import { Actividad, ConsultaActividad } from '../../shared/interface/actividad.interface';

@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrl: './registro-actividad.component.css'
})

export class RegistroActividadComponent implements OnInit {
  titulo:       string;
  horas:        number;
  descripcion:  string;
  personas:     string;
  estado:       string;
  fechainicial: string;
  fechafinal:   string;

  actividades: Actividad[] = [];
  consulta: Promise<ConsultaActividad[]> | undefined;

  constructor(private actividadService: RegistroActividadService) {
  }

  ngOnInit(): void {
    this.consulta = this.actividadService.ConsultarTodasActividades();
  }

  async submitForm() {
    const nuevaActividad: Actividad = {
      titulo: this.titulo,
      horas: this.horas,
      descripcion: this.descripcion,
      personas: this.personas,
      estado: this.estado,
      fechainicial: this.fechainicial,
      fechafinal: this.fechafinal
    };

    await this.actividadService.AgregarActividad(nuevaActividad);
    this.consulta = this.actividadService.ConsultarTodasActividades();

    this.titulo = '';
    this.horas = 0;
    this.descripcion = '';
    this.personas = '';
    this.estado = '';
    this.fechainicial = '';
    this.fechafinal = '';
  }

  eliminarActividad(index: number) {
    //this.actividades.splice(index, 1);
    alert('Sin desarrollo aun');
  }

}
