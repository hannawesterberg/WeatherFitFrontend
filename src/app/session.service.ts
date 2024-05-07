import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {private userEmail: string | null = null;
  private city: string | null = null;

  constructor() {}

  setUserEmail(email: string): void {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  setCity(city: string): void {
    this.city = city;
  }

  getCity(): string | null {
    return this.city;
  }
}