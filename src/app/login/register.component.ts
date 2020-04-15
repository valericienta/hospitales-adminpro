import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuarios/usuario.service';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  // static PagesComponent: any[] | Type<any>;
  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) return null;
      return { sonIguales: false };
    }
  }

  ngOnInit() {
    init_plugins();
    // this.formulario = new FormGroup({
    //   nombre: new FormControl('null', Validators.required),
    //   correo: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, Validators.required),
    //   password2: new FormControl(null, Validators.required),
    //   condiciones: new FormControl(false),
    // },
    //   { validators: this.sonIguales('password', 'password2') }
    // );
    this.formulario = new FormGroup({
      nombre: new FormControl('Valeria Gigena', Validators.required),
      correo: new FormControl('valeria.gigena@outlook.com', [Validators.required, Validators.email]),
      password: new FormControl('123', Validators.required),
      password2: new FormControl('123', Validators.required),
      condiciones: new FormControl(false),
    },
      { validators: this.sonIguales('password', 'password2') }
    );
  }

  registrar() {
    if (!this.formulario.value.condiciones) {
      Swal.fire(
        'Importante',
        'Debe aceptar las condiciones',
        'warning'
      );
      return;
    }
    if (this.formulario.invalid) {
      Swal.fire(
        'Importante',
        'Debe agregar todos los datos',
        'warning'
      );return;}
    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password,
     
    );
    this.usuarioService.crearUsuario(usuario)
      .subscribe(respuesta => this.router.navigate(['/login'])
      )
  }

}
