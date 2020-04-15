import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input() leyenda:string = '';
  @Input() etiquetas: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() datos: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input()  tipo: ChartType = 'doughnut';
  
  constructor() { }

  ngOnInit() {
    
  }

}
