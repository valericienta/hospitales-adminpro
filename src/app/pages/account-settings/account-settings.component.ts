import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public ajustes: SettingsService) { }

  ngOnInit() {
    this.setCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.ajustes.aplicarTema(tema);
    this.aplicarCheck(link);

  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) ref.classList.remove('working');
    link.classList.add('working');
  }

  setCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this.ajustes.ajustes.tema;
    for (let ref of selectores) {
      {
        if (ref.getAttribute('data-theme') == tema)
          ref.classList.add('working');
      }
    }

  }
}
