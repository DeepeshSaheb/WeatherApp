/* tslint:disable:no-unused-variable */
import { HttpModule, Jsonp, BaseRequestOptions, Response, ResponseOptions, Http , XHRBackend } from '@angular/http';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { WeatherService } from './weather.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

describe('Service: WeatherService', () => {

  let service: WeatherService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        WeatherService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          // tslint:disable-next-line:no-shadowed-variable
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);

    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(WeatherService);

  });

  it('search should return fakecity current data', fakeAsync(() => {
    const response = {
      'coord': {
        'lon': 73.85,
        'lat': 18.52
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01n'
        }
      ],
      'base': 'stations',
      'main': {
        'temp': 70.62,
        'pressure': 948.73,
        'humidity': 68,
        'temp_min': 70.62,
        'temp_max': 70.62,
        'sea_level': 1023.34,
        'grnd_level': 948.73
      },
      'wind': {
        'speed': 4.85,
        'deg': 272.505
      },
      'clouds': {
        'all': 0
      },
      'dt': 1523553502,
      'sys': {
        'message': 0.0069,
        'country': 'IN',
        'sunrise': 1523494186,
        'sunset': 1523539259
      },
      'id': 1259229,
      'name': 'Pune',
      'cod': 200
    };

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    let getCurrentWeatherRes;
    // Perform a request and make sure we get the response we expect
    service.getCurrentWeather('fakeCity').subscribe((data) => {
      getCurrentWeatherRes = data;
    });
    tick();

    expect(getCurrentWeatherRes.coord.lon).toBe( 73.85);
    expect(getCurrentWeatherRes.name).toBe('Pune');
    expect(getCurrentWeatherRes.weather[0].id).toBe(800);
    expect(getCurrentWeatherRes.main.temp).toBe(70.62);
  }));

  it('search should return fakecity 5 day forecast data data', fakeAsync(() => {
    const response = {
      'cod': '200',
      'message': 0.0054,
      'cnt': 40,
      'list': [
        {
          'dt': 1523556000,
          'main': {
            'temp': 62.67,
            'temp_min': 62.67,
            'temp_max': 70.62,
            'pressure': 948.73,
            'sea_level': 1023.34,
            'grnd_level': 948.73,
            'humidity': 68,
            'temp_kf': -4.41
          },
          'weather': [
            {
              'id': 800,
              'main': 'Clear',
              'description': 'clear sky',
              'icon': '01n'
            }
          ],
          'clouds': {
            'all': 0
          },
          'wind': {
            'speed': 4.85,
            'deg': 272.505
          },
          'rain': {
          },
          'sys': {
            'pod': 'n'
          },
          'dt_txt': '2018-04-12 18:00:00'
        },
        {
          'dt': 1523566800,
          'main': {
            'temp': 59.14,
            'temp_min': 59.14,
            'temp_max': 65.09,
            'pressure': 947.59,
            'sea_level': 1022.43,
            'grnd_level': 947.59,
            'humidity': 92,
            'temp_kf': -3.31
          },
          'weather': [
            {
              'id': 800,
              'main': 'Clear',
              'description': 'clear sky',
              'icon': '01n'
            }
          ],
          'clouds': {
            'all': 0
          },
          'wind': {
            'speed': 4.63,
            'deg': 274.505
          },
          'rain': {
          },
          'sys': {
            'pod': 'n'
          },
          'dt_txt': '2018-04-12 21:00:00'
        }
      ],
      'city': {
        'id': 1259229,
        'name': 'Pune',
        'coord': {
          'lat': 18.5203,
          'lon': 73.8543
        },
        'country': 'IN',
        'population': 9999
      }
    };

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    let getForeCastWeatherRes;
    // Perform a request and make sure we get the response we expect
    service.getForecast('fakeCity').subscribe((data) => {
      getForeCastWeatherRes = data;
    });
    tick();

    expect(getForeCastWeatherRes.cod).toBe('200');
    expect(getForeCastWeatherRes.list.length).toBe(2);
    expect(getForeCastWeatherRes.city.name).toBe('Pune');
    expect(getForeCastWeatherRes.city.country).toBe('IN');
  }));
});
