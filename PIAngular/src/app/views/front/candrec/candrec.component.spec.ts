import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandrecComponent } from './candrec.component';

describe('CandrecComponent', () => {
  let component: CandrecComponent;
  let fixture: ComponentFixture<CandrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandrecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
