import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: [] = [];
  medico: Medico = new Medico('', '', '', '0');
  cargando: boolean = false;
  totalRegistros: number = 0;
  hospital: Hospital = new Hospital('');
  
  constructor(public medicoService: MedicosService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.obtenerMedicos().subscribe((medicos: any) => {
      this.totalRegistros = medicos.total;
      this.medicos = medicos.medicos;
    })
  }

  crearMedico() {

  }

  buscarMedico(valor: string) {
    if (valor == '') {
      this.cargarMedicos();
      return;
    }
    this.medicoService.obtenerMedico(valor)
      .subscribe(
        (resp: any) => this.medicos = resp,
        (err: any) => console.log(err)
      )
  }
  mostrarModal(id: string) {

  }

  borrarMedico(medico: Medico) {

    this.medicoService.borrarMedico(medico._id).subscribe(
      () => this.cargarMedicos(),
      (error) => console.log(error)
    )
  }
}
