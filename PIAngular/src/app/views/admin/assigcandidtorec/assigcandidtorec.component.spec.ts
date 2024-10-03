import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigcandidtorecComponent } from './assigcandidtorec.component';

describe('AssigcandidtorecComponent', () => {
  let component: AssigcandidtorecComponent;
  let fixture: ComponentFixture<AssigcandidtorecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigcandidtorecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigcandidtorecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
