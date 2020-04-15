import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospitales/hospital.service';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModaluploadService } from '../../../components/modalupload/modalupload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '');

  constructor(public activatedRoute: ActivatedRoute,
    public modalUploadService: ModaluploadService,
    public hospitalService: HospitalService, public medicoService: MedicosService, public router: Router) {
    activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit() {
    this.hospitalService.buscarHospitales()
      .subscribe((hospitales: any) => this.hospitales = hospitales.hospitales);
    this.modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    })
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe((resp: any) => {
      let medicoData = resp;
      this.medico = medicoData;
      this.medico.hospital = medicoData.hospital._id;
      this.cambioHospital(this.medico.hospital);
    })
  }

  guardarMedico(f: NgForm) {

    this.activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id !== 'nuevo') {
        this.medicoService.actualizarMedico(this.medico).subscribe
          ((data) => { console.log(data )},
            (error) => { console.log(error) })

      }
      else {
        this.medicoService.crearMedico(this.medico).subscribe((respuesta: Medico) => {
          this.router.navigate(['/medico', respuesta._id]);
        })
      }
    })



  }

  cambioHospital(id: any) {
    this.hospitalService.obtenerHospital(id).subscribe(hospital => this.hospital = hospital)
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
