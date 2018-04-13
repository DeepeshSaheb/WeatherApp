import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherService } from './weather.service';
import { HttpModule } from '@angular/http';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      providers: [WeatherService],
      declarations: [
        AppComponent,
        ForecastComponent
      ],
    }).compileComponents();
  }));

  it('should render text box and search button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-forecast')).not.toBe(null);
  }));
});
