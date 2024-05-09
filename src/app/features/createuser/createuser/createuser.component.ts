
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service'; 
import { User } from '../../../model/users.model';
import { Credentials } from '../../../model/credentials.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ChangeDetectorRef } from '@angular/core'; // debug error message update
import { SessionService } from '../../../session.service';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './createuser.component.html', 
  styleUrls: ['./createuser.component.css'] 
})

export class CreateuserComponent {
newUser: User = { name: '', email: '', password: '' ,activity: '', thermal_preference: '' };
repeatPassword: string =''; 
errorMessage: string ='';
errorMessage2: string ='';
loginCredentials: Credentials = {email:'', password:''};

 constructor(private apiService: ApiService, private sessionService: SessionService, private router: Router, private cdr: ChangeDetectorRef) {}

 //SIGN UP BUTTON
 onSignUp(): void {
  this.errorMessage =''; 

  //ERROR MESSAGE: Passwords must match 
   if (this.newUser.password !== this.repeatPassword) {
    this.errorMessage = 'Passwords do not match.';
    this.cdr.detectChanges();//manually trigger change detection
    return;
   }

   this.errorMessage ='';

   //ERROR MESSAGE: All fields are required
   if (!this.newUser.name || !this.newUser.email || !this.newUser.password || !this.newUser.activity || !this.newUser.thermal_preference) {
    this.errorMessage = 'All fields are required.';
    this.cdr.detectChanges();
    return;
  }

  this.apiService.createUser(this.newUser).subscribe({
    next: (response) => {
      console.log('User Created and preferences saved:', response);
      this.sessionService.setContext({ userId: +response.userId });
      this.router.navigate(['/profile']); 
    },
    error: (error) => {
      console.error('Error saving user and preferences:', error);
      this.errorMessage = 'Failed to create user: ' + (error.error.message || 'Unknown error');
      this.cdr.detectChanges();
    }
  });
 }

 //LOG IN BUTTON
  onLogin(): void {
    this.errorMessage2 = ''; 
    this.apiService.loginUser(this.loginCredentials).subscribe({
        next: (response) => {
            console.log('Login successful:', response.userId);
            this.sessionService.setContext({ userId: +response.userId.toString()});
            this.router.navigate(['/input']);
        },
        error: (error) => {
            console.error('Error logging in:', error);
            this.errorMessage2 = 'Failed to login: ' + (error.error.message || 'Unknown error');
            this.cdr.detectChanges();
        }
    });
  }
}
