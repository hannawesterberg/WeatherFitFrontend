
 import { bootstrapApplication } from '@angular/platform-browser';
 import { AppComponent } from './app/app.component';
 import { FormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
 import { RouterModule } from '@angular/router';
 import { routes } from './app/app.routes';
 import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
   providers: [
     importProvidersFrom([
       HttpClientModule,
       RouterModule.forRoot(routes), 
       FormsModule, 
     ]),
   ],
 }).catch(err => console.error(err));