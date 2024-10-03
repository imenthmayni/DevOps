import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveleavComponent } from './removeleav.component';

describe('RemoveleavComponent', () => {
  let component: RemoveleavComponent;
  let fixture: ComponentFixture<RemoveleavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveleavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveleavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
