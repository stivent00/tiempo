import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dias'
})
export class DiasPipe implements PipeTransform {

  transform( fecha: number ): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let newFecha = new Date( fecha * 1000 );
    
    return dias[newFecha.getDay()];
  }

}
