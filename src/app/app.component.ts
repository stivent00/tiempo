import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiempo';
  backMain = 'back-tmp';
  /* Función cambio de clase para cambiar el background */
  cambiarBack( newItem ) {
    this.backMain = newItem;
  }

}
