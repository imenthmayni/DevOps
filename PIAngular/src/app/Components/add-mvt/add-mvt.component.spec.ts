import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMvtComponent } from './add-mvt.component';

describe('AddMvtComponent', () => {
  let component: AddMvtComponent;
  let fixture: ComponentFixture<AddMvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
