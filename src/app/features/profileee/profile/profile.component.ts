import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
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


ngOnInit(): void {
  //SET THE USER ID 
  const ctx = this.sessionService.getContext();
  console.log(ctx);
}

 onSubmit(): void {
   this.apiService.getWeatherByCity(this.city).subscribe({
    next: (weatherData: WeatherData) => {
      console.log('WeatherData received', weatherData);
      this.sessionService.setCity(this.city);
      this.router.navigate(['/outfit']); 
    },
    error: (error) => {
      console.error('Error when posting preference:', error);
    }
  });

  
 }
}

