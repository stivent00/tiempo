import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcion'
})
export class DescripcionPipe implements PipeTransform {

  transform( codigo: string ): string {
    
    let descripcion: string = '';
    switch (codigo) {
      case '01d':
        descripcion = 'Soleado';
      break;
      case '01n':
        descripcion = 'Despejado';
      break;
      case '02d':
        descripcion = 'Parcialmente nublado';
      break;
      case '02n':
        descripcion = 'Parcialmente nublado';
      break;
      case '03d':
        descripcion = 'Mayormente Nublado';
      break;
      case '03n':
        descripcion = 'Mayormente Nublado';
      break;
      case '04d':
        descripcion = 'Nublado';
      break;
      case '04n':
        descripcion = 'Nublado';
      break;
      case '09d':
        descripcion = 'Llovizna';
      break;
      case '09n':
        descripcion = 'Llovizna';
      break;
      case '10d':
        descripcion = 'Lluvia';
      break;
      case '10n':
        descripcion = 'Lluvia';
      break;
      case '11d':
        descripcion = 'Tormentas';
      break;
      case '11n':
        descripcion = 'Tormentas';
      break;
      case '13d':
        descripcion = 'Nieve';
      break;
      case '13n':
        descripcion = 'Nieve';
      break;
      case '50d':
        descripcion = 'Nieblina';
      break;
      case '50n':
        descripcion = 'Nieblina';
      break;
      default:
        descripcion = 'Despejado';
      break;
    }

    return descripcion;
  }

}
