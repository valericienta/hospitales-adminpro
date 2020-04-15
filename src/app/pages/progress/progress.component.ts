import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 50;
  constructor() { }

  ngOnInit() {
  }
  
  actualizar(e: number, idprogreso: string){
    if (idprogreso=="progreso1") this.progreso1=e;
    else this.progreso2=e;
  }
}
