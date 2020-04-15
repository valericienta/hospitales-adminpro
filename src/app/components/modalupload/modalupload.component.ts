import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

import { ModaluploadService } from './modalupload.service';

@Component({
  selector: 'app-modalupload',
  templateUrl: './modalupload.component.html',
  styles: []
})
export class ModaluploadComponent implements OnInit {


  usuario: Usuario;
  imgSubir: File;
  imgTemp: string | ArrayBuffer;

  constructor(public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModaluploadService) {
    console.log('modal listo');
  }

  ngOnInit() {
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

  cerrarModal() {
    this.imgTemp = null;
    this.imgSubir = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imgSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then(resp => {
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => { console.log(err) });
  }
}
