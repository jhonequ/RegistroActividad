import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Actividad {
  titulo: string;
  horas: number;
  descripcion: string;
  personas: string;
  estado: string;
  fechainicial: string;
  fechafinal: string;
}

interface ConsultaActividad {
  id_actividad: number;
  titulo: string;
  horas_trabajadas: number;
  descripcion: string;
  personas: string;
  estado: string;
  fecha_inicial: string;
  fecha_fin: string;
}

@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrl: './registro-actividad.component.css'
})

export class RegistroActividadComponent implements OnInit {
  titulo: string;
  horas: number;
  descripcion: string;
  personas: string;
  estado: string;
  fechainicial: string;
  fechafinal: string;

  actividades: Actividad[] = [];

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.consultarActividades();
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

    console.log(nuevaActividad);

    this.actividades.push(nuevaActividad);

    const respuestaRaw = await fetch("/registro_actividad", {
      body: JSON.stringify(nuevaActividad), // <-- Aquí van los datos
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "POST",
    });

    const jsonDecodificado = await respuestaRaw.json();
    console.log(jsonDecodificado);

    this.titulo = '';
    this.horas = 0;
    this.descripcion = '';
    this.personas = '';
    this.estado = '';
    this.fechainicial = '';
    this.fechafinal = '';
  }

  eliminarActividad(index: number) {
    this.actividades.splice(index, 1);
  }

  verPersona(persona: string) {
    alert('Informacion de la persona: ${persona}');
  }

  public async consultarActividades() {
    const respuestaRaw = await fetch("/consulta_actividad", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    console.log(respuestaRaw)
    // Mapear la respuesta JSON a la interfaz Actividad
    /*const actividades: ConsultaActividad[] = respuestaRaw.map((actividadRaw: ConsultaActividad) => {
      return {
        id_actividad: actividadRaw.id_actividad,
        titulo: actividadRaw.titulo,
        horas_trabajadas: actividadRaw.horas_trabajadas,
        descripcion: actividadRaw.descripcion,
        personas: actividadRaw.personas,
        estado: actividadRaw.estado,
        fecha_inicial: new Date(actividadRaw.fecha_inicial).toLocaleDateString(),
        fecha_fin: new Date(actividadRaw.fecha_fin).toLocaleDateString(),
      };
    });
    console.log(actividades);
    return actividades;*/

  }
}
    /*
    const respuestaRaw = await fetch("/consulta_actividad", {
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "GET",
    })
    .then((res) => res.json());

    console.log(respuestaRaw);*/
