import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateinfoComponent } from './candidateinfo.component';

describe('CandidateinfoComponent', () => {
  let component: CandidateinfoComponent;
  let fixture: ComponentFixture<CandidateinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
