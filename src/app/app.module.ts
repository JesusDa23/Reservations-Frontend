import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormReservationComponent } from './components/form-reservation/form-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReservationService } from './services/reservations.service';

@NgModule({
  declarations: [
    AppComponent,
    FormReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
