import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { ModaluploadService } from '../../components/modalupload/modalupload.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor(public modalUploadService: ModaluploadService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
    .subscribe(resp=> this.cargarUsuarios())
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde)
      .subscribe((respuesta: any) => {
        this.totalRegistros = respuesta.total;
        this.usuarios = respuesta.usuarios;
        this.cargando = false;
      })

  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) return;
    if (desde < 0) return;
    this.cargarUsuarios();
  }

  buscarUsuario(filtro: string) {
    this.usuarioService.buscarUsuario(filtro)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      })
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id == this.usuarioService.usuario._id) {
      Swal.fire("Error", "No puede eliminar el usuario loguado", "error");
      return;
    }
    else {
      Swal.fire({
        title: '¿Es seguro?',
        text: `Esta a punto de eliminar ${usuario.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((borrar) => {

        if (borrar.value) {
          this.usuarioService.borrarUsuario(usuario._id).subscribe((borrado) => {
            this.cargarUsuarios();
          });

        }
      })
    }
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe(
        (data) => { console.log('ok') }
        , (error) => { console.log(JSON.stringify(error)) })
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id)
  }
}
