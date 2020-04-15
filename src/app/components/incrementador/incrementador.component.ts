import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input('titulo') leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress',  {static: false}) txtProgress: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    if (this.progreso == 0 && valor < 0) { this.progreso = 0; return; }
    if (this.progreso == 100 && valor > 0) { this.progreso = 100; return; }
    this.progreso = Number(this.progreso) + valor;
    this.cambioValor.emit(this.progreso);
  }

  onChange(newValue: number) {
   
    if (newValue >= 100) { newValue = 100; }
    else if (newValue <= 0) { newValue = 0; }
    this.progreso = newValue;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.value = newValue;
  }
}
