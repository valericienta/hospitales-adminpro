import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { urlServicios } from 'src/app/config/config';

import { map, catchError } from 'rxjs/operators/';

import Swal from 'sweetalert2';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  constructor(public http: HttpClient, public subirService: SubirArchivoService, public router: Router) {
    this.cargarStorage();
  }

  userLogged() {
    return (this.token.length > 5 ? true : false)
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    }
    else {
      this.token = '';
    }
  }

  crearUsuario(usuario: Usuario) {
    let url = urlServicios + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire("Usuario creado", usuario.email, "success");
        return resp.usuario;
      })
      ,
      catchError(err => {
       
        Swal.fire(err.error.mensaje, err.error.errors.message, "error")
        return throwError(err.message);
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    let url = urlServicios + '/login';
    if (recordar) window.localStorage.setItem("email", usuario.email)
    else window.localStorage.removeItem("email")
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(err => {
        console.log(err.error.mensaje);
        Swal.fire('Error', err.error.mensaje, "error")
        return throwError(err.message);
      })
    );
  }

  loginGoogle(token: string) {
    let url = urlServicios + '/login/google';
    return this.http.post(url, { token: token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }))
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("usuario", JSON.stringify(usuario));
    window.localStorage.setItem("menu", JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario) {
    let url = urlServicios + '/usuario/' + usuario._id;
    url += "?token=" + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id == this.usuario._id) {
          let usuarioDB = resp.usuario;
          this.guardarStorage(resp.id, this.token, usuarioDB, resp.menu);
        }
        Swal.fire('Usuario actualizado', usuario.nombre, "success");
        return true;
      }))
  }

  cambiarImagen(file: File, id: string) {
    this.subirService.subirArchivo(file, 'usuarios', id)
      .then((respuesta: any) => {
        Swal.fire('Imagen actualizada', this.usuario.nombre, "success");
        this.usuario.img = respuesta.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, null);
      })

      .catch((error: any) => console.log(error))
  }

  cargarUsuario(desde: number = 0) {
    let url = urlServicios + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(filtro: string) {
    let url = urlServicios + '/busqueda/coleccion/usuarios/' + filtro;
    return this.http.get(url).pipe(
      map((resp: any) => { return resp.usuarios })
    )
  }

  borrarUsuario(id: string) {
    let url = urlServicios + '/usuario/' + id;
    url += "?token=" + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire(
          'Eliminar!',
          'El usuario ha sido eliminado',
          'success'
        );
        return true;
      })
    )
  }
}
