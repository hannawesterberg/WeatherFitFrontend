
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, updateUser } from './model/users.model';//model 
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
   createUser(user: User): Observable<User> {
     return this.http.post<User>(`${this.baseUrl}/Users`, user);
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

  


 //ERROR!GET PREFERENCES: Method to get the latest preference in the database
 getUserPreferences(userId: number): Observable<Preferences> {
  return this.http.get<Preferences>(`${this.baseUrl}/latest-preferences/${userId}`);
}

  //WEATHER DATA: Method to fetch weather data with input city 
  getWeatherByCity(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.baseUrl}/api/Weather/${city}`);
  }


  //GET RECOMMENDATIONS: Metod to get the business logic output (input city and email)
  getOutfitRecommendation(city: string, userEmail: string): Observable<Recommendation> {
    // Properly encode the userEmail parameter to ensure special characters are handled correctly
    const encodedUserEmail = encodeURIComponent(userEmail);
    return this.http.get<Recommendation>(`${this.baseUrl}/api/BusinessLogic/outfit/${city}/${encodedUserEmail}`);
  }
  

  /*
  postPreference(preferences: CreatePreferences): Observable<CreatePreferences> {
   
  
    const userId= localStorage.getItem("userId");
    return this.http.post<CreatePreferences>(`${this.baseUrl}/Preferences/${userId}`, preferences);
  }


  */
  //getOutfitRecommendation(city: string, userEmail: string): Observable<Recommendation> {
  //  return this.http.get<Recommendation>(`${this.baseUrl}/api/BusinessLogic/outfit/${city}/${userEmail}`);
  //}
  
  /*
  getOutfitRecommendation(city: string, userEmail: string): Observable<Recommendation> {
    const params = new HttpParams()
      .set('city', city)
      .set('userEmail', userEmail);
    return this.http.get<Recommendation>(`${this.baseUrl}/api/BusinessLogic/outfit/${city}/${userEmail}`, { params });
  }
  */
  //getOutfitRecommendation(city: string, userEmail: string): Observable<Recommendation> {
  //  return this.http.get<Recommendation>(`${this.baseUrl}api/BusinessLogic/outfit`, {
    //  params: { city: city , userEmail: userEmail }
   // });

  //OLD: 
  /*
  getRecommendation(weatherData: WeatherData, preferences: Preferences): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/recommendation/outfit`, { weatherData, preferences });
  }
*/
  

  /*
  getRecommendation(weatherData: WeatherData, preferences: Preferences): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${this.apiUrl}/recommendation/outfit`, {
      params: {
        city: weatherData.city, // Assuming city is a part of weatherData
        userEmail: preferences.userEmail // Assuming userEmail is stored in preferences
      }
    });
   
   /*
    postPreference(preference: Preferences) {
     return this.http.post(`${this.baseUrl}/Preferences`, preference);
   }
   */

   
   // ... additional methods for other CRUD operations
}

