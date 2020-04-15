import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlServicios } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuarios/usuario.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class HospitalService {


  constructor(public http: HttpClient, public usuarioService: UsuarioService) {

  }

  borrarHospital(hospital: Hospital) {
    let url = urlServicios + '/hospital/' + hospital._id;
    url += "?token=" + this.usuarioService.token;
    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire(
          'Eliminar',
          'El hospital ha sido eliminado',
          'success'
        );
        return true;
      })
    )
  }

  actualizarHospital(hospital: Hospital) {
    let url = urlServicios + '/hospital/' + hospital._id;
    url += "?token=" + this.usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire('Hospital actualizado', hospital.nombre, "success");
        return true;
      }))
  }

  buscarHospitales(desde: number = 0) {
    let url = urlServicios + '/hospital';
    return this.http.get(url);
  }

  buscarHospital(filtro: string) {
    let url = urlServicios + '/busqueda/coleccion/hospitales/' + filtro;
    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp)
        return resp.hospitales
      })
    )
  }

  obtenerHospital(id: string) {
    let url = urlServicios + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
       
        return resp.hospital
      })
    )
  }

  crearHospital(nombre: string) {
    let hospital = new Hospital(nombre);
    let url = urlServicios + '/hospital';
    url += "?token=" + this.usuarioService.token;
    return this.http.post(url, hospital).pipe(map((resp: any) => {
      Swal.fire("Hospital creado", `${nombre}`, "success");
      return resp.hospital;
    }));
  }

}
