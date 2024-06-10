import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroActividadComponent } from './pages/registro-actividad/registro-actividad.component';
import { ConsultaActividadComponent } from './pages/consulta-actividad/consulta-actividad.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},
  {path:'Inicio',component:AppComponent},
  {path:'Login', component:LoginComponent},
  {path:'RegistroActividad', component:RegistroActividadComponent},
  {path:'ConsultaActividad', component:ConsultaActividadComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
