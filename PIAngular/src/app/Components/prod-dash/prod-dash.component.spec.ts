import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDashComponent } from './prod-dash.component';

describe('ProdDashComponent', () => {
  let component: ProdDashComponent;
  let fixture: ComponentFixture<ProdDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
