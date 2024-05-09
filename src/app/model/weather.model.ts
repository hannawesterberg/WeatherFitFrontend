export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    main: Main;
    wind: Wind;
    clouds: Clouds;
  }
   export interface Coord {
    lon: number;
    lat: number;
  }
   export interface Weather {
    main: string;  
    description: string;
  }
   export interface Main {
    temp: number;  
    feels_like: number;  
    
  }
   export interface Wind {
    speed: number;  
  }
   export interface Clouds {
    all: number;  
  }
 