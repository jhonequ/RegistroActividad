import { Component } from '@angular/core';

interface Actividad {
  titulo: string;
  horas: number;
  descripcion: string;
  personas: string;
  estado: string;
  fechainicial: string;
  fechafinal: string;
}

@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrl: './registro-actividad.component.css'
})
export class RegistroActividadComponent {
  titulo: string;
  horas: number;
  descripcion: string;
  personas: string;
  estado: string;
  fechainicial: string;
  fechafinal: string;

  actividades: Actividad[] = [];

  submitForm(){
    const nuevaActividad: Actividad = {
      titulo: this.titulo,
      horas: this.horas,
      descripcion: this.descripcion,
      personas: this.personas,
      estado: this.estado,
      fechainicial: this.fechainicial,
      fechafinal: this.fechafinal
    };

    this.actividades.push(nuevaActividad);

    this.titulo = '';
    this.horas = 0;
    this.descripcion = '';
    this.personas = '';
    this.estado = '';
    this.fechainicial = '';
    this.fechafinal = '';
  }

  eliminarActividad(index: number){
    this.actividades.splice(index, 1);
  }

  verPersona(persona: string){
    alert('Informacion de la persona: ${persona}');
  }
}
