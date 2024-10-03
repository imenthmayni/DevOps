import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecStatsComponent } from './rec-stats.component';

describe('RecStatsComponent', () => {
  let component: RecStatsComponent;
  let fixture: ComponentFixture<RecStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
