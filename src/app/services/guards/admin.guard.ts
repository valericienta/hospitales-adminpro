import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(public usuarioService: UsuarioService) { }

  canActivate() {
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true
    }
    else {
      this.usuarioService.logout();
      return false;
    }

  }
}
