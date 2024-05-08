
import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../../model/weather.model';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../session.service';//to store Email and City for the recommendations method
import { CreatePreferences } from '../../../model/preferences.model';
import { LoginResponse } from '../../../model/credentials.model';
import { UserContext } from '../../../model/preferences.model';
import { updateUser } from '../../../model/users.model';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent implements OnInit{
  preferences: CreatePreferences = { activity: '', thermal_preference: '' };
  city: string = '';
  updateUser: updateUser = { name: '', email: '', password: '' };

  constructor(
    private apiService: ApiService, 
    private sessionService: SessionService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    //console.log(userId);
    //localStorage.getItem()
    const ctx = this.sessionService.getContext();
    console.log(ctx);
    //SET VARIABLES 
    
  }

  onSubmitPreferences(): void {
    const ctx = this.sessionService.getContext() as { userId: number }; // Assuming userId is a number
    if (ctx && ctx.userId) {
      const userId = ctx.userId;
      this.apiService.postPreference(userId, this.preferences).subscribe({
        next: (response) => {
          console.log('Preferences saved successfully:', response);
          alert('Preferences saved successfully!');
        },
        error: (error) => {
          console.error('Error saving preferences:', error);
          alert('Failed to save preferences.');
        }
      });
    } else {
      alert('User context is missing or invalid.');
    }
  }
  
  onSubmitCity(): void {
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

onUpdateUser(): void {
  const ctx = this.sessionService.getContext() as { userId: number }; // Assuming userId is a number
    if (ctx && ctx.userId) {

  const userId = ctx.userId;
  this.apiService.updateUser(userId, this.updateUser).subscribe({
    next: () => {
      alert('User information updated successfully!');
    },
    error: (error) => {
      console.error('Error updating user information:', error);
      alert('Failed to update user information.');
    } 
  });
}else {
    alert('User context is missing or invalid.');
}
}

  onDeleteUser(): void {
    const ctx = this.sessionService.getContext() as { userId: number }; // Assuming userId is a number
    if (ctx && ctx.userId) {
      const userId = ctx.userId;
    this.apiService.deleteUser(userId).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.router.navigate(['/create-user']); // Navigate back to login or home
      },
      error: (error) => {
        console.error('Error saving preferences:', error);
        alert('Failed to save preferences.');
      }
    });
  } else {
  alert('User context is missing or invalid.');
}
}

generateOutfit(): void {
  this.router.navigate(['/outfit']); // Navigate to the outfit component
}

}


  /*
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

  */






/*

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