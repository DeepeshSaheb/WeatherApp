import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ForecastComponent } from './forecast.component';
import { WeatherService } from '../weather.service';
import { HttpModule } from '@angular/http';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      providers: [WeatherService],
      declarations: [ ForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Forecast component', () => {
    expect(component).toBeTruthy();
  });

  it('should render textbox and search button', async(() => {
    const fixture2 = TestBed.createComponent(ForecastComponent);
    fixture2.detectChanges();
    const compiled = fixture2.debugElement.nativeElement;
    expect(compiled.querySelector('input').textbox).not.toBe(null);
    expect(compiled.querySelector('button').button).not.toBe(null);
  }));
});
