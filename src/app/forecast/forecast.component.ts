import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ForecastWeather } from '../forecast-weather';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  currentWeather: CurrentWeather;
  isError = false;
  forecasts: ForecastWeather[] = [];

  ngOnInit() {
  }

  onSubmit(weatherForm: NgForm) {
    this.isError = false;
    this.weatherService.getCurrentWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.currentWeather = new CurrentWeather(data.name,
          data.main.temp,
          data.weather[0].description,
          data.main.temp_min, data.main.temp_max, data.weather[0].icon);
        console.log(this.currentWeather);
      }, (err) => {
        this.currentWeather = null;
        this.isError = true;
      }

    );

    this.forecasts.splice(0, this.forecasts.length);
    this.weatherService.getForecast(weatherForm.value.city).subscribe(
      (data) => {
        console.log(data);
        for (let i = 0; i < data.list.length; i = i + 8) {

          const forecastWeather = new ForecastWeather(data.city.name,
            data.list[i].weather[0].description,
            data.list[i].main.temp,
            data.list[i].dt_txt,
            data.list[i].weather[0].icon);
          // console.log(forecastWeather);
          this.forecasts.push(forecastWeather);
        }
        console.log(this.forecasts);
        return this.forecasts;
      }
    );


  }

}
