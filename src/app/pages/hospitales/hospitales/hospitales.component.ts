import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospitales/hospital.service';
import Swal from 'sweetalert2';
import { ModaluploadService } from '../../../components/modalupload/modalupload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = false;
  totalRegistros: number = 0;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModaluploadService) {

  }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales())
  }

  cargarHospitales() {
    this.hospitalService.buscarHospitales().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
    })
  }

  buscarHospital(valor: string) {
    if (valor == '') {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital(valor)
      .subscribe(
        (resp: any) => this.hospitales=resp,
        (err: any) => console.log(err)
      )

  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id)
  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe(() => this.cargarHospitales())
  }

  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital).subscribe(() => this.cargarHospitales())
  }

  crearHospital() {
    Swal.fire({
      title: 'Ingrese nombre hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'Debe registrar un usuario'
        else {
          this.hospitalService.crearHospital(value).subscribe(() => {
            this.cargarHospitales();
          })
        }
      }
    })
  }

}
