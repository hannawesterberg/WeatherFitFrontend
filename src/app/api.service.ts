
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpResponse, User, updateUser } from './model/users.model';//model 
import { CreatePreferences, Preferences } from './model/preferences.model';
import { WeatherData } from './model/weather.model';
import { Credentials } from './model/credentials.model';
import { LoginResponse } from './model/credentials.model';//to create token when logging in 
import { Recommendation } from './model/recommendation.model';

@Injectable({
 providedIn: 'root'
})


export class ApiService
{
 private baseUrl = 'http://localhost:5274';

 constructor(private http: HttpClient) { }
  // SIGNUP: Method to create a new user
   createUser(user: User): Observable<SignUpResponse> {
     return this.http.post<SignUpResponse>(`${this.baseUrl}/Users`, user);
   }

  //LOGIN: Method to log in as existing user 
  loginUser(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Users/login`, credentials);
  }

  //CREATE NEW PREFERENCE: After logging in the user can add a preference 
  postPreference(userId: number, preferences: CreatePreferences): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Preferences/${userId}`, preferences);
  }

  //DELETE USER
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Users/${userId}`);
  }

  //UPDATE USER
  updateUser(id: number, userData: { name: string, email: string, password: string }): Observable<updateUser> {
    return this.http.put<updateUser>(`${this.baseUrl}/Users/${id}`, userData);
  }

  //WEATHER DATA: Method to fetch weather data with input city 
  getWeatherByCity(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.baseUrl}/api/Weather/${city}`);
  }

  //GET RECOMMENDATIONS: Metod to get the business logic output (input city and user id)
  getOutfitRecommendation(city: string, userId: number): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${this.baseUrl}/api/BusinessLogic/outfit/${city}/${userId}`);
  }
  
}

