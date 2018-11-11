import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { MedicoService } from '../../services/medico/medico.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  totalUsuarios: number = 0;
  totalMedicos: number = 0;

  public chart: any = null;

  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le dan gases los frijoles?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },
    'grafico5': {
      'labels': ['Usuarios', 'Medicos'],
      'data':  [this.totalUsuarios, this.totalMedicos],
      'type': 'doughnut',
      'leyenda': 'Usuarios y Medicos'
    },
  };

  constructor(
    public _usuarioService: UsuarioService,
    public _medicoService: MedicoService
    ) { }

  ngOnInit() {
    this._usuarioService.cargarTodosUsuarios().subscribe((resp: any) => {
      this.totalUsuarios = resp.total;
    });
    this.cargarMedicos();

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ["Usuarios", "Medicos", "Hospitales"],
          datasets: [{
              label: '# de Registros',
              data: [this.totalUsuarios, this.totalMedicos, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  }

  cargarUsuarios() {
    this._usuarioService.cargarTodosUsuarios().subscribe((resp: any) => {
      this.totalUsuarios = resp.total;
    });
  }
  cargarMedicos() {
    this._medicoService.cargarTodosMedicos().subscribe((resp: any) => {
      this.totalMedicos = resp.total;
    });
  }

  

}
