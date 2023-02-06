import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityGuard } from './guards/security.guard';
import { CustomHttpInterceptor } from './http-interceptor';
import { Drivers, Storage } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'local_db',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      size:100,
    })
],

  providers: [
    { provide:
      RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    SecurityGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : CustomHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
