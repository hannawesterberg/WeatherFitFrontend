
import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../../model/weather.model';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../session.service';//to store Email and City for the recommendations method
import { CreatePreferences } from '../../../model/preferences.model';
import { updateUser } from '../../../model/users.model';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent implements OnInit{
  preferences: CreatePreferences = { activity: ''};
  city: string = '';
  updateUser: updateUser = { name: '', email: '', password: '' };

  constructor(
    private apiService: ApiService, 
    private sessionService: SessionService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    //SET THE USER ID 
    const ctx = this.sessionService.getContext();
    console.log(ctx); //Console: Double check the user id
  }

  onSubmitPreferences(): void {
    const ctx = this.sessionService.getContext() as { userId: number }; //user id stored as string in console --> convert to int
   
    //Check that User Id exists 
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
   this.apiService.getWeatherByCity(this.city).subscribe({
    next: (weatherData: WeatherData) => {
      console.log('WeatherData received', weatherData);
      this.sessionService.setCity(this.city); // Store city
      this.router.navigate(['/outfit']); 
    },
    error: (error) => {
      console.error('Error when posting preference:', error);
    }
  });
}


//Account Settings 
onUpdateUser(): void {
  const ctx = this.sessionService.getContext() as { userId: number }; //user id stored as string in console --> convert to int
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

//DELETE ACCOUNT 
  onDeleteUser(): void {
    const ctx = this.sessionService.getContext() as { userId: number }; 
    if (ctx && ctx.userId) {
      const userId = ctx.userId;
    this.apiService.deleteUser(userId).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.router.navigate(['/create-user']); 
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
}
