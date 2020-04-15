import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) return;
    let usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );
    this.usuarioService.login(usuario, formulario.value.recuerdame)
      .subscribe(
        correcto => this.router.navigate(['/dashboard']),
        error=> console.log(error))
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '180822217313-f6tcojh0l1399flgh9nlciupgjbfoou3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleButton'))
    })
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard');
    })
  }
}
