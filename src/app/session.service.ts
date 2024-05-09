

import { Injectable } from '@angular/core';
import { UserContext } from './model/preferences.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private city: string | null = null ;
  private ctx: UserContext | null = null; 


  constructor() {}

  setContext(ctx: UserContext): void {

    this.ctx = ctx;
  }

  getContext(): UserContext | null {

    return this.ctx;
  }

  setCity(city: string): void {
    this.city = city;
  }

  getCity(): string | null {
    return this.city;
  }
}