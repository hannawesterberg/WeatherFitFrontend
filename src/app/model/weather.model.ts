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
    main: string;  // Short description
    description: string;  // Long description
  }
   export interface Main {
    temp: number;  // Temperature in Kelvin
    feels_like: number;  // Feels like temperature in Kelvin
    // humidity: number;  // Uncomment if you decide to include humidity
  }
   export interface Wind {
    speed: number;  // Wind speed in meter/sec
  }
   export interface Clouds {
    all: number;  // Cloudiness in percentage
  }
 