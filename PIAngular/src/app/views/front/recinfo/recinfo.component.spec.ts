import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecinfoComponent } from './recinfo.component';

describe('RecinfoComponent', () => {
  let component: RecinfoComponent;
  let fixture: ComponentFixture<RecinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
