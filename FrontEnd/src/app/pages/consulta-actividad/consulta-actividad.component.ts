import { Component } from '@angular/core';
import { ConsultaActividad,actividadRequest } from '../../shared/interface/actividad.interface';
import { RegistroActividadService } from '../../shared/services/registroActividad.service';

@Component({
  selector: 'app-consultaactividad',
  templateUrl: './consulta-actividad.component.html',
  styleUrl: './consulta-actividad.component.css'
})


export class ConsultaActividadComponent {
  id:     number;
  estado: string;

  consulta: Promise<ConsultaActividad[]> | undefined;

  constructor(private actividadService: RegistroActividadService) {
  }

  async submitForm() {
    const consultarActividad: actividadRequest = {
      id: this.id,
      estado: this.estado
    };

    if (this.id === 0 && this.estado === '') {
      alert("Se debe ingresar un valor de busqueda")
    }
    else{
      this.consulta = this.actividadService.ConsultarActividad(consultarActividad);
    }
  }

}
