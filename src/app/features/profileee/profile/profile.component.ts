import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Preferences } from '../../../model/preferences.model';
import { WeatherData } from '../../../model/weather.model';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../session.service'; // to store the city in order to use it for the getrecommendations(email,city) method


@Component({
 selector: 'app-profile',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './profile.component.html',
 styleUrl: './profile.component.css'
})
export class profileComponent
{
 city: string = '';



 constructor(private apiService: ApiService,private sessionService: SessionService,  private router: Router) {}
//add sessionservice to the constructor 

 onSubmit(): void {
  
  //NEW: trying to make the session storage work 
   this.apiService.getWeatherByCity(this.city).subscribe({
    next: (weatherData: WeatherData) => {
      console.log('WeatherData received', weatherData);
      this.sessionService.setCity(this.city); // Store city in session
      this.router.navigate(['/outfit']); // Navigate with weather data
    },
    error: (error) => {
      console.error('Error when posting preference:', error);
    }
  });

  
 }
};
 /* OLD 
  this.apiService.getWeatherByCity(this.city).subscribe({
     next: (weatherData: WeatherData) => {
       console.log('WeatherData received', weatherData);
       this.sessionService.setCity(this.city); //store city for the last outfit component 
       this.router.navigate(['/outfit'], {state: {weatherData}});
     },
     error: (error) => {
       console.error('Error when posting preference:', error);
     }
   });
   */
