
//ERROR!!!!!!!!!!!!!!
import { Component } from '@angular/core';
import { WeatherData } from '../../../model/weather.model';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../session.service';//to store Email and City for the recommendations method
import { CreatePreferences } from '../../../model/preferences.model';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent {
  preferences: CreatePreferences = { activity: '', thermal_preference: '' };
  city: string = '';

  constructor(
    private apiService: ApiService, 
    private sessionService: SessionService, 
    private router: Router
  ) {}

  onSubmitPreferences(): void {
    this.apiService.postPreference(this.preferences).subscribe({
      next: (response) => {
        console.log('Preferences saved:', response);
        alert('Preferences saved successfully!');
        // Optionally, navigate or perform other actions
      },
      error: (error) => {
        console.error('Error saving preferences:', error);
        alert('Failed to save preferences.');
      }
    });
  }

  onSubmitCity(): void {
    this.sessionService.setCity(this.city);  // Store the city in session
    this.apiService.getWeatherByCity(this.city).subscribe({
      next: (weatherData) => {
        console.log('Weather data:', weatherData);
        alert('Weather data retrieved successfully!');
        this.generateOutfit();  // Optionally trigger outfit generation
      },
      error: (error) => {
        console.error('Error retrieving weather data:', error);
        alert('Failed to retrieve weather data.');
      }
    });
  }

  generateOutfit(): void {
    this.router.navigate(['/outfit']); // Navigate to the outfit component
  }
}


/*
export class InputComponent {
  //preferences: Preferences = {activity: '', thermal_preference: ''};
  city: string = '';

  constructor(
    private apiService: ApiService, 
    private sessionService: SessionService, 
    private router: Router
  ) {}

  onSubmitPreferences(): void {
    //POST NEW PREFERENCE (a new row in the preference table in the DB )
    //ADD LATER 
  }

  onSubmitCity(): void {
    //CALL THE WEATHER API (getWeatherbycity)
    //ADD LATER
  }

  generateOutfit(): void {
    //GET THE LATEST PREFERENCE FROM THE DATABASE  SO THAT THE PROGRAM KNOWS 
    //THAT IT SHOULD USE THE LATEST PREFERENCE THAT IS CREATED RIGHT NOW ON THIS COMPONENT 
    //CALLING ON THE METHOD getprefernces 
    //STORE THE CITY IN THIS PAGE (SET)(SessionAPI)
    //NAVIGATE TO '/outfit'
  }
  
}
*/
   /*
    this.apiService.postPreference(this.preferences).subscribe({
      next: (response) => {
        console.log('Preferences saved:', response);
        alert('Preferences saved successfully!');
      },
      error: (error) => {
        console.error('Error saving preferences:', error);
        alert('Failed to save preferences.');
      }
    });

  }
    onSubmitCity(): void {
      if (this.city) {
        this.apiService.getWeatherByCity(this.city).subscribe({
          next: (WeatherData) => {
            console.log('Weather data:', WeatherData);
            alert('Weather data retrieved successfully!');
          },
          error: (error) => {
            console.error('Error retrieving weather data:', error);
            alert('Failed to retrieve weather data.');
          }
        });
      }

    }

    generateOutfit(): void {
      this.router.navigate(['/outfit']); // Update the route as per your app's routing configuration
    }
  }
}
*/