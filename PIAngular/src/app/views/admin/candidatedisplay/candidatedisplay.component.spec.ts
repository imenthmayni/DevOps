import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatedisplayComponent } from './candidatedisplay.component';

describe('CandidatedisplayComponent', () => {
  let component: CandidatedisplayComponent;
  let fixture: ComponentFixture<CandidatedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatedisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
