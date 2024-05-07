
 import { enableProdMode } from '@angular/core';
 import { bootstrapApplication } from '@angular/platform-browser';
 import { AppComponent } from './app/app.component';
 import { FormsModule } from '@angular/forms';
 //import { environment } from './environments/environment';
 import { HttpClientModule } from '@angular/common/http';
 import { RouterModule } from '@angular/router';
 import { routes } from './app/app.routes';
 import { importProvidersFrom } from '@angular/core';
  /*if (environment.production) {
   enableProdMode();
 }*/
  bootstrapApplication(AppComponent, {
   providers: [
     importProvidersFrom([
       HttpClientModule, // Enables HTTP services throughout your application
       RouterModule.forRoot(routes), // Sets up the initial routing configuration
       FormsModule, // Allows usage of ngModel for forms
     ]),
   ],
 }).catch(err => console.error(err));