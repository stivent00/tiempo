import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas'
})
export class HorasPipe implements PipeTransform {

  transform( value: number ): Date {
    const fecha = new Date( value * 1000 );
    
    //let hora = fecha.getHours() + ':' + fecha.getMinutes();
    return fecha;
  }

}
