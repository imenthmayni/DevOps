import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDashComponent } from './stock-dash.component';

describe('StockDashComponent', () => {
  let component: StockDashComponent;
  let fixture: ComponentFixture<StockDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
