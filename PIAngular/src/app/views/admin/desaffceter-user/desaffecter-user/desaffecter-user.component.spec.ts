import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaffecterUserComponent } from './desaffecter-user.component';

describe('DesaffecterUserComponent', () => {
  let component: DesaffecterUserComponent;
  let fixture: ComponentFixture<DesaffecterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesaffecterUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesaffecterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
