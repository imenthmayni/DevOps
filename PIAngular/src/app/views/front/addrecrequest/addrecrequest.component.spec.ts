import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecrequestComponent } from './addrecrequest.component';

describe('AddrecrequestComponent', () => {
  let component: AddrecrequestComponent;
  let fixture: ComponentFixture<AddrecrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrecrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrecrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
