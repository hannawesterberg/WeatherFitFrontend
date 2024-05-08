

import { Injectable } from '@angular/core';
import { UserContext } from './model/preferences.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {private userEmail: string | null = null;
  private city: string | null = null ; private ctx: UserContext | null = null; 
  constructor() {}

  //Create method

  setContext(ctx: UserContext): void {

    this.ctx = ctx;
  }

  getContext(): UserContext | null {

    return this.ctx;
  }

  /*
  setUserId(userId: number): void{
    this.userId =userId;
  }

  getUserId(): number | null {

    return this.userId;
  }
  
*/
  //DELETE AND J
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