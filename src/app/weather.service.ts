import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WeatherService {

  constructor(private http: Http) { }


  getCurrentWeather(city: string) {
    return this.http
    .get(`https://api.openweathermap.org/data/2.5/weather?appid=e2c6d4ef6aaceddc18eae0066946e4bd&q=${city}&units=imperial&cnt=10`)
    .map((response: Response) => response.json());
  }

  getForecast(city: string) {
    return this.http
    .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e2c6d4ef6aaceddc18eae0066946e4bd&units=imperial`)
    .map((response: Response) => response.json());
  }
}
