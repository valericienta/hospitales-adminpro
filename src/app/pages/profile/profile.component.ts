import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imgSubir: File;
  imgTemp: string | ArrayBuffer;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  actualizar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
 
    this.usuarioService.actualizarUsuario( this.usuario)
      .subscribe(
        (data) => { console.log('ok') }
        , (error) => { console.log(JSON.stringify(error)) })

  }

  seleccionImagen(archivo: File) {
    if (!archivo) { this.imgSubir = null; return; }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Error imagen', 'El archivo seleccionado no es una imagen', "warning")
    }

    this.imgSubir = archivo;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result;
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imgSubir, this.usuario._id)
  }
}
