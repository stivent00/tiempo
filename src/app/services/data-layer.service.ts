import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  public data:Object;
  constructor() { }

  /* Carga información de dataLayer */
  setData( ciudad: string, temp: string ) {
    this.data = {
      'event': 'ga_event',
      'category': 'Aplicativo',
      'action': ciudad,
      'label': temp 
      };
  }
  
  /* Agrega información de busqueda al dataLayer */
  trigger() {
    (<any>window).dataLayer.push(this.data);
  }
}


