import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(filtro: string) {
    this.router.navigate(['busqueda/', filtro]);
  }

}
