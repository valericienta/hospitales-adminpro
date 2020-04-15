import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import { urlServicios } from 'src/app/config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  crearMedico(medico: Medico) {
    let url = urlServicios + '/medico';
    url += "?token=" + this.usuarioService.token;
    return this.http.post(url, medico).pipe(map((resp: any) => {
      Swal.fire("Medico creado", `${medico.nombre}`, "success");
      return resp.medico;
    }));
  }

  actualizarMedico(medico: Medico) {
    let url = urlServicios + '/medico/' + medico._id;
    url += "?token=" + this.usuarioService.token;
    return this.http.put(url, medico).pipe(
      map((resp: any) => {
        Swal.fire('Medico actualizado', medico.nombre, "success");
        return true;
      }))
  }

  cargarMedico(id: string) {
    let url = urlServicios + '/medico/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico
      })
    )
  }


  obtenerMedicos() {
    let url = urlServicios + '/medico';
    return this.http.get(url);
  }

  obtenerMedico(filtro: string) {
    let url = urlServicios + '/busqueda/coleccion/medicos/' + filtro;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos
      })
    )
  }

  borrarMedico(id: string) {
    let url = urlServicios + '/medico/' + id;
    url += "?token=" + this.usuarioService.token;
    return this.http.delete(url).pipe(
      map(resp => {
        console.log(resp);
        Swal.fire(
          'Eliminado',
          'El medico ha sido eliminado',
          'success'
        );
        return true;
      })
    )
  }
}
