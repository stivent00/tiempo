import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataLayerService } from '../../services/data-layer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @Output() background = new EventEmitter<string>();

  /* Se definen objetos que almacenan información de API */
  dataActual: any;
  dataPronostico: any;
  dataDias = [];
  /* Se definen variables manejo de errores */
  error: boolean = false;
  msjError: string = '';
  /* Se define data para crear grafica de pronóstico */
  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartOptions = { 
    responsive: true,
    legend: {
      labels: { fontColor: "rgb(246, 246, 246, 0.9)", fontSize: 14 }
    },
    title: { display: false },
    scales: {
      yAxes: [{
          gridLines: { show: true, color: "rgb(246, 246, 246, 0.3)" },
          ticks: { fontColor: "rgb(246, 246, 246, 0.9)", fontSize: 12, stepSize: 1 }
      }],
      xAxes: [{
          gridLines: { show: true, color: "rgb(246, 246, 246, 0)" },
          ticks: { fontColor: "rgb(246, 246, 246, 0.9)", fontSize: 12, stepSize: 1 }
      }]
    }
  };
  chartColor: Color[] = [
    { borderColor: 'rgb(203, 98, 82, .9)', backgroundColor: 'rgb(255, 255, 255, 0)' },
    { borderColor: 'rgb(74, 132, 205, .9)', backgroundColor: 'rgb(255, 255, 255, 0)' }
  ];
  chartLegend: boolean = true;
  chartType:string = 'line';
  chartPlugins = [];
  /* Se definen variables dinamicas para grafica */
  tmpMax = [];
  tmpMin = [];
  tmpDias = ['Hoy'];
  /* Array días en español */
  dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  constructor( private clima: ClimaService, private dataLayerService: DataLayerService ) {

  }

  ngOnInit() {
    /* Establece ubicación por defecto */
    this.obtenerClimaCiudad( 'medellin' );
  }

  obtenerClimaCiudad( ciudad: string ){
    /* Consulta servicio del clima actual por ciudad */
    this.clima.getClimaCiudad( ciudad ).subscribe(
      rta => {
        /* Carga variable dataActual con respuesta de la API actual por Ciudad */
        this.dataActual = rta;
        /* Cambia background según la condición del clima actual */
        this.background.emit(`back-${this.dataActual.weather[0].icon}`);
        /* Marca falso el error en la busqueda */
        this.error = false;
        /* Ejecuta función llamar API pronostico y cargar info */
        this.obtenerPronostico( this.dataActual.coord.lat, this.dataActual.coord.lon );
        /* Carga datos al servicio dataLayer */
        this.dataLayerService.setData( this.dataActual.name, this.dataActual.main.temp );        
        /* Activa trigger servicio dataLayer (push) */
        this.dataLayerService.trigger();     
      },
      err => {
        /* Control Error */
        console.log( err );
        this.error = true;
        this.msjError = 'No se ha encontrado la ubicación.';
      }
    );
  }

  obtenerClimaPostal( postal: string ){
    /* Consulta servicio del clima actual por ZIP */
    this.clima.getClimaPostal( postal ).subscribe(
      rta => {
        /* Carga variable dataActual con respuesta de la API actual por ZIP */
        this.dataActual = rta;
        /* Cambia background según la condición del clima actual */
        this.background.emit(`back-${this.dataActual.weather[0].icon}`);
        /* Marca falso el error en la busqueda */
        this.error = false;
        /* Ejecuta función llamar API pronostico y cargar info */
        this.obtenerPronostico( this.dataActual.coord.lat, this.dataActual.coord.lon );
        /* Carga datos al servicio dataLayer */
        this.dataLayerService.setData( this.dataActual.name, this.dataActual.main.temp );        
        /* Activa trigger servicio dataLayer (push) */
        this.dataLayerService.trigger();     
      },
      err => {
        /* Control Error */
        console.log( err );
        this.error = true;
        this.msjError = 'No se ha encontrado la ubicación.';
      }
    );
  }

  busquedaTmp( ciudad: HTMLInputElement, postal: HTMLInputElement ){
    /* Valida si usuario ingreso un dato de busqueda */
    if( ciudad.value ){
      /* Ejecuta la busqueda por Ciudad */
      this.obtenerClimaCiudad( ciudad.value );  
      /* Limpia campos formulario */
      ciudad.value = '';
      postal.value = '';
    }else if( postal.value ){
      /* Ejecuta la busqueda por Código Postal */
      this.obtenerClimaPostal( postal.value );  
      /* Limpia campos formulario */
      ciudad.value = '';
      postal.value = '';      
    }else{
      /* Control Error */
      this.error = true;
      this.msjError = '¡Debe ingresar algun dato de busqueda!';
    }
    /* Enfoca campo ciudad en formulario */
    ciudad.focus();
    return false;
  }

  obtenerPronostico( lat, lon ){
    /* Consulta servicio de pronostico del clima semanal por coordenadas */
    this.clima.getClimaDiario( lat, lon ).subscribe(
      rta => {
        /* Carga variable dataPronostico con respuesta de la API pronostico del clima semanal */
        this.dataPronostico = rta;
        /* Redefine variable días para grafica */
        this.tmpDias = ['Hoy'];
        /* Ciclo para obtener unicamente los 5 primeros días */
        for (let index = 0; index < 5; index++) {
          let aux = this.dataPronostico.daily[index];
          /* Condición para obtener información de los proximos 4 días para seccion del estado semanal */
          if( index > 0 ){
            /* Carga array dataDias con información para seccion del estado semanal */
            this.dataDias[index - 1] = this.dataPronostico.daily[index];
          }   
          /* Carga tmpMax para usar datos de temperatura maxíma en grafica */       
          this.tmpMax.push( aux.temp.max );
          /* Carga tmpMin para usar datos de temperatura mínima en grafica */  
          this.tmpMin.push( aux.temp.min );
          if(index > 0){
            /* Carga tmpDias para usar datos de días en grafica - Usa función para obtener el nombre del día en español */
            this.tmpDias.push( this.convertirDia(aux.dt) );            
          }
        }
        
        /* Actualizan variables dinamicas para grafica */
        this.chartData = [
          { 
            data: this.tmpMax, 
            label: 'Máxima', 
            pointRadius: 4,
            pointBackgroundColor: 'rgb(246, 246, 246, 0.9)' 
          },
          { 
            data: this.tmpMin, 
            label: 'Mínima',
            pointRadius: 4,
            pointBackgroundColor: 'rgb(246, 246, 246, 0.9)'  
          }
        ];
        this.chartLabels = this.tmpDias;
      },
      err => {
        /* Error busqueda del pronostico */
        console.log( err );
      }
    );
  
  }
  /* Genera nombre de día en español */
  convertirDia( fecha ){
    let newFecha = new Date( fecha * 1000 );
    return this.dias[newFecha.getDay()];
  }

}
