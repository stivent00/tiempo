import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  
  URIact: string = '';
  URIpro: string = '';
  apiKey: string = '9b6e2ce043da553cdf8caf97dfe698eb';

  constructor( private http: HttpClient ) {
    this.URIact = `https://api.openweathermap.org/data/2.5/weather?appid=${ this.apiKey }&units=metric`;
    this.URIpro = `https://api.openweathermap.org/data/2.5/onecall?appid=${ this.apiKey }&units=metric`;
  }

  /* Llamada a API - Busqueda por ciudad */
  getClimaCiudad( nombreCiudad: string ){
    return this.http.get( `${ this.URIact }&q=${ nombreCiudad }` );
  }
  /* Llamada a API - Busqueda por código postal */
  getClimaPostal( codigoPostal: string ){
    return this.http.get( `${ this.URIact }&zip=${ codigoPostal }` );
  }
  /*
  getClimaCoords( latitud: string, longitud: string ){
    return this.http.get( `${ this.URIact }&lat=${ latitud }&lon=${ longitud }` );
  }
  */
  
  /* Llamada a API pronostico semanal - Busqueda por coordenadas */
  getClimaDiario( latitud: string, longitud: string ){
    let excluidos = 'current,minutely,hourly,alerts';
    return this.http.get( `${ this.URIpro }&lat=${ latitud }&lon=${ longitud }&exclude=${ excluidos }` );
  }

}
