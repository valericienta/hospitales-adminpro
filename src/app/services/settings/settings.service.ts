import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'

  }
  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }
    else
      this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string) {
    let urlStyle = `assets/css/colors/${tema}.css`;
    window.document.getElementById('tema').setAttribute('href', urlStyle);

    this.ajustes.tema = tema;
    this.ajustes.temaURL = urlStyle;
    this.guardarAjustes();


  }
}
interface Ajustes {
  temaURL: string;
  tema: string;
}
