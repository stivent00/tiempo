import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { from } from 'rxjs';

/* Pipes */
import { DescripcionPipe } from './pipes/descripcion.pipe';
import { HorasPipe } from './pipes/horas.pipe';
import { IconosPipe } from './pipes/iconos.pipe';
import { DiasPipe } from './pipes/dias.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DescripcionPipe,
    HorasPipe,
    IconosPipe,
    DiasPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
