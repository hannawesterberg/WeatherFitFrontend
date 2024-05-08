
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service'; // Adjust the import path as necessary
import { User } from '../../../model/users.model';
import { Credentials } from '../../../model/credentials.model';
import { LoginResponse } from '../../../model/credentials.model'; // to create token when logging in 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add CommonModule here
import { ChangeDetectorRef } from '@angular/core'; // New: to debug error message update
import { SessionService } from '../../../session.service';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure CommonModule and FormsModule are imported
  templateUrl: './createuser.component.html', // Make sure this path is correct
  styleUrls: ['./createuser.component.css'] 
})


export class CreateuserComponent {
newUser: User = { name: '', email: '', password: '' ,activity: '', thermal_preference: '' };
repeatPassword: string =''; //new
errorMessage: string ='';
loginCredentials: Credentials = {email:'', password:''};

 constructor(private apiService: ApiService, private sessionService: SessionService, private router: Router, private cdr: ChangeDetectorRef) {}
//New: adding changedetectorRef to constructor 

 onSubmit(): void {
  this.errorMessage =''; // to clear the previous error message
  //Nice to have Data types restraints and error messages when users tries to input numbers when the datatype is string 

  //NEW: if to validate that the repeat password matches the password
   if (this.newUser.password !== this.repeatPassword) {
    this.errorMessage = 'Passwords do not match.';
    this.cdr.detectChanges();//manually trigger change detection
    return;//stops submission (SAFETY)
   }
   this.errorMessage ='';
   //NEW: Requirment - all fields need to be filled out
   if (!this.newUser.name || !this.newUser.email || !this.newUser.password || !this.newUser.activity || !this.newUser.thermal_preference) {
    this.errorMessage = 'All fields are required.';
    this.cdr.detectChanges();//manually trigger change detection
    return;
  }
  //ELSE PROCEED with calling the POST METHOD and navigating to the next page 
  this.apiService.createUser(this.newUser).subscribe({
    next: (user) => {
      console.log('User Created and preferences saved:', user);
      this.sessionService.setUserEmail(this.newUser.email); // Set email in session
      this.router.navigate(['/profile']); // Navigate after confirmation of creation
    },
    error: (error) => {
      console.error('Error saving user and preferences:', error);
      this.errorMessage = 'Failed to create user: ' + (error.error.message || 'Unknown error');
      this.cdr.detectChanges();
    }
  });
 }

 /*onLogin(): void {
  this.errorMessage =''; // clear error message 
  //Nice to have Data types restraints and error messages when users tries to input numbers when the datatype is string 

  this.apiService.loginUser(this.loginCredentials).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      this.sessionService.setUserEmail(this.loginCredentials.email);//Store the email of the loggedin user
      this.router.navigate(['/input']);
    },
    error: (error) => {
      console.error('Error logging in:', error);
      this.errorMessage = 'Failed to login: ' + (error.error.message || 'Unknown error');
      this.cdr.detectChanges();
    }
  });
  */

  onLogin(): void {
    //NEW THAT STORES THE USER ID FROM THE RESPONSE TERMINAL  

    this.errorMessage = ''; // Clear error message
    this.apiService.loginUser(this.loginCredentials).subscribe({
        next: (response) => {
            console.log('Login successful:', response.userId);

            // Store the email and userId in local storage or your preferred method
            //localStorage.setItem('userId', response.userId);  // unecessary as we use the setContext 
            this.sessionService.setContext({ userId: +response.userId.toString()});
            //this.sessionService.setContext({userId: response.userId});
            this.sessionService.setUserEmail(this.loginCredentials.email);  // Store the email of the loggedin user

            // Navigate to the next component
            this.router.navigate(['/input']);
        },
        error: (error) => {
            console.error('Error logging in:', error);
            this.errorMessage = 'Failed to login: ' + (error.error.message || 'Unknown error');
            this.cdr.detectChanges();
        }
    });
}
    


    /*OLD THAT WORKS
    this.errorMessage = ''; // Clear error message
      //Nice to have Data types restraints and error messages when users tries to input numbers when the datatype is string 
    
      this.apiService.loginUser(this.loginCredentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.sessionService.setUserEmail(this.loginCredentials.email);//Store the email of the loggedin user
          this.router.navigate(['/input']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.errorMessage = 'Failed to login: ' + (error.error.message || 'Unknown error');
          this.cdr.detectChanges();
        }
      });
      */
    
  }
/*  
  onLogin(): void {
    this.errorMessage = ''; // clear error message
  
    this.apiService.loginUser(this.loginCredentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.password);  // Correctly storing the token received from the backend
        console.log('Login successful:', response);
        this.sessionService.setUserEmail(this.loginCredentials.email); // Store the email of the logged-in user for the last component
        this.router.navigate(['/input']); // Navigate to the next component
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Failed to login: ' + (error.error.message || 'Unknown error');
        this.cdr.detectChanges();
      }
    });

}*/



