import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() public chartLabels:string[] = [];
  @Input() public chartData:number[] = [];
  @Input() public chartType:string = '';

  constructor() { }

  ngOnInit() {
  }

}
