import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Actividad, ConsultaActividad, actividadRequest } from '../interface/actividad.interface';

@Injectable({ providedIn: 'root' })

export class RegistroActividadService {
  constructor(private httpClient: HttpClient) { }


  public async AgregarActividad(actividad: Actividad){
    console.log("ingreso servicio registrar");
    const respuestaRaw = await fetch("/registro_actividad", {
      body: JSON.stringify(actividad),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const jsonDecodificado = await respuestaRaw.json();
    return jsonDecodificado;
  }

  public async ConsultarTodasActividades():Promise<ConsultaActividad[]> {
    const respuestaRaw = await fetch("/consulta_actividades", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!respuestaRaw.ok) {
      throw new Error("Error al consultar actividades: " + respuestaRaw.statusText);
    }

    const actividadesJson = await respuestaRaw.json(); // Esperar a que la promesa se resuelva

    // Mapear la respuesta JSON a la interfaz Actividad
    const actividades: ConsultaActividad[] = actividadesJson.map((actividadRaw: ConsultaActividad) => {
      return {
        id_actividad: actividadRaw.id_actividad,
        titulo: actividadRaw.titulo,
        horas_trabajadas: actividadRaw.horas_trabajadas,
        descripcion: actividadRaw.descripcion,
        personas: actividadRaw.personas,
        estado: actividadRaw.estado,
        fecha_inicial: new Date(actividadRaw.fecha_inicio).toLocaleDateString(),
        fecha_fin: new Date(actividadRaw.fecha_fin).toLocaleDateString(),
      };
    });

    return actividades;
  }

  public async ConsultarActividad(consultActividad: actividadRequest): Promise<ConsultaActividad[]>{
    const respuestaRaw = await fetch("/consulta_actividadesPorParametro", {
      body:JSON.stringify(consultActividad),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!respuestaRaw.ok) {
      throw new Error("Error al consultar actividades: " + respuestaRaw.statusText);
    }

    const actividadesJson = await respuestaRaw.json(); // Esperar a que la promesa se resuelva

    // Mapear la respuesta JSON a la interfaz Actividad
    const actividades: ConsultaActividad[] = actividadesJson.map((actividadRaw: ConsultaActividad) => {
      return {
        id_actividad: actividadRaw.id_actividad,
        titulo: actividadRaw.titulo,
        horas_trabajadas: actividadRaw.horas_trabajadas,
        descripcion: actividadRaw.descripcion,
        personas: actividadRaw.personas,
        estado: actividadRaw.estado,
        fecha_inicial: new Date(actividadRaw.fecha_inicio).toLocaleDateString(),
        fecha_fin: new Date(actividadRaw.fecha_fin).toLocaleDateString(),
      };
    });

    return actividades;
  }
}


/*
    const respuestaRaw = await fetch("/consulta_actividades", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const jsonDecodificado = await respuestaRaw.json();

    return jsonDecodificado;

    return this.httpClient.get<ConsultaActividad[]>("/consulta_actividades");*/

    /*
        const respuestaRaw = await fetch("/consulta_actividad", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        // Mapear la respuesta JSON a la interfaz Actividad
        const actividades: ConsultaActividad[] = respuestaRaw.map((actividadRaw: ConsultaActividad) => {
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
