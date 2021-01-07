import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconos'
})
export class IconosPipe implements PipeTransform {

  transform( codigo: string ): string {
    return `assets/img/${codigo}.png`;
  }

}
