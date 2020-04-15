import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Hospital } from 'src/app/models/hospital.model';

import { urlServicios } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient, public router: Router) {
    activatedRoute.params.subscribe(params => {
      let termino = params['termino'];
      this.buscar(termino);
    })
  }

  ngOnInit() {
  }

  buscar(filtro: string) {
    let url = urlServicios + '/busqueda/todo/' + filtro;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp)
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios
    })
  }

  edit(tipo: string, id: string) {
    switch (tipo) {
      case 'medico':
        this.router.navigate(['/medico', id]);
        break;

    }
  }
}
