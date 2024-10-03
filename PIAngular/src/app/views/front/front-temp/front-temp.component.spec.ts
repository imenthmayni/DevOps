import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontTempComponent } from './front-temp.component';

describe('FrontTempComponent', () => {
  let component: FrontTempComponent;
  let fixture: ComponentFixture<FrontTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
