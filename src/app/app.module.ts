import { DataMomentoPipe } from './pipes/data-momento.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimuladorComponent } from './simulador/simulador.component';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    AppComponent,
    SimuladorComponent,
    DataMomentoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TooltipModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
